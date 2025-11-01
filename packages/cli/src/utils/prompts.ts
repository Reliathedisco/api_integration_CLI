import inquirer from 'inquirer'
import { integrations, Integration } from '../config/integrations'

export async function promptForIntegrations(hasLicense: boolean): Promise<string[]> {
  const availableIntegrations = hasLicense 
    ? integrations 
    : integrations.filter(i => i.free)

  const { selected } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selected',
      message: 'Select integrations to add:',
      choices: availableIntegrations.map(i => ({
        name: `${i.name} - ${i.description}`,
        value: i.id,
        checked: false
      })),
      validate: (answer) => {
        if (answer.length === 0) {
          return 'You must select at least one integration'
        }
        return true
      }
    }
  ])

  return selected
}

export async function promptForFramework(): Promise<string> {
  const { framework } = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Which framework are you using?',
      choices: [
        { name: 'Next.js (App Router)', value: 'nextjs' },
        { name: 'Next.js (Pages Router)', value: 'nextjs-pages', disabled: '(Coming soon)' },
        { name: 'React (Vite)', value: 'react', disabled: '(Coming soon)' }
      ]
    }
  ])

  return framework
}

export async function promptForLicense(): Promise<string | null> {
  const { hasLicense } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'hasLicense',
      message: 'Do you have a Pro license?',
      default: false
    }
  ])

  if (!hasLicense) {
    return null
  }

  const { licenseKey } = await inquirer.prompt([
    {
      type: 'input',
      name: 'licenseKey',
      message: 'Enter your license key:',
      validate: (input) => {
        if (input.length < 10) {
          return 'Please enter a valid license key'
        }
        return true
      }
    }
  ])

  return licenseKey
}

