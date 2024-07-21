const handler = async (event: any, context: any): Promise<any> => {
    console.log(`[Function] Received event: ${JSON.stringify(event)}`);
    
    // simulate task job
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });

    // Return response to client
    console.log("[Function] Returning response to client");
    return {
        "statusCode": 200,
        "body": "OK from Async Task!"
    };
}

export { handler };
