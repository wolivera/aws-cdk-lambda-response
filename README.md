# Running code after returning a response from an AWS Lambda functions

This project explores the ability to run Lambda functions and return the responses using [different strategies](https://aws.amazon.com/blogs/compute/running-code-after-returning-a-response-from-an-aws-lambda-function/) such as:

- Asynchronous invocation
- Response streaming
- Lambda extensions
- Custom runtime

## Deployment

This project uses for CDK development & deployment with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
