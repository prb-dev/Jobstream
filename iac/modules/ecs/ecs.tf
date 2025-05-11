resource "aws_ecs_cluster" "cluster" {
  name = var.ecs_cluster_name
}

resource "aws_default_vpc" "default_vpc" {}

resource "aws_default_subnet" "default_subnet_a" {
  availability_zone = var.availability_zones[0]
}

resource "aws_default_subnet" "default_subnet_b" {
  availability_zone = var.availability_zones[1]
}

resource "aws_default_subnet" "default_subnet_c" {
  availability_zone = var.availability_zones[2]
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name               = var.ecs_task_execution_role_name
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_policy" "ssm_access" {
  name   = var.ssm_access_policy_name
  policy = data.aws_iam_policy_document.ssm_access_policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_ssm_access" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.ssm_access.arn
}

resource "aws_iam_policy" "ecs_cloudwatch_logs" {
  name   = var.ecs_cloudwatch_logs_policy_name
  policy = data.aws_iam_policy_document.ecs_cloudwatch_logs_policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_ecs_cloudwatch_logs" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.ecs_cloudwatch_logs.arn
}

resource "aws_ssm_parameter" "database_uri" {
  name  = var.database_uri_name
  type  = "SecureString"
  value = var.database_uri_value
}

resource "aws_ssm_parameter" "jwt_secret" {
  name  = var.jwt_secret_name
  type  = "SecureString"
  value = var.jwt_secret_value
}

resource "aws_ecs_task_definition" "task_definition" {
  family = var.ecs_task_family
  container_definitions = jsonencode([
    {
      name : var.ecs_task_name,
      image : var.repository_url,
      cpu : 256,
      memory : 512,
      essential : true,
      portMappings : [
        {
          containerPort : var.container_port,
          hostPort : var.container_port
        }
      ],
      environment : [
        {
          name : "PORT",
          value : tostring(var.container_port)
        }
      ],
      secrets : [
        {
          name : "MONGODB_URI",
          valueFrom : aws_ssm_parameter.database_uri.arn
        },
        {
          name : "JWT_SECRET",
          valueFrom : aws_ssm_parameter.jwt_secret.arn
        }
      ],
      logConfiguration : {
        logDriver : "awslogs",
        options : {
          awslogs-group : "/ecs/${var.ecs_task_name}",
          awslogs-region : var.aws_region,
          awslogs-stream-prefix : "ecs",
          awslogs-create-group : "true",
          mode : "non-blocking",
          max-buffer-size : "25m"
        }
      }
    }
  ])

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
}

resource "aws_security_group" "alb_sg" {
  ingress = [
    {
      description      = "Allow HTTP from anywhere"
      from_port        = 80
      to_port          = 80
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      security_groups  = []
      self             = false
    },
    {
      description      = "Allow traffic on port 3000 from anywhere"
      from_port        = 3000
      to_port          = 3000
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      security_groups  = []
      self             = false
    }
  ]

  egress = [
    {
      description      = "Allow all traffic"
      from_port        = 0
      to_port          = 0
      protocol         = "-1"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      security_groups  = []
      self             = false
    }
  ]
}

resource "aws_alb" "application_load_balancer" {
  name               = var.application_load_balancer_name
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets = ["${aws_default_subnet.default_subnet_a.id}",
    "${aws_default_subnet.default_subnet_b.id}",
  "${aws_default_subnet.default_subnet_c.id}"]
}

resource "aws_lb_target_group" "target_group" {
  name        = var.target_group_name
  port        = var.container_port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_default_vpc.default_vpc.id
}

resource "aws_alb_listener" "application_load_balancer_listener" {
  load_balancer_arn = aws_alb.application_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group.arn
  }
}

resource "aws_ecs_service" "service" {
  name            = var.ecs_service_name
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets = ["${aws_default_subnet.default_subnet_a.id}",
      "${aws_default_subnet.default_subnet_b.id}",
    "${aws_default_subnet.default_subnet_c.id}"]
    security_groups  = ["${aws_security_group.alb_sg.id}"]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.target_group.arn
    container_name   = var.container_name
    container_port   = var.container_port
  }
}

resource "aws_security_group" "service_sg" {
  ingress = [
    {
      description      = "Allow all traffic from ALB"
      from_port        = 0
      to_port          = 0
      protocol         = "-1"
      security_groups  = [aws_security_group.alb_sg.id]
      cidr_blocks      = []
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      self             = false
    }
  ]

  egress = [
    {
      description      = "Allow all traffic"
      from_port        = 0
      to_port          = 0
      protocol         = "-1"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      security_groups  = []
      self             = false
    }
  ]

}
