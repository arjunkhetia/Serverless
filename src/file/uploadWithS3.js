import middy from '@middy/core';
import httpMultipartBodyParser from '@middy/http-multipart-body-parser';
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const lambdaHandler = async (event) => {
    const { body } = event;
    const s3Client = new S3Client({
        region: 'ap-south-1'
    });
    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: body.file.filename,
            Body: body.file.content
        }
    });
    await upload.done();
    return {
        headers: {'Access-Control-Allow-Origin': '*'},
        statusCode: 200,
        body: JSON.stringify({
            message: '📤 File uploaded successfully'
        })
    }
}

export const handler = middy(lambdaHandler)
    .use(httpMultipartBodyParser())