import AWS from 'aws-sdk';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { Category } from '@kol-amelamdim/types';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData: any = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const { fields } = formData;
    const selectedCategory = Category[fields.category];

    if (formData?.files?.sharedFile && selectedCategory) {
      // read file from the temporary path
      const contents = await fs.readFile(formData.files.sharedFile?.filepath, {
        encoding: 'utf8',
      });

      const s3 = new AWS.S3({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      });

      const fileLocation = `${selectedCategory}/${formData.files.sharedFile.originalFilename}`;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileLocation,
        Body: contents,
      };

      s3.upload(params, (err, _) => {
        if (err) {
          res.status(400).json(API_ERRORS.uploadFileError);
        }

        res.status(200).json({ isUploaded: true });
      });
    } else {
      res.status(400).json(API_ERRORS.missingFieldsOnUploadFile);
    }
  }
}
