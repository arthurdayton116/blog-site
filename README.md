# What's here
This is a repo that demonstrates how to build and deploy a React based blog site to S3 and CloudFront.

It's also Blog Content I use to blog to arthurdayton.com

For simplicity I am taking a mono-repo approach and using GitHub actions for deployment and Terraform Cloud for state storage.

##

```
yarn build
```

Run - 
```
yarn start 

or 

nodemon --watch src start
```
Audit - 


to check vulns - https://classic.yarnpkg.com/en/docs/cli/audit/

```
yarn audit --groups dependencies
```


put react-scripts is in dev dependencies - https://github.com/facebook/create-react-app/issues/11102

### This seems way better for managing vulns in React code and CI runs
https://github.com/IBM/audit-ci

Install - 
```
yarn add -D audit-ci

```

Use - 
```
npx audit-ci --config vulns/audit-ci.json

```





## Maybe someday 
Azure approach - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website
