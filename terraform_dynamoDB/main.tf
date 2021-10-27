resource "aws_dynamodb_table" "i" {
  name             = "${local.resource_prefix}-comments"
  hash_key         = "CommentsTableHashKey"
  billing_mode     = "PAY_PER_REQUEST"
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attribute {
    name = "CommentsTableHashKey"
    type = "S"
  }

  tags = merge(
    local.base_tags,
    {
      Name = "${local.resource_prefix}-comments"
    },
  )
}

variable "number_of_records" {
  default = 1
}

resource "random_string" "one" {
  count  = var.number_of_records
  length = 8
}


// example record
resource "aws_dynamodb_table_item" "i" {
  count      = var.number_of_records
  table_name = aws_dynamodb_table.i.name
  hash_key   = aws_dynamodb_table.i.hash_key

  item = <<ITEM
{
  "CommentsTableHashKey": {"S": "${local.hash_key_val}"},
  "comment": {"S": "${random_string.one[count.index].result}"},
  "name": {"S": "Terraform"},
  "postid": {"S": "9999"},
  "timestamp": {"S": "${timestamp()}"}
}
ITEM
}
