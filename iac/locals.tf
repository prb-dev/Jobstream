locals {
  ecr_repo_name                   = "jobstream"
  ecs_cluster_name                = "jobstream"
  availability_zones              = ["eu-north-1a", "eu-north-1b", "eu-north-1c"]
  ecs_task_execution_role_name    = "jobstream"
  ecs_task_family                 = "jobstream"
  ecs_task_name                   = "job-management"
  container_name                  = "job-management"
  container_port                  = 3000
  application_load_balancer_name  = "jobstream"
  target_group_name               = "jobstream"
  ecs_service_name                = "job-management"
  aws_region                      = "eu-north-1"
  http_api_name                   = "jobstream"
  database_uri_name               = "/jobstream/database_uri"
  jwt_secret_name                 = "/jobstream/jwt_secret"
  ssm_access_policy_name          = "jobstream_ssm_access"
  ecs_cloudwatch_logs_policy_name = "jobstream_ecs_cloudwatch_logs"
}
