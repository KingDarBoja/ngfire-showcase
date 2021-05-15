import { https, logger } from 'firebase-functions';

export const createJobPost = https.onCall(createJobPostCF);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function createJobPostCF(_data: never, _context: https.CallableContext): Promise<void> {
  logger.info('Hello job post!', { structuredData: true });
  return;
}
