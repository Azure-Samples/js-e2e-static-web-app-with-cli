import { AzureFunction, Context, HttpRequest } from "@azure/functions"

// npm dependencies
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    newPipeline
} from '@azure/storage-blob';

// function constants
const containerName1 = 'thumbnails';
const containerName2 = 'images';
const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };
const ONE_MINUTE = 60 * 1000;

// Create storage access
const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.AZURE_STORAGE_ACCOUNT_NAME,
    process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY);
const pipeline = newPipeline(sharedKeyCredential);
const blobServiceClient = new BlobServiceClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
    pipeline
);

const getBlobName = originalName => {
    // Use a random number to generate a unique file name, 
    // removing "0." from the start of the string.
    const identifier = Math.random().toString().replace(/0\./, '');
    return `${identifier}-${originalName}`;
  };


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    let bodyResponse;
    let blobs=[];

    if(req.method.toLowerCase()==="get"){
        const containerClient = blobServiceClient.getContainerClient(containerName2);

        for await (const blob of containerClient.listBlobsFlat()) {
            console.log('\t', blob.name);
            blobs.push(blob.name);
        }

        bodyResponse = {
            accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
            containerName: containerName2,
            thumbnails:null,
            blobs:blobs
        }

    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: bodyResponse
    };

};

export default httpTrigger;

/*

npm install @azure/storage-blob into-stream multer body-parser --save


*/