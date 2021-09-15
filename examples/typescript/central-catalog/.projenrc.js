const { AwsCdkTypeScriptApp } = require('projen');
const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: 'central-governance',

  cdkDependencies: [
    '@aws-cdk/core'
  ],        /* Which AWS CDK modules (those that start with "@aws-cdk/") this app uses. */
  deps: [
    '@randyridgley/cdk-datalake-constructs'
  ],                          /* Runtime dependencies of this module. */
  github: false,
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
});
project.synth();