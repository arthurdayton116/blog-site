(this["webpackJsonpblog-site"]=this["webpackJsonpblog-site"]||[]).push([[158],{168:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.withMDXComponents=void 0;var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},r=s(t(1)),o=s(t(173)),i=s(t(7));function s(e){return e&&e.__esModule?e:{default:e}}var c=(0,o.default)({}),l=c.Provider,p=c.Consumer;n.withMDXComponents=function(e){return function(n){var t=n.components,o=function(e,n){var t={};for(var a in e)n.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}(n,["components"]);return r.default.createElement(p,null,(function(n){return r.default.createElement(e,a({components:t||n},o))}))}};var u=function(e){var n=e.components,t=e.children;return r.default.createElement(l,{value:n},t)};u.propTypes={components:i.default.object.isRequired,children:i.default.element.isRequired},n.default=u},170:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t(171);Object.defineProperty(n,"MDXTag",{enumerable:!0,get:function(){return o(a).default}});var r=t(168);function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"MDXProvider",{enumerable:!0,get:function(){return o(r).default}})},171:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},r=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),o=t(1),i=l(o),s=l(t(172)),c=t(168);function l(e){return e&&e.__esModule?e:{default:e}}function p(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function u(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}var _={inlineCode:"code",wrapper:"div"},m=function(e){function n(){return p(this,n),u(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(n,e),r(n,[{key:"render",value:function(){var e=this.props,n=e.name,t=e.parentName,r=e.props,o=void 0===r?{}:r,c=e.children,l=e.components,p=void 0===l?{}:l,u=e.Layout,m=e.layoutProps,d=p[t+"."+n]||p[n]||_[n]||n;return u?((0,s.default)(this,u),i.default.createElement(u,a({components:p},m),i.default.createElement(d,o,c))):i.default.createElement(d,o,c)}}]),n}(o.Component);n.default=(0,c.withMDXComponents)(m)},172:function(e,n,t){"use strict";var a={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},r={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},o=Object.defineProperty,i=Object.getOwnPropertyNames,s=Object.getOwnPropertySymbols,c=Object.getOwnPropertyDescriptor,l=Object.getPrototypeOf,p=l&&l(Object);e.exports=function e(n,t,u){if("string"!==typeof t){if(p){var _=l(t);_&&_!==p&&e(n,_,u)}var m=i(t);s&&(m=m.concat(s(t)));for(var d=0;d<m.length;++d){var f=m[d];if(!a[f]&&!r[f]&&(!u||!u[f])){var b=c(t,f);try{o(n,f,b)}catch(w){}}}return n}return n}},173:function(e,n,t){"use strict";n.__esModule=!0;var a=o(t(1)),r=o(t(174));function o(e){return e&&e.__esModule?e:{default:e}}n.default=a.default.createContext||r.default,e.exports=n.default},174:function(e,n,t){"use strict";n.__esModule=!0;var a=t(1),r=(i(a),i(t(7))),o=i(t(175));i(t(176));function i(e){return e&&e.__esModule?e:{default:e}}function s(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function c(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}function l(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var p=1073741823;function u(e){var n=[];return{on:function(e){n.push(e)},off:function(e){n=n.filter((function(n){return n!==e}))},get:function(){return e},set:function(t,a){e=t,n.forEach((function(n){return n(e,a)}))}}}n.default=function(e,n){var t,i,_="__create-react-context-"+(0,o.default)()+"__",m=function(e){function t(){var n,a;s(this,t);for(var r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];return n=a=c(this,e.call.apply(e,[this].concat(o))),a.emitter=u(a.props.value),c(a,n)}return l(t,e),t.prototype.getChildContext=function(){var e;return(e={})[_]=this.emitter,e},t.prototype.componentWillReceiveProps=function(e){if(this.props.value!==e.value){var t=this.props.value,a=e.value,r=void 0;((o=t)===(i=a)?0!==o||1/o===1/i:o!==o&&i!==i)?r=0:(r="function"===typeof n?n(t,a):p,0!==(r|=0)&&this.emitter.set(e.value,r))}var o,i},t.prototype.render=function(){return this.props.children},t}(a.Component);m.childContextTypes=((t={})[_]=r.default.object.isRequired,t);var d=function(n){function t(){var e,a;s(this,t);for(var r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];return e=a=c(this,n.call.apply(n,[this].concat(o))),a.state={value:a.getValue()},a.onUpdate=function(e,n){0!==((0|a.observedBits)&n)&&a.setState({value:a.getValue()})},c(a,e)}return l(t,n),t.prototype.componentWillReceiveProps=function(e){var n=e.observedBits;this.observedBits=void 0===n||null===n?p:n},t.prototype.componentDidMount=function(){this.context[_]&&this.context[_].on(this.onUpdate);var e=this.props.observedBits;this.observedBits=void 0===e||null===e?p:e},t.prototype.componentWillUnmount=function(){this.context[_]&&this.context[_].off(this.onUpdate)},t.prototype.getValue=function(){return this.context[_]?this.context[_].get():e},t.prototype.render=function(){return(e=this.props.children,Array.isArray(e)?e[0]:e)(this.state.value);var e},t}(a.Component);return d.contextTypes=((i={})[_]=r.default.object,i),{Provider:m,Consumer:d}},e.exports=n.default},175:function(e,n,t){"use strict";(function(n){var t="__global_unique_id__";e.exports=function(){return n[t]=(n[t]||0)+1}}).call(this,t(63))},176:function(e,n,t){"use strict";var a=t(177);e.exports=a},177:function(e,n,t){"use strict";function a(e){return function(){return e}}var r=function(){};r.thatReturns=a,r.thatReturnsFalse=a(!1),r.thatReturnsTrue=a(!0),r.thatReturnsNull=a(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},179:function(e,n,t){"use strict";function a(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}t.d(n,"a",(function(){return a}))},225:function(e,n,t){"use strict";t.r(n),t.d(n,"vpcConcepts",(function(){return l})),t.d(n,"vpcEndpoints",(function(){return p})),t.d(n,"endPointPricing",(function(){return u})),t.d(n,"cidr",(function(){return _})),t.d(n,"ipv4AddressPlan",(function(){return m})),t.d(n,"introTerraform",(function(){return d})),t.d(n,"vpcRepo",(function(){return f}));var a=t(179),r=t(1),o=t.n(r),i=t(170),s=t(5),c=["components"],l="https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html",p="https://docs.aws.amazon.com/vpc/latest/userguide/endpoint-services-overview.html",u="https://aws.amazon.com/privatelink/pricing/",_="https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing",m="https://network00.com/NetworkTools/IPv4AddressPlanner/",d="https://www.terraform.io/intro/index.html",f="https://github.com/arthurdayton116/aws-terraform/tree/main/terraform_vpc";n.default=function(e){var n=e.components,t=Object(a.a)(e,c);return o.a.createElement(i.MDXTag,{name:"wrapper",components:n},o.a.createElement(i.MDXTag,{name:"h4",components:n},"What is a VPC"),o.a.createElement(i.MDXTag,{name:"p",components:n},"In this post I am going to cover some of the basics of an AWS VPC and show how I deploy one using Terraform"),o.a.createElement("br",null),o.a.createElement(i.MDXTag,{name:"p",components:n},"For some basic terminology we can look at docs from AWS  - ",o.a.createElement(s.g,{href:l,target:"_blank"},"Amazon VPC Concepts")),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement(i.MDXTag,{name:"hr",components:n}),o.a.createElement(i.MDXTag,{name:"p",components:n},"Amazon Virtual Private Cloud (Amazon VPC) enables you to launch AWS resources into a virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center, with the benefits of using the scalable infrastructure of AWS."),o.a.createElement(i.MDXTag,{name:"p",components:n},"The following are the key concepts for VPCs:"),o.a.createElement(i.MDXTag,{name:"ul",components:n},o.a.createElement(i.MDXTag,{name:"li",components:n,parentName:"ul"},o.a.createElement(i.MDXTag,{name:"p",components:n,parentName:"li"},"Virtual private cloud (VPC) \u2014 A virtual network dedicated to your AWS account."),o.a.createElement(i.MDXTag,{name:"ul",components:n,parentName:"li"},o.a.createElement(i.MDXTag,{name:"li",components:n,parentName:"ul"},"There's no additional charge for using a VPC. There are charges for the following VPC components: Site-to-Site VPN connection, PrivateLink, Traffic Mirroring, and a NAT gateway. For more information, see Amazon VPC Pricing."))),o.a.createElement(i.MDXTag,{name:"li",components:n,parentName:"ul"},o.a.createElement(i.MDXTag,{name:"p",components:n,parentName:"li"},"Subnet \u2014 A subnet is a range of IP addresses in your VPC. You can launch AWS resources into a specified subnet. Use a public subnet for resources that must be connected to the internet, and a private subnet for resources that won't be connected to the internet .")),o.a.createElement(i.MDXTag,{name:"li",components:n,parentName:"ul"},o.a.createElement(i.MDXTag,{name:"p",components:n,parentName:"li"},"Route table \u2014 A set of rules, called routes, that are used to determine where network traffic is directed. You can explicitly associate a subnet with a particular route table. Otherwise, the subnet is implicitly associated with the main route table.")),o.a.createElement(i.MDXTag,{name:"li",components:n,parentName:"ul"},o.a.createElement(i.MDXTag,{name:"p",components:n,parentName:"li"},"Internet gateway \u2014 A gateway that you attach to your VPC to enable communication between resources in your VPC and the internet.")),o.a.createElement(i.MDXTag,{name:"li",components:n,parentName:"ul"},o.a.createElement(i.MDXTag,{name:"p",components:n,parentName:"li"},"VPC endpoint \u2014 Enables you to privately connect your VPC to supported AWS services and VPC endpoint services powered by PrivateLink without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection. Instances in your VPC do not require public IP addresses to communicate with resources in the service. Traffic between your VPC and the other service does not leave the Amazon network. For more information, see AWS PrivateLink and VPC endpoints."),o.a.createElement(i.MDXTag,{name:"ul",components:n,parentName:"li"},o.a.createElement(i.MDXTag,{name:"li",components:n,parentName:"ul"},o.a.createElement(s.g,{href:p,target:"_blank"},"AWS PrivateLink and VPC endpoints")),o.a.createElement(i.MDXTag,{name:"li",components:n,parentName:"ul"},o.a.createElement(s.g,{href:u,target:"_blank"},"AWS PrivateLink pricing")))),o.a.createElement(i.MDXTag,{name:"li",components:n,parentName:"ul"},o.a.createElement(i.MDXTag,{name:"p",components:n,parentName:"li"},"CIDR block \u2014Classless Inter-Domain Routing. An internet protocol address allocation and route aggregation methodology. For more information, see ",o.a.createElement(s.g,{href:_,target:"_blank"},"Classless Inter-Domain Routing in Wikipedia"),"."))),o.a.createElement(i.MDXTag,{name:"p",components:n},"From Wikipedia -"),o.a.createElement(i.MDXTag,{name:"blockquote",components:n},o.a.createElement(i.MDXTag,{name:"p",components:n,parentName:"blockquote"},"The number of addresses inside a network or subnet may be calculated as 2address length \u2212 prefix length, where address length is 128 for IPv6 and 32 for IPv4. For example, in IPv4, the prefix length /29 gives: 2 ^ 32 \u2212 29 = 2^3 = 8 addresses.")),o.a.createElement(i.MDXTag,{name:"hr",components:n}),o.a.createElement("br",null),o.a.createElement(i.MDXTag,{name:"h4",components:n},"Network Planner"),o.a.createElement(i.MDXTag,{name:"p",components:n},"Looking at Wikipedia we can see CIDR masks that give us a starting point for planning a network"),o.a.createElement(s.f,{p:4,verticalAlign:"middle",src:t.images.NETWORKCIDR_IMAGE}),o.a.createElement(i.MDXTag,{name:"p",components:n},"To plan out our VPC we will use a network planner tool - ",o.a.createElement(s.g,{href:m,target:"_blank"},"IPv4 Address Planner")),o.a.createElement("br",null),o.a.createElement(i.MDXTag,{name:"p",components:n},"We will give our VPC a 19 mask (2^32-19 = 2^13 = 8,092 addresses) and assume a uniform subnet size of 24 (2^32-24 = 2^8 = 256 addresses) which will give us room for 20 subnets in our VPC as shown by this plan:"),o.a.createElement(s.f,{p:4,verticalAlign:"middle",src:t.images.NETWORKPLAN_19_IMAGE}),o.a.createElement(i.MDXTag,{name:"p",components:n},"We will use this information to construct a VPC that looks like this:"),o.a.createElement(s.f,{p:4,verticalAlign:"middle",src:t.images.AWS_VPC_IMAGE}),o.a.createElement(i.MDXTag,{name:"p",components:n},"Now we can begin to create out resource definitions in ",o.a.createElement(s.g,{href:d,target:"_blank"},"Terraform")," working from the outside in of our diagram."),o.a.createElement("br",null),o.a.createElement(s.g,{p:4,href:f,target:"_blank"},"Code located here"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement(i.MDXTag,{name:"p",components:n},"The Region is defined by the provider"),o.a.createElement(i.MDXTag,{name:"pre",components:n},o.a.createElement(i.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-json",metaString:""}},'provider "aws" {\n  region = "us-west-2"\n}\n')),o.a.createElement(i.MDXTag,{name:"p",components:n},"We will use terraform to manage our default route table that comes with our vpc and define a separate one for our public subnet.  We create a route in our main route table for our nat gateway and create a route for our internet gateway for our public subnet."),o.a.createElement(i.MDXTag,{name:"pre",components:n},o.a.createElement(i.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-json",metaString:""}},'## Create main route table\nresource "aws_default_route_table" "main" {\n  default_route_table_id = aws_vpc.vpc.default_route_table_id\n  route {\n    cidr_block     = "0.0.0.0/0"\n    nat_gateway_id = aws_nat_gateway.i.id\n  }\n\n  tags = merge(\n    var.base_tags,\n    {\n      Name = "${var.resource_prefix}-main-rt"\n    },\n  )\n}\n\n## Create route table\nresource "aws_route_table" "i_public" {\n  vpc_id = aws_vpc.vpc.id\n  route {\n    cidr_block = "0.0.0.0/0"\n    gateway_id = aws_internet_gateway.igw.id\n  }\n  tags = merge(\n    var.base_tags,\n    {\n      Name = "${var.resource_prefix}-rt"\n    },\n  )\n}\n\n## Associate route tables with subnets\nresource "aws_route_table_association" "i_subnet_private" {\n  subnet_id      = aws_subnet.subnet_private.id\n  route_table_id = aws_default_route_table.main.id\n}\n\nresource "aws_route_table_association" "i_subnet_public" {\n  subnet_id      = aws_subnet.subnet_public.id\n  route_table_id = aws_route_table.i_public.id\n}\n')),o.a.createElement(i.MDXTag,{name:"p",components:n},"The VPC is defined by the aws_vpc resource using a variable to pass in the cidr block"),o.a.createElement(i.MDXTag,{name:"pre",components:n},o.a.createElement(i.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-json",metaString:""}},'## Create vpc\nresource "aws_vpc" "vpc" {\n  cidr_block           = var.cidr_vpc\n  instance_tenancy     = "default"\n  enable_dns_support   = true\n  enable_dns_hostnames = true\n\n  tags = merge(\n    var.base_tags,\n    {\n      Name = "${var.resource_prefix}-vpc"\n    },\n  )\n}\n')),o.a.createElement(i.MDXTag,{name:"p",components:n},"We attach an internet gateway to the VPC with the aws_internet_gateway resource using the vpc id"),o.a.createElement(i.MDXTag,{name:"pre",components:n},o.a.createElement(i.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-json",metaString:""}},'## Create internet gateway\nresource "aws_internet_gateway" "igw" {\n  vpc_id = aws_vpc.vpc.id\n  tags = merge(\n    var.base_tags,\n    {\n      Name = "${var.resource_prefix}-igw"\n    },\n  )\n}\n')),o.a.createElement(i.MDXTag,{name:"p",components:n},"Then we define a nat gateway to allow our private subnet instances to egress to the internet"),o.a.createElement(i.MDXTag,{name:"pre",components:n},o.a.createElement(i.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-json",metaString:""}},'resource "aws_nat_gateway" "i" {\n  allocation_id = aws_eip.i.id\n  subnet_id     = aws_subnet.subnet_public.id\n\n  tags = merge(\n    var.base_tags,\n    {\n      Name = "${var.resource_prefix}-natgw"\n    },\n  )\n}\n\nresource "aws_eip" "i" {\n  vpc = true\n  tags = merge(\n    var.base_tags,\n    {\n      Name = "${var.resource_prefix}-eip"\n    },\n  )\n}\n')),o.a.createElement(i.MDXTag,{name:"p",components:n},"We can then create our private and public subnets using the aws_subnet resource and again using variables for the subnet cidr blocks and availability zones"),o.a.createElement(i.MDXTag,{name:"pre",components:n},o.a.createElement(i.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-json",metaString:""}},'## Create public subnet\nresource "aws_subnet" "subnet_public" {\n  vpc_id                  = aws_vpc.vpc.id\n  cidr_block              = var.cidr_subnet_public\n  map_public_ip_on_launch = "true"\n  availability_zone       = var.availability_zone\n  tags = merge(\n    var.base_tags,\n    {\n      Name   = "${var.resource_prefix}-vpc-subnet-public"\n      Access = "public"\n    },\n  )\n}\n\n## Create private subnet\nresource "aws_subnet" "subnet_private" {\n  vpc_id                  = aws_vpc.vpc.id\n  cidr_block              = var.cidr_subnet_private\n  map_public_ip_on_launch = "false"\n  availability_zone       = var.availability_zone\n  tags = merge(\n    var.base_tags,\n    {\n      Name   = "${var.resource_prefix}-vpc-subnet-private"\n      Access = "private"\n    },\n  )\n}\n')),o.a.createElement(i.MDXTag,{name:"p",components:n},"Within our terraform directory"),o.a.createElement(s.f,{p:4,verticalAlign:"middle",src:t.images.VPC_FOLDER_IMAGE}),o.a.createElement(i.MDXTag,{name:"p",components:n},"We run terraform init to generate our local state"),o.a.createElement(s.f,{p:4,verticalAlign:"middle",src:t.images.VPC_FOLDER2_IMAGE}),o.a.createElement(i.MDXTag,{name:"p",components:n},"Then we can run a plan to see what will be created"),o.a.createElement(i.MDXTag,{name:"pre",components:n},o.a.createElement(i.MDXTag,{name:"code",components:n,parentName:"pre",props:{metaString:null}},'terraform plan\n\nAn execution plan has been generated and is shown below.\nResource actions are indicated with the following symbols:\n  + create\n\nTerraform will perform the following actions:\n\n  # aws_default_route_table.main will be created\n  + resource "aws_default_route_table" "main" {\n      + default_route_table_id = (known after apply)\n      + id                     = (known after apply)\n      + owner_id               = (known after apply)\n      + route                  = [\n          + {\n              + cidr_block                = "0.0.0.0/0"\n              + egress_only_gateway_id    = ""\n              + gateway_id                = ""\n              + instance_id               = ""\n              + ipv6_cidr_block           = ""\n              + nat_gateway_id            = (known after apply)\n              + network_interface_id      = ""\n              + transit_gateway_id        = ""\n              + vpc_endpoint_id           = ""\n              + vpc_peering_connection_id = ""\n            },\n        ]\n      + tags                   = {\n          + "Name"      = "sample_company-main-rt"\n          + "createdBy" = "terraform"\n          + "directory" = "terraform_vpc"\n          + "owner"     = "Sample Company"\n        }\n      + vpc_id                 = (known after apply)\n    }\n\n  # aws_eip.i will be created\n  + resource "aws_eip" "i" {\n      + allocation_id        = (known after apply)\n      + association_id       = (known after apply)\n      + carrier_ip           = (known after apply)\n      + customer_owned_ip    = (known after apply)\n      + domain               = (known after apply)\n      + id                   = (known after apply)\n      + instance             = (known after apply)\n      + network_border_group = (known after apply)\n      + network_interface    = (known after apply)\n      + private_dns          = (known after apply)\n      + private_ip           = (known after apply)\n      + public_dns           = (known after apply)\n      + public_ip            = (known after apply)\n      + public_ipv4_pool     = (known after apply)\n      + tags                 = {\n          + "Name"      = "sample_company-eip"\n          + "createdBy" = "terraform"\n          + "directory" = "terraform_vpc"\n          + "owner"     = "Sample Company"\n        }\n      + vpc                  = true\n    }\n\n  # aws_internet_gateway.igw will be created\n  + resource "aws_internet_gateway" "igw" {\n      + arn      = (known after apply)\n      + id       = (known after apply)\n      + owner_id = (known after apply)\n      + tags     = {\n          + "Name"      = "sample_company-igw"\n          + "createdBy" = "terraform"\n          + "directory" = "terraform_vpc"\n          + "owner"     = "Sample Company"\n        }\n      + vpc_id   = (known after apply)\n    }\n\n  # aws_nat_gateway.i will be created\n  + resource "aws_nat_gateway" "i" {\n      + allocation_id        = (known after apply)\n      + id                   = (known after apply)\n      + network_interface_id = (known after apply)\n      + private_ip           = (known after apply)\n      + public_ip            = (known after apply)\n      + subnet_id            = (known after apply)\n      + tags                 = {\n          + "Name"      = "sample_company-natgw"\n          + "createdBy" = "terraform"\n          + "directory" = "terraform_vpc"\n          + "owner"     = "Sample Company"\n        }\n    }\n\n  # aws_route_table.i_public will be created\n  + resource "aws_route_table" "i_public" {\n      + id               = (known after apply)\n      + owner_id         = (known after apply)\n      + propagating_vgws = (known after apply)\n      + route            = [\n          + {\n              + cidr_block                = "0.0.0.0/0"\n              + egress_only_gateway_id    = ""\n              + gateway_id                = (known after apply)\n              + instance_id               = ""\n              + ipv6_cidr_block           = ""\n              + local_gateway_id          = ""\n              + nat_gateway_id            = ""\n              + network_interface_id      = ""\n              + transit_gateway_id        = ""\n              + vpc_endpoint_id           = ""\n              + vpc_peering_connection_id = ""\n            },\n        ]\n      + tags             = {\n          + "Name"      = "sample_company-rt"\n          + "createdBy" = "terraform"\n          + "directory" = "terraform_vpc"\n          + "owner"     = "Sample Company"\n        }\n      + vpc_id           = (known after apply)\n    }\n\n  # aws_route_table_association.i_subnet_private will be created\n  + resource "aws_route_table_association" "i_subnet_private" {\n      + id             = (known after apply)\n      + route_table_id = (known after apply)\n      + subnet_id      = (known after apply)\n    }\n\n  # aws_route_table_association.i_subnet_public will be created\n  + resource "aws_route_table_association" "i_subnet_public" {\n      + id             = (known after apply)\n      + route_table_id = (known after apply)\n      + subnet_id      = (known after apply)\n    }\n\n  # aws_subnet.subnet_private will be created\n  + resource "aws_subnet" "subnet_private" {\n      + arn                             = (known after apply)\n      + assign_ipv6_address_on_creation = false\n      + availability_zone               = "us-west-2a"\n      + availability_zone_id            = (known after apply)\n      + cidr_block                      = "10.1.1.0/24"\n      + id                              = (known after apply)\n      + ipv6_cidr_block_association_id  = (known after apply)\n      + map_public_ip_on_launch         = false\n      + owner_id                        = (known after apply)\n      + tags                            = {\n          + "Access"    = "private"\n          + "Name"      = "sample_company-vpc-subnet-private"\n          + "createdBy" = "terraform"\n          + "directory" = "terraform_vpc"\n          + "owner"     = "Sample Company"\n        }\n      + vpc_id                          = (known after apply)\n    }\n\n  # aws_subnet.subnet_public will be created\n  + resource "aws_subnet" "subnet_public" {\n      + arn                             = (known after apply)\n      + assign_ipv6_address_on_creation = false\n      + availability_zone               = "us-west-2a"\n      + availability_zone_id            = (known after apply)\n      + cidr_block                      = "10.1.0.0/24"\n      + id                              = (known after apply)\n      + ipv6_cidr_block_association_id  = (known after apply)\n      + map_public_ip_on_launch         = true\n      + owner_id                        = (known after apply)\n      + tags                            = {\n          + "Access"    = "public"\n          + "Name"      = "sample_company-vpc-subnet-public"\n          + "createdBy" = "terraform"\n          + "directory" = "terraform_vpc"\n          + "owner"     = "Sample Company"\n        }\n      + vpc_id                          = (known after apply)\n    }\n\n  # aws_vpc.vpc will be created\n  + resource "aws_vpc" "vpc" {\n      + arn                              = (known after apply)\n      + assign_generated_ipv6_cidr_block = false\n      + cidr_block                       = "10.1.0.0/19"\n      + default_network_acl_id           = (known after apply)\n      + default_route_table_id           = (known after apply)\n      + default_security_group_id        = (known after apply)\n      + dhcp_options_id                  = (known after apply)\n      + enable_classiclink               = (known after apply)\n      + enable_classiclink_dns_support   = (known after apply)\n      + enable_dns_hostnames             = true\n      + enable_dns_support               = true\n      + id                               = (known after apply)\n      + instance_tenancy                 = "default"\n      + ipv6_association_id              = (known after apply)\n      + ipv6_cidr_block                  = (known after apply)\n      + main_route_table_id              = (known after apply)\n      + owner_id                         = (known after apply)\n      + tags                             = {\n          + "Name"      = "sample_company-vpc"\n          + "createdBy" = "terraform"\n          + "directory" = "terraform_vpc"\n          + "owner"     = "Sample Company"\n        }\n    }\n\nPlan: 10 to add, 0 to change, 0 to destroy.\n\nChanges to Outputs:\n  + private_subnet_id = (known after apply)\n  + public_subnet_id  = (known after apply)\n  + vpc_id            = (known after apply)\n\n------------------------------------------------------------------------\n\nNote: You didn\'t specify an "-out" parameter to save this plan, so Terraform\ncan\'t guarantee that exactly these actions will be performed if\n"terraform apply" is subsequently run.\n')),o.a.createElement(i.MDXTag,{name:"p",components:n},"And then we can run terraform apply to create (hint: the provider override file contains my aws credentials)"),o.a.createElement(i.MDXTag,{name:"pre",components:n},o.a.createElement(i.MDXTag,{name:"code",components:n,parentName:"pre",props:{metaString:null}},'terraform apply -auto-approve\naws_eip.i: Creating...\naws_vpc.vpc: Creating...\naws_eip.i: Creation complete after 1s [id=eipalloc-07a5b6e9969679e9a]\naws_vpc.vpc: Still creating... [10s elapsed]\naws_vpc.vpc: Creation complete after 13s [id=vpc-0ee271c94e219deea]\naws_internet_gateway.igw: Creating...\naws_subnet.subnet_public: Creating...\naws_subnet.subnet_private: Creating...\naws_internet_gateway.igw: Creation complete after 1s [id=igw-083b659e6f53b4b9b]\naws_route_table.i_public: Creating...\naws_subnet.subnet_private: Creation complete after 1s [id=subnet-017347820c7bb83c8]\naws_route_table.i_public: Creation complete after 1s [id=rtb-084443e46fff84c82]\naws_subnet.subnet_public: Still creating... [10s elapsed]\naws_subnet.subnet_public: Creation complete after 11s [id=subnet-0edd369fe4214404d]\naws_route_table_association.i_subnet_public: Creating...\naws_nat_gateway.i: Creating...\naws_route_table_association.i_subnet_public: Creation complete after 1s [id=rtbassoc-0ebf833870a641f5f]\naws_nat_gateway.i: Still creating... [10s elapsed]\naws_nat_gateway.i: Still creating... [20s elapsed]\naws_nat_gateway.i: Still creating... [30s elapsed]\naws_nat_gateway.i: Still creating... [40s elapsed]\naws_nat_gateway.i: Still creating... [50s elapsed]\naws_nat_gateway.i: Still creating... [1m0s elapsed]\naws_nat_gateway.i: Still creating... [1m10s elapsed]\naws_nat_gateway.i: Still creating... [1m20s elapsed]\naws_nat_gateway.i: Still creating... [1m30s elapsed]\naws_nat_gateway.i: Still creating... [1m40s elapsed]\naws_nat_gateway.i: Still creating... [1m50s elapsed]\naws_nat_gateway.i: Creation complete after 1m57s [id=nat-03043971b4a8e4147]\naws_default_route_table.main: Creating...\naws_default_route_table.main: Creation complete after 1s [id=rtb-095d0340369c30ec2]\naws_route_table_association.i_subnet_private: Creating...\naws_route_table_association.i_subnet_private: Creation complete after 1s [id=rtbassoc-04cc0aad7e390cefd]\n\nApply complete! Resources: 10 added, 0 changed, 0 destroyed.\n\nOutputs:\n\nprivate_subnet_id = "subnet-017347820c7bb83c8"\npublic_subnet_id = "subnet-0edd369fe4214404d"\nvpc_id = "vpc-0ee271c94e219deea"\n')),o.a.createElement(i.MDXTag,{name:"p",components:n},"Then we can take a look at the AWS Console to see the results of our terraform run:"),o.a.createElement(s.f,{p:4,verticalAlign:"middle",src:t.images.VPC_CONSOLE_IMAGE}),o.a.createElement(s.f,{p:4,verticalAlign:"middle",src:t.images.SUBNET_PRIVATE_IMAGE}),o.a.createElement(s.f,{p:4,verticalAlign:"middle",src:t.images.SUBNET_PUBLIC_IMAGE}),o.a.createElement(s.f,{p:4,verticalAlign:"middle",src:t.images.IGW_IMAGE}),o.a.createElement(s.f,{p:4,verticalAlign:"middle",src:t.images.ROUTE_TABLE_PUBLIC_IMAGE}),o.a.createElement(s.f,{p:4,verticalAlign:"middle",src:t.images.ROUTE_TABLE_MAIN_IMAGE}),o.a.createElement("br",null),o.a.createElement(i.MDXTag,{name:"p",components:n},"As we can see all our resources were created."),o.a.createElement("br",null),o.a.createElement(i.MDXTag,{name:"p",components:n},"To clean it all up again we can just run destroy:"),o.a.createElement("br",null),o.a.createElement(i.MDXTag,{name:"pre",components:n},o.a.createElement(i.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-json",metaString:""}},"terraform destroy -auto-approve\naws_route_table_association.i_subnet_private: Destroying... [id=rtbassoc-04cc0aad7e390cefd]\naws_route_table_association.i_subnet_public: Destroying... [id=rtbassoc-0ebf833870a641f5f]\naws_route_table_association.i_subnet_private: Destruction complete after 0s\naws_subnet.subnet_private: Destroying... [id=subnet-017347820c7bb83c8]\naws_default_route_table.main: Destroying... [id=rtb-095d0340369c30ec2]\naws_default_route_table.main: Destruction complete after 0s\naws_nat_gateway.i: Destroying... [id=nat-03043971b4a8e4147]\naws_route_table_association.i_subnet_public: Destruction complete after 0s\naws_route_table.i_public: Destroying... [id=rtb-084443e46fff84c82]\naws_subnet.subnet_private: Destruction complete after 1s\naws_route_table.i_public: Destruction complete after 1s\naws_internet_gateway.igw: Destroying... [id=igw-083b659e6f53b4b9b]\naws_nat_gateway.i: Still destroying... [id=nat-03043971b4a8e4147, 10s elapsed]\naws_internet_gateway.igw: Still destroying... [id=igw-083b659e6f53b4b9b, 10s elapsed]\naws_nat_gateway.i: Still destroying... [id=nat-03043971b4a8e4147, 20s elapsed]\naws_internet_gateway.igw: Still destroying... [id=igw-083b659e6f53b4b9b, 20s elapsed]\naws_nat_gateway.i: Still destroying... [id=nat-03043971b4a8e4147, 30s elapsed]\naws_internet_gateway.igw: Still destroying... [id=igw-083b659e6f53b4b9b, 30s elapsed]\naws_nat_gateway.i: Still destroying... [id=nat-03043971b4a8e4147, 40s elapsed]\naws_internet_gateway.igw: Still destroying... [id=igw-083b659e6f53b4b9b, 40s elapsed]\naws_internet_gateway.igw: Destruction complete after 46s\naws_nat_gateway.i: Still destroying... [id=nat-03043971b4a8e4147, 50s elapsed]\naws_nat_gateway.i: Destruction complete after 51s\naws_eip.i: Destroying... [id=eipalloc-07a5b6e9969679e9a]\naws_subnet.subnet_public: Destroying... [id=subnet-0edd369fe4214404d]\naws_subnet.subnet_public: Destruction complete after 1s\naws_vpc.vpc: Destroying... [id=vpc-0ee271c94e219deea]\naws_vpc.vpc: Destruction complete after 0s\naws_eip.i: Destruction complete after 1s\n\nDestroy complete! Resources: 10 destroyed.\n")),o.a.createElement("br",null))}}}]);
//# sourceMappingURL=158.5a401d60.chunk.js.map