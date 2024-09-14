import fs from 'fs/promises';

export const createDirIfNotExists = async (url: string) => {
  try {
    await fs.access(url);
  } catch (e) {
    const error = e as NodeJS.ErrnoException;
    if (error.code === 'ENOENT') {
      await fs.mkdir(url);
    }
  }
};
