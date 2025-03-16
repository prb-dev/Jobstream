output "repository_url" {
  value = module.ecr_repo.repository_url
}

output "load_balancer_dns" {
  value = module.ecs.load_balancer_dns
}

output "invoke_url" {
  value = module.gateway.invoke_url
}
