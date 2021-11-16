# What's here
This is code for building UI.

Creating a new blog post is done by:
 - adding a new numbered folder to src/blogs folder 
 - updating the data.json file.
 - updating the BlogMDX.js file
 - setting the maxPostNumber variable in the /src/components/Blog.js file

## Running locally

See [terraform_graphql README.md](../terraform/terraform_graphql/README.md)


or you can use 

```
yarn start 
```

## Auditing

To check vulns with yarn - https://classic.yarnpkg.com/en/docs/cli/audit/

Make sure to put react-scripts in dev dependencies - https://github.com/facebook/create-react-app/issues/11102


```
yarn audit --groups dependencies
```

### For a more robust way to manage vulns in React code and CI runs
https://github.com/IBM/audit-ci

Install -
```
yarn add -D audit-ci

```

Use -
```
npx audit-ci --config vulns/audit-ci.json

