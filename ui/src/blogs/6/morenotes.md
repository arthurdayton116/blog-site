import {
    Box,
    Card,
    Image,
    Heading,
    Text,
    Flex,
    Link
} from 'rebass';

export const vpcConcepts = "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"

export const Repo = "https://github.com/arthurdayton116/aws-terraform/tree/main/terraform_vpc"

#### Using maps and for-each to kick it up a notch
In this post I am going to cover some of the basics of SOMETHING and show how I deploy one using TECHNOLOGY

<br/>

For some basic terminology we can look at docs from AWS  - <Link href={vpcConcepts} target="_blank">Amazon VPC Concepts</Link>

<br/>
<br/>

---

Text of post

The following are the key concepts for VPCs:

---

<br/>

#### Header
Looking at Wikipedia we can see CIDR masks that give us a starting point for planning a network


<br/>

<br/>

<Link p={4} href={Repo} target="_blank">Code located here</Link>

<br/>
<br/>

Some code
```json
provider "aws" {
  region = "us-west-2"
}
```

<Image p={4} verticalAlign='middle' src="/images/5/frenchy.png" />

Wrap it up

<br/>
