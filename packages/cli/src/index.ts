#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { listCommand } from './commands/list';

const program = new Command();

program
  .name('api-integrations')
  .description('Generate production-ready API integrations')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a new project with API integrations')
  .option('--with <integrations>', 'Comma-separated list of integrations (e.g., stripe,clerk,resend)')
  .action(initCommand);

program
  .command('add <integration>')
  .description('Add a single integration to your project')
  .action(addCommand);

program
  .command('list')
  .description('List all available integrations')
  .action(listCommand);

program.parse();

