import chalk from 'chalk';
import { getAvailableIntegrations } from '../utils/integrations';

export function listCommand() {
  console.log(chalk.bold.cyan('\n📦 Available Integrations\n'));

  const integrations = getAvailableIntegrations();

  integrations.forEach(integration => {
    console.log(chalk.bold(integration.name));
    console.log(chalk.gray(`  ID: ${integration.id}`));
    console.log(`  ${integration.description}`);
    console.log(chalk.dim(`  Includes: ${integration.files.join(', ')}`));
    console.log();
  });

  console.log(chalk.yellow('Usage:'));
  console.log(`  npx @api-integrations/cli init --with ${integrations.map(i => i.id).join(',')}`);
  console.log(`  npx @api-integrations/cli add <integration-id>\n`);
}

