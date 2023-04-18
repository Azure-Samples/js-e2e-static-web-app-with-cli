import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

app.get('hello', {
    authLevel: 'anonymous',
    handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

        // Log is available from Azure portal when app is deployed to Azure
        context.log(`Hello GET function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';
        const data = { value: `Hello, ${name}!` }
        console.log(data)

        return { jsonBody: data };
    }
})
