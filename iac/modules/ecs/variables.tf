variable "ecs_cluster_name" {
  description = "The name of the ECS cluster"
  type        = string
}

variable "availability_zones" {
  description = "The availability zone"
  type        = list(string)
}

variable "ecs_task_execution_role_name" {
  description = "The name of the ECS task execution role"
  type        = string
}

variable "ecs_task_family" {
  description = "The family of the ECS task"
  type        = string
}

variable "ecs_task_name" {
  description = "The name of the ECS task"
  type        = string
}

variable "container_port" {
  description = "Container port"
  type        = number
}

variable "application_load_balancer_name" {
  description = "The name of the application load balancer"
  type        = string
}

variable "target_group_name" {
  description = "The name of the target group"
  type        = string
}

variable "ecs_service_name" {
  description = "The name of the ECS service"
  type        = string
}

variable "repository_url" {
  description = "The URL of the ECR repository"
  type        = string
}

variable "VAL" {
  description = "Env value"
  type        = string
}

variable "SECRET" {
  description = "Secret"
  type        = string
}

variable "aws_region" {
  description = "The AWS region"
  type        = string
}

variable "aws_account_id" {
  description = "The AWS account ID"
  type        = string
}

variable "container_name" {
  description = "The name of the container"
  type        = string
}
