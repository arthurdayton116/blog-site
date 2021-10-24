# blog-site
Clean site set up

## Stuff to know 
Run this
```
yarn audit --groups dependencies
```
to check vulns - https://classic.yarnpkg.com/en/docs/cli/audit/

react-scripts is in dev dependencies - https://github.com/facebook/create-react-app/issues/11102

# This is way better for managing vulns
https://github.com/IBM/audit-ci

Install - 
```
yarn add -D audit-ci

```

use - 
```
npx audit-ci --config vulns/audit-ci.json

```

# Check for changes to files for mono-repo
https://github.com/tj-actions/changed-files

# clean up bucket for destroy aws s3 rm s3://bucketname --recursive

Azure approach - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website
