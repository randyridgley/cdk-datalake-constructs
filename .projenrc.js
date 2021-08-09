const { AwsCdkConstructLibrary, ProjectType, NpmAccess, NodePackageManager, DependenciesUpgradeMechanism, Stability } = require('projen');

const CDK_VERSION = '1.117.0';

const project = new AwsCdkConstructLibrary({
  author: 'Randy Ridgley',
  authorAddress: 'randy.ridgley@gmail.com',
  description: 'AWS CDK Constructs that can be used to create datalakes/meshes and more',
  stability: Stability.EXPERIMENTAL,
  cdkVersion: CDK_VERSION,
  defaultReleaseBranch: 'main',
  name: 'cdk-datalake-constructs',
  repositoryUrl: 'https://github.com/randyridgley/cdk-datalake-constructs.git',
  projectType: ProjectType.LIB,
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  npmAccess: NpmAccess.PUBLIC,
  packageManager: NodePackageManager.YARN,
  cdkAssert: true,
  licensed: true,
  license: 'MIT',
  packageName: 'cdk-datalake-constructs',
  gitpod: true,
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-athena',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-dynamodb',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-emr',
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
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-servicecatalog',
    '@aws-cdk/aws-stepfunctions',
    '@aws-cdk/aws-stepfunctions-tasks',
    '@aws-cdk/custom-resources',
    '@aws-cdk/region-info',
  ],
  gitignore: [
    'src/emr-studio.ts',
    'src/emr-cluster-sc.ts',
    'src/etl/kda-studio.ts',
    'src/etl/glue-notebook.ts',
    'workflows/*',
  ],
  devDeps: [
    'ts-node',
    'constructs',
    'source-map-support',
  ],
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: 'PROJEN_GITHUB_TOKEN',
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['randyridgley'],
  },
  docgen: true,
  eslint: true,
  mergify: true,
  antitamper: true,
  releaseWorkflow: true,
  buildWorkflow: true,
  packageManager: NodePackageManager.NPM,
  npmRegistryUrl: 'https://npm.pkg.github.com',
  npmTokenSecret: 'GITHUB_TOKEN',
  publishToPypi: {
    distName: 'cdk-datalake-constructs',
    module: 'cdk_datalake_constructs',
  },
  // publishToMaven: {
  //   javaPackage: 'io.github.randyridgley.cdk.datalake.constructs',
  //   mavenGroupId: 'io.github.randyridgley.cdk.datalake.constructs',
  //   mavenArtifactId: 'cdk-datalake-constructs',
  // },
  // publishToGo: {
  //   gitUserName: 'randyridgley',
  //   gitUserEmail: 'randy.ridgley@gmail.com',
  //   moduleName: 'github.com/randyridgley/cdk-datalake-constructs',
  // },
  // publishToNuget: {
  //   dotNetNamespace: 'Cdk.Datalake.Constructs',
  //   packageId: 'Cdk.Datalake.Constructs',
  // },
  releaseToNpm: true,
  catalog: {
    announce: false,
    twitter: 'randyridgley',
  },
  keywords: ['aws',
    'aws-cdk',
    'aws-ses',
    'cdk-construct',
    'cdk',
    'datalake',
    'datamesh',
    'lakeformation',
    'glue'],
  pullRequestTemplateContents: [
    '',
    '----',
    '',
    '*By submitting this pull request, I confirm that my contribution is made under the terms of the MIT license*',
  ],
});

project.tasks.tryFind('package').prependExec('go env -w GOSUMDB=off');

const common_exclude = [
  'cdk.out', 'cdk.context.json', 'images', 'yarn-error.log', '.DS_Store', 'coverage',
];
project.npmignore.exclude(...common_exclude, 'maven_release*');
project.gitignore.exclude(...common_exclude);

project.gitpod.addTasks({
  name: 'Setup',
  init: 'yarn install',
  command: 'npx projen build',
});

const openCoverage = project.addTask('coverage');
openCoverage.exec('npx projen test && open coverage/lcov-report/index.html');
project.npmignore.exclude('examples');

project.synth();