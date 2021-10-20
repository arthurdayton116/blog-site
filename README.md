# blog-site
Clean site set up

## Stuff to know 
Run this
```
yarn audit --groups dependencies
```
to check vulns - https://classic.yarnpkg.com/en/docs/cli/audit/

react-scripts is in dev dependencies - https://github.com/facebook/create-react-app/issues/11102

https://github.com/IBM/audit-ci
yarn add -D audit-ci

```
npx audit-ci --skip-dev --report-type summary

npx audit-ci --skip-dev --report-type full

npx audit-ci --skip-dev --config vulns/audit-ci.json

```


