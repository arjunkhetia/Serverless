import { v4 as uuidv4 } from 'uuid';

export async function handler(event) {
    return {
        headers: {'Access-Control-Allow-Origin': '*'},
        statusCode: 200,
        body: JSON.stringify({
            message: '🌐 New UUID: ' + uuidv4()
        }),
    };
}