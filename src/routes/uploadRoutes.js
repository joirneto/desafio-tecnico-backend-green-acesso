import express from 'express';
import multer from 'multer';

import UploadConstroller from '../controllers/UploadConstroller.js';

const upload = multer({dest: 'uploads/'});

const uploadRoutes = express.Router();

uploadRoutes.post('/csv', upload.single('file'), UploadConstroller.uploadCSV);
uploadRoutes.post('/pdf', upload.single('file'), UploadConstroller.uploadPDF);

export default uploadRoutes;
