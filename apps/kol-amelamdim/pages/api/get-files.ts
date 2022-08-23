import AWS from 'aws-sdk';
import { Category } from '@kol-amelamdim/types';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    });

    const fileLocation = `${Category.parashat_shavoa}/`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: fileLocation,
    };

    s3.listObjectsV2(params, (err, data) => {
      console.log({ err });
      console.log({ data });
      if (data) {
        return res.json(data);
      }
    });
  }
}
