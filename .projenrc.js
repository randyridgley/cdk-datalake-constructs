const { awscdk } = require('projen');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Randy Ridgley',
  authorAddress: 'randy.ridgley@gmail.com',
  description: 'AWS CDK Constructs that can be used to create datalakes/meshes and more',
  cdkVersion: '2.13.0',
  defaultReleaseBranch: 'main',
  name: '@randyridgley/cdk-datalake-constructs',
  repositoryUrl: 'https://github.com/randyridgley/cdk-datalake-constructs.git',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  licensed: true,
  license: 'MIT',
  devenv: true,
  deps: [
    'aws-cdk-lib',
    '@aws-cdk/aws-glue-alpha',
    '@aws-cdk/aws-lambda-python-alpha',
  ],
  devDeps: [
    'cdk-nag',
  ],
  peerDeps: [
    '@aws-cdk/aws-glue-alpha',
  ],
  gitignore: [
    'src/emr-studio.ts',
    'src/emr-cluster-sc.ts',
    'src/etl/kda-studio.ts',
    'src/etl/glue-notebook.ts',
    'workflows/*',
    '*.DS_Store',
    '*cdk.context.json',
  ],
  releaseEveryCommit: true,
  release: true,
  releaseWorkflowName: 'release',
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['randyridgley'],
  },
  depsUpgrade: true,
  context: {
    '@aws-cdk/core:newStyleStackSynthesis': 'true',
  },
  autoApproveUpgrades: true,
  eslint: true,
  mergify: true,
  antitamper: true,
  buildWorkflow: true,
  npmTokenSecret: 'NPM_TOKEN',
  releaseToNpm: true,
  publishToPypi: {
    distName: 'cdk-datalake-constructs',
    module: 'cdk_datalake_constructs',
  },
  publishToMaven: {
    mavenEndpoint: 'https://s01.oss.sonatype.org',
    javaPackage: 'io.github.randyridgley.cdk.datalake.constructs',
    mavenGroupId: 'io.github.randyridgley',
    mavenArtifactId: 'cdk-datalake-constructs',
  },
  // publishToGo: {
  //   gitUserName: 'randyridgley',
  //   gitUserEmail: 'randy.ridgley@gmail.com',
  //   moduleName: 'github.com/randyridgley/cdk-datalake-constructs',
  // },
  // publishToNuget: {
  //   dotNetNamespace: 'Cdk.Datalake.Constructs',
  //   packageId: 'Cdk.Datalake.Constructs',
  // },
  catalog: {
    announce: true,
    twitter: 'randyridgley',
  },
  keywords: ['aws',
    'aws-cdk',
    'cdk-construct',
    'cdk',
    'datalake',
    'datamesh',
    'lakeformation',
    'glue'],
  tsconfig: {
  },
});

// project.tasks.tryFind('package').prependExec('go env -w GOSUMDB=off');

const common_exclude = [
  'cdk.out', 'cdk.context.json', 'yarn-error.log', '.DS_Store', 'coverage', '.metals',
];
project.npmignore.exclude(...common_exclude, 'maven_release*', 'examples*');
project.gitignore.exclude(...common_exclude);

const openCoverage = project.addTask('coverage');
openCoverage.exec('npx projen test && open coverage/lcov-report/index.html');

project.synth();