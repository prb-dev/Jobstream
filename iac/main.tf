terraform {
  required_version = "~> 1.3"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

module "ecr_repo" {
  source = "./modules/ecr"

  ecr_repo_name = local.ecr_repo_name
}

module "ecs" {
  source = "./modules/ecs"

  ecs_cluster_name               = local.ecs_cluster_name
  availability_zones             = local.availability_zones
  ecs_task_execution_role_name   = local.ecs_task_execution_role_name
  ecs_task_family                = local.ecs_task_family
  repository_url                 = module.ecr_repo.repository_url
  ecs_task_name                  = local.ecs_task_name
  container_name                 = local.container_name
  container_port                 = local.container_port
  application_load_balancer_name = local.application_load_balancer_name
  target_group_name              = local.target_group_name
  ecs_service_name               = local.ecs_service_name
  VAL                            = local.VAL
  SECRET                         = var.SECRET
  aws_region                     = local.aws_region
  aws_account_id                 = var.aws_account_id
}

module "gateway" {
  source = "./modules/gateway"

  http_api_name     = local.http_api_name
  load_balancer_dns = module.ecs.load_balancer_dns
}
