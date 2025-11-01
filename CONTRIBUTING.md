# Contributing to API Integration Boilerplate Tool

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/api-integration-boilerplate-tool.git`
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites
- Node.js 18 or higher
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Fill in your API keys

# Run development server
pnpm dev
```

## Project Structure

```
├── app/                    # Next.js app (marketing site)
├── packages/cli/          # CLI tool
├── components/            # React components
├── lib/                   # Utilities and helpers
└── public/               # Static assets
```

## Adding a New Integration

To add a new integration template:

1. Create a new directory in `packages/cli/templates/[integration-name]/`
2. Add template files with production-ready code
3. Create a README.md with setup instructions
4. Update `packages/cli/src/utils/integrations.ts`:

```typescript
{
  id: 'your-integration',
  name: 'Your Integration',
  description: 'Description of what it does',
  dependencies: ['package-name'],
  files: ['list', 'of', 'included', 'files'],
}
```

5. Test the CLI command:

```bash
npx @api-integrations/cli add your-integration
```

## Code Style

We use:
- **TypeScript** with strict mode
- **Prettier** for code formatting
- **ESLint** for linting

Run before committing:

```bash
# Format code
pnpm format

# Lint
pnpm lint
```

## Integration Template Guidelines

Each integration template should include:

1. **Production-ready code** with proper error handling
2. **TypeScript types** for all functions and data
3. **Comments** explaining important parts
4. **README.md** with:
   - Quick start guide
   - Environment variables
   - Usage examples
   - Troubleshooting
5. **.env.example** with required variables

### Example Template Structure

```
templates/your-integration/
├── lib/
│   └── your-integration/
│       ├── client.ts          # Client setup
│       ├── config.ts          # Configuration
│       └── helpers.ts         # Helper functions
├── app/
│   └── api/
│       └── your-integration/
│           └── route.ts       # API routes
├── .env.example              # Environment variables
└── README.md                 # Documentation
```

## Testing

Before submitting:

1. Test the CLI locally
2. Verify all files are created correctly
3. Ensure environment variables are documented
4. Test the integration works in a real project

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add OpenAI integration template
fix: correct Stripe webhook signature verification
docs: update Clerk setup instructions
refactor: improve file copying logic
```

## Pull Request Process

1. Update documentation for any new features
2. Test your changes thoroughly
3. Update the README if needed
4. Create a pull request with a clear description
5. Link any related issues

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow

## Questions?

- Open an issue for bugs or feature requests
- Join our Discord for discussions
- Email us at support@yoursite.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉

