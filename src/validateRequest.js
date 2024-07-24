import middy from '@middy/core';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const schema = {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' }
        },
        required: ['username']
      }
    },
    required: ['body']
};

const lambdaHandler = async (event) => {
    if (event.body.username === 'Arjun') {
        return {
            headers: {'Access-Control-Allow-Origin': '*'},
            statusCode: 200,
            body: JSON.stringify({
                message: '✅ Validation successful',
            }),
        };
    } else {
        var err = new createError.InternalServerError('Username is not Arjun');
        return {
            headers: {'Access-Control-Allow-Origin': '*'},
            statusCode: err.statusCode,
            body: JSON.stringify({
                message: err.message,
            }),
        };
    }
}

export const handler = middy(lambdaHandler)
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser())
    .use(validator({ 
        eventSchema: transpileSchema(schema) 
    }))
    .use(httpErrorHandler())
    .use({
        onError: (request) => {
            const error = request.error;
            if (error.expose) {
                request.response = {
                    statusCode: error.statusCode,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: error.message,
                        validationErrors: error.cause,
                    }),
                };
            }
        },
    });