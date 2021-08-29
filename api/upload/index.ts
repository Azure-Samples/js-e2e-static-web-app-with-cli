import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import HTTP_CODES from "http-status-enum";
import * as multipart from "parse-multipart";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    if (!req.query?.filename) {
        context.res.body = `Filename is not defined`;
        context.res.status = HTTP_CODES.BAD_REQUEST
    }

    if (!req.body || !req.body.length){
        context.res.body = `Request body is not defined`;
        context.res.status = HTTP_CODES.BAD_REQUEST
    }

    try {
        // Each chunk of the file is delimited by a special string
        const bodyBuffer = Buffer.from(req.body);
        const boundary = multipart.getBoundary(req.headers["content-type"]);
        const parts = multipart.Parse(bodyBuffer, boundary);

        // The file buffer is corrupted or incomplete ?
        if (!parts?.length){
            context.res.body = `File buffer is incorrect`;
            context.res.status = HTTP_CODES.BAD_REQUEST
        }

        // Actual upload, using an output binding
        context.bindings.storage = parts[0]?.data;
    } catch (err) {
        context.log.error(err.message);
        {
            context.res.body = `${err.message}`;
            context.res.status = HTTP_CODES.INTERNAL_SERVER_ERROR
        }
    }
    return context.res;
};

export default httpTrigger;