import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';

const commonMiddleware = (handler) => middy(handler)
    .use([
        httpHeaderNormalizer(),
        httpEventNormalizer(),
        httpJsonBodyParser(),
        httpErrorHandler(),
        cors()
    ])
    .use({
        onError: (request) => {
            request.response = {
                statusCode: request.error.statusCode,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: request.error.message,
                    cause: request.error.cause,
                }),
            };
        }
    });

export { commonMiddleware as commonMiddleware };