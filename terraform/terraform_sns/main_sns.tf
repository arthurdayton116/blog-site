resource "aws_sns_topic" "new_comment" {
  name = "${local.resource_prefix}-new-comment-topic"

  tags = merge(
    local.base_tags,
    {
      Name = "${local.resource_prefix}-new-comment-topic"
    },
  )
}
