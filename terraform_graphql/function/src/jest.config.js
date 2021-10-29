const {resolve} = require('path');

// Define path of project level config - extension not required as file will be imporated via `require(process.env.JEST_DYNAMODB_CONFIG)`
process.env.JEST_DYNAMODB_CONFIG = resolve(__dirname, './jest-dynamodb-config');

module.exports = {
    // globalSetup: resolve(__dirname, './setup.js'),
    // globalTeardown: resolve(__dirname, './teardown.js'),
    // testEnvironment: resolve(__dirname, './environment.js'),
    preset: '@shelf/jest-dynamodb'
};
