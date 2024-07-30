import * as awslambda from 'lambda-stream';

export const handler = awslambda.streamifyResponse(async (event: any, responseStream: any, _context: any) => {
    console.log("[Function] Received event: ", event);
  
    // Do some stuff with event
    let response = await calc_response(event);
    
    // Return response to client
    console.log("[Function] Returning response to client");
    responseStream.setContentType('application/json');
    responseStream.write(response);
    responseStream.end();

    await async_task(response);   
});

const calc_response = async (event: any) => {
    console.log("[Function] Calculating response");
    await sleep(1);  // Simulate sync work

    return {
        message: "hello from streaming"
    };
};

const async_task = async (response: any) => {
    console.log("[Async task] Starting async task");
    await sleep(3);  // Simulate async work
    console.log("[Async task] Done");
};

const sleep = async (sec: any) => {
    return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000);
    });
};
