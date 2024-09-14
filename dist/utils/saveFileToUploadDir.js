import fs from 'fs/promises';
import path from 'path';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
export const saveFileToUploadDir = async (file) => {
    await fs.rename(path.join(TEMP_UPLOAD_DIR, file.filename), path.join(UPLOAD_DIR, file.filename));
    return `/uploads/${file.filename}`;
};
