// import lambda client
import { LambdaClient, InvokeAsyncCommand } from '@aws-sdk/client-lambda';

const client = new LambdaClient();

function calcResponse(event: any): any {
    console.log("[Function] Calculating response");
    // Simulate sync work
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                "message": "hello from async"
            });
        }, 1000);
    });
}

async function submitAsyncTask(response: any): Promise<void> {
    // Invoke async function to continue
    console.log("[Function] Invoking async task in async function");
    const command = new InvokeAsyncCommand({
        FunctionName: process.env.ASYNC_FUNCTION,
        InvokeArgs: JSON.stringify(response)
    });
    await client.send(command);
}

const handler = async (event: any, context: any): Promise<any> => {
    console.log(`[Function] Received event: ${JSON.stringify(event)}`);

    const response = await calcResponse(event);

    // Done calculating response, submit async task
    submitAsyncTask(response);

    // Return response to client
    console.log("[Function] Returning response to client");
    return {
        "statusCode": 200,
        "body": JSON.stringify(response)
    };
}

export { handler };
