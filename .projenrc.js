const { AwsCdkConstructLibrary, ProjectType, NpmAccess, DependenciesUpgradeMechanism, Stability } = require('projen');

const CDK_VERSION = '1.118.0';

const project = new AwsCdkConstructLibrary({
  author: 'Randy Ridgley',
  authorAddress: 'randy.ridgley@gmail.com',
  description: 'AWS CDK Constructs that can be used to create datalakes/meshes and more',
  stability: Stability.EXPERIMENTAL,
  cdkVersion: CDK_VERSION,
  defaultReleaseBranch: 'main',
  name: '@randyridgley/cdk-datalake-constructs',
  repositoryUrl: 'https://github.com/randyridgley/cdk-datalake-constructs.git',
  projectType: ProjectType.LIB,
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  npmAccess: NpmAccess.PUBLIC,
  cdkAssert: true,
  licensed: true,
  license: 'MIT',
  gitpod: true,
  devenv: true,
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/assets',
    '@aws-cdk/aws-athena',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-cloudformation',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-emr',
    '@aws-cdk/aws-eks',
    '@aws-cdk/aws-events',
    '@aws-cdk/aws-events-targets',
    '@aws-cdk/aws-glue',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-kinesis',
    '@aws-cdk/aws-kinesisanalytics',
    '@aws-cdk/aws-kinesisfirehose',
    '@aws-cdk/aws-kms',
    '@aws-cdk/aws-lakeformation',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-s3-assets',
    '@aws-cdk/aws-s3-deployment',
    '@aws-cdk/aws-s3-notifications',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-sagemaker',
    '@aws-cdk/aws-sam',
    '@aws-cdk/aws-secretsmanager',
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-sns-subscriptions',
    '@aws-cdk/aws-sqs',
    '@aws-cdk/aws-servicecatalog',
    '@aws-cdk/aws-stepfunctions',
    '@aws-cdk/aws-stepfunctions-tasks',
    '@aws-cdk/custom-resources',
    '@aws-cdk/region-info',
    '@aws-cdk/aws-lambda-python',
  ],
  cdkTestDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-athena',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-events',
    '@aws-cdk/aws-events-targets',
    '@aws-cdk/aws-glue',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-kinesis',
    '@aws-cdk/aws-kinesisfirehose',
    '@aws-cdk/aws-kms',
    '@aws-cdk/aws-lakeformation',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-s3-assets',
    '@aws-cdk/aws-s3-notifications',
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-stepfunctions',
    '@aws-cdk/aws-stepfunctions-tasks',
  ],
  devDeps: [
    'esbuild',
    'source-map-support',
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
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: 'PROJEN_GITHUB_TOKEN',
    },
  }),
  autoApproveUpgrades: true,
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['randyridgley'],
  },
  docgen: true,
  eslint: true,
  mergify: true,
  antitamper: true,
  releaseEveryCommit: false,
  releaseWorkflow: true,
  buildWorkflow: true,
  minNodeVersion: '14.15.0',
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
  publishToNuget: {
    dotNetNamespace: 'Cdk.Datalake.Constructs',
    packageId: 'Cdk.Datalake.Constructs',
  },
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

project.tasks.tryFind('package').prependExec('go env -w GOSUMDB=off');

const common_exclude = [
  'cdk.out', 'cdk.context.json', 'yarn-error.log', '.DS_Store', 'coverage', '.metals',
];
project.npmignore.exclude(...common_exclude, 'maven_release*', 'examples');
project.gitignore.exclude(...common_exclude);

project.gitpod.addTasks({
  name: 'Setup',
  init: 'yarn install',
  command: 'npx projen build',
});

const openCoverage = project.addTask('coverage');
openCoverage.exec('npx projen test && open coverage/lcov-report/index.html');

project.synth();