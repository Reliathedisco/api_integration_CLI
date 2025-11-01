import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { getAvailableIntegrations } from '../utils/integrations';
import { copyIntegrationFiles } from '../utils/file-manager';
import { installDependencies } from '../utils/package-manager';

interface InitOptions {
  with?: string;
}

export async function initCommand(options: InitOptions) {
  console.log(chalk.bold.cyan('\n🚀 API Integrations Setup\n'));

  let selectedIntegrations: string[] = [];

  // If --with flag is provided, use those integrations
  if (options.with) {
    selectedIntegrations = options.with.split(',').map(i => i.trim());
  } else {
    // Otherwise, prompt the user
    const availableIntegrations = getAvailableIntegrations();
    
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'integrations',
        message: 'Select the integrations you want to add:',
        choices: availableIntegrations.map(integration => ({
          name: `${integration.name} - ${integration.description}`,
          value: integration.id,
          checked: integration.id === 'stripe', // Check Stripe by default
        })),
      },
    ]);

    selectedIntegrations = answers.integrations;
  }

  if (selectedIntegrations.length === 0) {
    console.log(chalk.yellow('⚠️  No integrations selected. Exiting...'));
    return;
  }

  console.log(chalk.green('\n✓ Selected integrations:'), selectedIntegrations.join(', '));

  // Copy files for each integration
  const spinner = ora('Copying integration files...').start();
  
  try {
    for (const integrationId of selectedIntegrations) {
      await copyIntegrationFiles(integrationId);
    }
    spinner.succeed('Integration files copied successfully');
  } catch (error) {
    spinner.fail('Failed to copy integration files');
    console.error(chalk.red(error));
    process.exit(1);
  }

  // Install dependencies
  const installSpinner = ora('Installing dependencies...').start();
  
  try {
    await installDependencies(selectedIntegrations);
    installSpinner.succeed('Dependencies installed successfully');
  } catch (error) {
    installSpinner.fail('Failed to install dependencies');
    console.error(chalk.red(error));
    process.exit(1);
  }

  // Display next steps
  console.log(chalk.bold.green('\n✨ Setup complete!\n'));
  console.log(chalk.bold('Next steps:\n'));
  console.log('1. Copy', chalk.cyan('.env.example'), 'to', chalk.cyan('.env.local'));
  console.log('2. Add your API keys to', chalk.cyan('.env.local'));
  console.log('3. Check the README files in', chalk.cyan('lib/'), 'for setup instructions');
  console.log('\nHappy coding! 🎉\n');
}

