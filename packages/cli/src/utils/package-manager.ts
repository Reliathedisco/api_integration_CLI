import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import { getIntegrationById } from './integrations';

type PackageManager = 'npm' | 'pnpm' | 'yarn';

/**
 * Detect which package manager is being used in the project
 */
export function detectPackageManager(): PackageManager {
  const cwd = process.cwd();

  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }

  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) {
    return 'yarn';
  }

  return 'npm';
}

/**
 * Install dependencies for the selected integrations
 */
export async function installDependencies(integrationIds: string[]): Promise<void> {
  const packageManager = detectPackageManager();
  const allDependencies: string[] = [];

  // Collect all dependencies
  for (const id of integrationIds) {
    const integration = getIntegrationById(id);
    if (integration) {
      allDependencies.push(...integration.dependencies);
    }
  }

  // Remove duplicates
  const uniqueDependencies = [...new Set(allDependencies)];

  if (uniqueDependencies.length === 0) {
    return;
  }

  // Build install command based on package manager
  const installCommand = packageManager === 'yarn' ? 'add' : 'install';
  
  // Execute installation
  await execa(packageManager, [installCommand, ...uniqueDependencies], {
    stdio: 'inherit',
  });
}

