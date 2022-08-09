import AWS from 'aws-sdk';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // parse form with a Promise wrapper
    const data: any = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    if (data?.files?.sharedFile) {
      // read file from the temporary path
      const contents = await fs.readFile(data.files.sharedFile?.filepath, {
        encoding: 'utf8',
      });

      // const s3 = new AWS.S3({
      //   accessKeyId: process.env.S3_ACCESS_KEY,
      //   secretAccessKey: process.env.S3_SECRET_KEY
      // });

      // const params = {
      //   Bucket: process.env.AWS_BUCKET_NAME,
      //   Key: `parashat-shavoa/${data.files.sharedFile.originalFilename}`,
      //   Body: contents,
      //   Metadata: {
      //     something: 'wow!'
      //   }
      // }
      //
      // const response = await s3.listObjectsV2({
      //   Bucket: process.env.AWS_BUCKET_NAME,
      //   Prefix: 'parashat-shavoa'
      // }).promise();
      //
      // console.log(response);

      // s3.getObject({
      //   Bucket: process.env.AWS_BUCKET_NAME,
      //   Key: data.files.sharedFile.originalFilename,
      // }, (err, data) => {
      //   console.log(data);
      // });

      // s3.upload(params, (err, data) => {
      //   if (err) {
      //     res.status(400).json(API_ERRORS.uploadFileError);
      //   }
      //
      //   res.status(200).json({ isUploaded: true });
      // });
    }
  }
}
