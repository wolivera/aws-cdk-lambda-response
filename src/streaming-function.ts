import { Logger } from '@aws-lambda-powertools/logger';
import * as awslambda from 'lambda-stream';

const logger = new Logger();

export const handler = awslambda.streamifyResponse(async (event: any, responseStream: any, _context: any) => {
    logger.info("[Function] Received event: ", event);
  
    // Do some stuff with event
    let response = await calc_response(event);
    
    // Return response to client
    logger.info("[Function] Returning response to client");
    responseStream.setContentType('application/json');
    responseStream.write(response);
    responseStream.end();

    await async_task(response);   
});

const calc_response = async (event: any) => {
    logger.info("[Function] Calculating response");
    await sleep(1);  // Simulate sync work

    return {
        message: "hello from streaming"
    };
};

const async_task = async (response: any) => {
    logger.info("[Async task] Starting async task");
    await sleep(3);  // Simulate async work
    logger.info("[Async task] Done");
};

const sleep = async (sec: any) => {
    return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000);
    });
};
