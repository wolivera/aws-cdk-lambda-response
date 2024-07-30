import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

interface Response {
  message: string;
}

const calcResponse = (event: APIGatewayProxyEvent): Promise<Response> => {
  console.log(`[Function] Calculating response`);
  // Simulate sync work
  return new Promise(resolve => setTimeout(() => {
    resolve({
      message: "hello from main thread"
    });
  }, 1000));
}

const asyncTask = async (response: Response) => {
  console.log(`[Async task] Starting async task: ${JSON.stringify(response)}`);
  // Simulate async work
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log(`[Async task] Done`);
}

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log(`[Function] Received event: ${JSON.stringify(event)}`);

  // Calculate response
  const response = await calcResponse(event);
  // Done calculating response

  // Return response to client
  console.log(`[Function] Returning response to client`);
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
}
