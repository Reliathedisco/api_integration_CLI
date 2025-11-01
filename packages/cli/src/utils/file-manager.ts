import fs from 'fs-extra';
import path from 'path';
import { getIntegrationById } from './integrations';

const TEMPLATES_DIR = path.join(__dirname, '../../templates');

/**
 * Copy integration template files to the user's project
 */
export async function copyIntegrationFiles(integrationId: string): Promise<void> {
  const integration = getIntegrationById(integrationId);
  
  if (!integration) {
    throw new Error(`Integration "${integrationId}" not found`);
  }

  const templatePath = path.join(TEMPLATES_DIR, integrationId);
  const targetPath = process.cwd();

  // Check if template directory exists
  if (!await fs.pathExists(templatePath)) {
    throw new Error(`Template directory for "${integrationId}" not found at ${templatePath}`);
  }

  // Copy the template directory to the target project
  // This will copy lib/{integration}/ files
  await fs.copy(templatePath, targetPath, {
    overwrite: false,
    errorOnExist: false,
  });

  // Merge .env.example if it exists
  await mergeEnvExample(templatePath, targetPath);
}

/**
 * Merge template's .env.example with the project's .env.example
 */
async function mergeEnvExample(templatePath: string, targetPath: string): Promise<void> {
  const templateEnvPath = path.join(templatePath, '.env.example');
  const targetEnvPath = path.join(targetPath, '.env.example');

  if (!await fs.pathExists(templateEnvPath)) {
    return;
  }

  const templateEnvContent = await fs.readFile(templateEnvPath, 'utf-8');

  if (await fs.pathExists(targetEnvPath)) {
    // Append to existing .env.example
    const targetEnvContent = await fs.readFile(targetEnvPath, 'utf-8');
    
    // Only add if not already present
    if (!targetEnvContent.includes(templateEnvContent.trim())) {
      await fs.appendFile(targetEnvPath, '\n' + templateEnvContent);
    }
  } else {
    // Create new .env.example
    await fs.writeFile(targetEnvPath, templateEnvContent);
  }
}

