import chalk from 'chalk';
import ora from 'ora';
import { getAvailableIntegrations } from '../utils/integrations';
import { copyIntegrationFiles } from '../utils/file-manager';
import { installDependencies } from '../utils/package-manager';

export async function addCommand(integrationId: string) {
  console.log(chalk.bold.cyan(`\n🚀 Adding ${integrationId} integration\n`));

  const availableIntegrations = getAvailableIntegrations();
  const integration = availableIntegrations.find(i => i.id === integrationId);

  if (!integration) {
    console.log(chalk.red(`❌ Integration "${integrationId}" not found.`));
    console.log(chalk.yellow('\nAvailable integrations:'));
    availableIntegrations.forEach(i => {
      console.log(`  - ${chalk.cyan(i.id)}: ${i.description}`);
    });
    process.exit(1);
  }

  // Copy files
  const spinner = ora('Copying integration files...').start();
  
  try {
    await copyIntegrationFiles(integrationId);
    spinner.succeed('Integration files copied successfully');
  } catch (error) {
    spinner.fail('Failed to copy integration files');
    console.error(chalk.red(error));
    process.exit(1);
  }

  // Install dependencies
  const installSpinner = ora('Installing dependencies...').start();
  
  try {
    await installDependencies([integrationId]);
    installSpinner.succeed('Dependencies installed successfully');
  } catch (error) {
    installSpinner.fail('Failed to install dependencies');
    console.error(chalk.red(error));
    process.exit(1);
  }

  console.log(chalk.bold.green('\n✨ Integration added successfully!\n'));
  console.log('Check', chalk.cyan(`lib/${integrationId}/README.md`), 'for setup instructions.\n');
}

