# What's here
This folder contains Terraform code to deploy graphql server on AWS lambda.

The JavaScript code for creating is in the function/src folder.

### GraphQL
https://www.apollographql.com/docs/react/get-started/

Assumes you have .aws/credentials file set up
https://registry.terraform.io/providers/hashicorp/aws/latest/docs#shared-credentials-file

### Deployment
To deploy via terraform locally first run (from within function folder):

```
./gql_buildpackage.sh
```

Then run:
```
terraform apply
```

You will need to supply a local.auto.tfvars file with values for the variables.tf

Example:
```
okta_client_id = "XXXXXXXX"
okta_client_secret = "XXXXXXXXXX"
okta_domain = "dev-XXXXXX.okta.com"
okta_issuer_suffix="/oauth2/XXXXXXX"
okta_issuer="https://$OKTA_DOMAIN$OKTA_ISSUER_SUFFIX"
okta_audience="http://localhost:4000"

```

## Run Locally
To run locally using a local version of dynamodb (from within function/docker):

```
########################
Preferred method is to use docker-compose up
########################

otherwise you can do individual containers

########################
Delete Docker Network
########################

docker network rm graphql-net;

######################## 
## Create a network for containers
########################

docker network create --driver bridge graphql-net

########################
## Check it exists
########################

docker network ls

########################

########################
## Start local dynamo db
## https://hub.docker.com/r/amazon/dynamodb-local
## https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html

## run command from terraform/terraform_graphql/function
######################## 
#Stop - and delete data file - Dynamo
######################## 
 docker stop localDynamoTestContainer; 
 
 docker rm localDynamoTestContainer; 

 rm -f dynamodb/*.db;

######################## 
#Start
######################## 

 docker run -p 8000:8000 \
  -w /home/dynamodblocal \
  -v `pwd`/dynamodb:/home/dynamodblocal/data \
  --name localDynamoTestContainer \
  --network graphql-net \
  -it  amazon/dynamodb-local:1.17.0 

######################## 
##Check running
 docker ps

######################## 

#########################
# Stop and delete 
#########################

 docker stop localGraphQLTestContainer; 
 
 docker rm localGraphQLTestContainer; 
 
#########################

#########################  
## Start local graphql and use local dynamodb and bypass auth(CYPRESS_GRAPHQL=true & DYNAMO_HOST=localDynamoTestContainer & JWT_OVERRIDE=true)
#########################
## run command from terraform/terraform_graphql/function
#########################

docker run -p 4000:4000 \
-v `pwd`/src:/src \
-w /src \
-v $HOME/.aws/credentials:/root/.aws/credentials \
--name localGraphQLTestContainer \
--env CYPRESS_GRAPHQL=true \
--env GRAPHQL_PORT=4000 \
--env JWT_OVERRIDE=true \
--env DYNAMO_HOST=localDynamoTestContainer \
--network graphql-net \
-it node:16 /bin/bash -c "npm install nodemon -g; nodemon index.js"

######################## 
## OR DON'T Bypass Auth
######################## 

docker run -p 4000:4000 \
-v `pwd`/src:/src \
-w /src \
-v $HOME/.aws/credentials:/root/.aws/credentials \
--name localGraphQLTestContainer \
--env CYPRESS_GRAPHQL=true \
--env GRAPHQL_PORT=4000 \
--env DYNAMO_HOST=localDynamoTestContainer \
--network graphql-net \
-it node:16 /bin/bash -c "npm install nodemon -g; nodemon index.js"

######################## 
## OR
######################## 
## Start local graphql and use online dynamodb
#########################
docker run -p 4000:4000 \
-v `pwd`/src:/src \
-w /src \
-v $HOME/.aws/credentials:/root/.aws/credentials \
--name localGraphQLTestContainer \
--env GRAPHQL_PORT=4000 \
--env JWT_OVERRIDE=true \
--network graphql-net \
-it node:16 /bin/bash -c "npm install nodemon -g; nodemon index.js"
######################## 

#########################
# Stop and delete - React container
#########################

 docker stop localReactTestContainer;
 
 docker rm localReactTestContainer;
 
######################## 
# Start local React
######################## 

docker run -p 3001:3001 \
-v `pwd`:/src \
-w /src \
--name localReactTestContainer \
--env DOCKER_GRAPHQL_ENDPOINT=localGraphQLTestContainer \
--network graphql-net \
-it node:16 yarn start

######################## 

 

```
