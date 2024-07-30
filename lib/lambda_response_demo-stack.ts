import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

export class LambdaResponseDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const asyncTaskFunction = new lambda.Function(this, "AsyncTaskFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "async-task-function.handler",
      code: lambda.Code.fromAsset("./src")
    })
    const asyncTaskFunctionArn = asyncTaskFunction.functionArn;
    
    const mainSyncFunction = new lambda.Function(this, "MainSyncFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "main-sync-function.handler",
      code: lambda.Code.fromAsset("./src"),
      environment: {
        "ASYNC_FUNCTION": asyncTaskFunctionArn,
      },
    });
    const mainSyncFunctionArn = mainSyncFunction.functionArn;
    
    // Grant invoke permissions
    asyncTaskFunction.grantInvoke(mainSyncFunction);
    
    const streamingFunction = new lambda.Function(this, "StreamingFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "streaming-function.handler",
      code: lambda.Code.fromAsset("./src")
    });
    
    const extensionLayerArn = 'arn:aws:lambda:us-east-1:xxyyzz:layer:nodejs-extension:1'; // replace with your extension ARN
    const extensionFunction = new lambda.Function(this, "ExtensionsFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "extensions-function.handler",
      code: lambda.Code.fromAsset("./src"),
      layers: [lambda.LayerVersion.fromLayerVersionArn(this, 'ImportedLayer', extensionLayerArn)],
    });
    
    // Define the Lambda function URL resource
    const mainSyncFunctionUrl = mainSyncFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
    const streamingFunctionUrl = streamingFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
    const extensionsFunctionUrl = extensionFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
    
    // Define a CloudFormation output for the URL
    new cdk.CfnOutput(this, 'MainSyncLambdaUrl', {
      value: mainSyncFunctionUrl.url,
    });
    new cdk.CfnOutput(this, 'StreamingLambdaUrl', {
      value: streamingFunctionUrl.url,
    });
    new cdk.CfnOutput(this, 'ExtensionsLambdaUrl', {
      value: extensionsFunctionUrl.url,
    });
  }
}
