import express from 'express';
import multer from 'multer';

import UploadConstroller from '../controllers/UploadConstroller.js';

const upload = multer({dest: 'uploads/'});

const uploadRoutes = express.Router();

uploadRoutes.post('/', upload.single('file'), UploadConstroller.upload);

export default uploadRoutes;
