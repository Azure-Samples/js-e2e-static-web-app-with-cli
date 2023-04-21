import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    return { jsonBody: {
        env: process.env,
        requestHeaders: request.headers 
    }};
};

app.http('status', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: httpTrigger1
});
