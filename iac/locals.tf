locals {
  ecr_repo_name                  = "jobstream"
  ecs_cluster_name               = "jobstream"
  availability_zones             = ["eu-north-1a", "eu-north-1b", "eu-north-1c"]
  ecs_task_execution_role_name   = "jobstream"
  ecs_task_family                = "jobstream"
  ecs_task_name                  = "job-management"
  container_name                 = "job-management"
  container_port                 = 3000
  application_load_balancer_name = "jobstream"
  target_group_name              = "jobstream"
  ecs_service_name               = "job-management"
  VAL                            = "hello from .env"
  aws_region                     = "eu-north-1"
}
