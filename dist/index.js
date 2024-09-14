import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoDB } from './db/initMongoDB.js';
import { initServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
const bootstrap = async () => {
    await initMongoDB();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    initServer();
};
bootstrap();
