import chalk from 'chalk'

export const logger = {
  info: (message: string) => {
    console.log(chalk.blue('ℹ'), message)
  },
  success: (message: string) => {
    console.log(chalk.green('✔'), message)
  },
  error: (message: string) => {
    console.log(chalk.red('✖'), message)
  },
  warn: (message: string) => {
    console.log(chalk.yellow('⚠'), message)
  },
  step: (step: number, total: number, message: string) => {
    console.log(chalk.cyan(`[${step}/${total}]`), message)
  }
}

