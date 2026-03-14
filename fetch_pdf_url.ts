
import { getSiteSettings } from './lib/settings';

async function main() {
  try {
    const settings = await getSiteSettings();
    console.log('AUDIT_PDF_URL:', settings?.auditPdfUrl);
  } catch (err) {
    console.error('Error fetching settings:', err);
  }
}

main();
