
output "dynamo_db" {
  value = aws_dynamodb_table.i
}

output "dynamo_db_arn" {
  value = aws_dynamodb_table.i.arn
}

output "dynamo_db_table_name" {
  value = aws_dynamodb_table.i.name
}

output "dynamo_db_hash_key" {
  value = local.hash_key_val
}

