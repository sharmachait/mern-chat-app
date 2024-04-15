const { BlobServiceClient } = require('@azure/storage-blob');
const dotenv = require('dotenv');
dotenv.config();
const accountName = process.env.ACCOUNTNAME;
const containerName = process.env.CONTAINERNAME;
const sasToken = process.env.SASTOKEN;

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net/?${sasToken}`
);
const container = blobServiceClient.getContainerClient(containerName);

async function uploadImageStream(filename, file) {
  const blob = container.getBlockBlobClient(filename);
  await blob.uploadData(file);
  return blob.url;
}

async function saveToBlob(filename, ext, file) {
  try {
    const imageUrl = await uploadImageStream(filename, file);
    return { imageUrl };
  } catch (e) {
    console.log('error uploading: ' + e);
  }
}
module.exports = saveToBlob;
