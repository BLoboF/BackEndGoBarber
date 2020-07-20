import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename: (request, response, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}`;

      return callback(null, filename);
    },
  }),
};
