import multer from 'multer';
import path from 'path';
import { config } from '../config';
import { promises as fs } from 'fs';
import { randomUUID } from 'crypto';

const imageStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const directory = path.join(config.publickPath, 'images');
    await fs.mkdir(directory, { recursive: true });
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    const ex = path.extname(file.originalname);
    cb(null, '/' + randomUUID() + ex);
  },
});

export const upload = multer({ storage: imageStorage });
