import { https, logger } from 'firebase-functions';
import { CompanyEntity } from '@ngfire-showcase/company-domain';

export const createCompany = https.onCall(createCompanyCF);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function createCompanyCF(_data: CompanyEntity, _context: https.CallableContext): Promise<void> {
  logger.info('Hello company!', { structuredData: true });
  return;
}
