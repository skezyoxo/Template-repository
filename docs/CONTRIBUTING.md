# Contributing Guidelines

Thank you for considering contributing to Second Brain! This document outlines the process and guidelines for contributing to this project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)

## Code of Conduct

### Our Pledge
We are committed to providing a friendly, safe, and welcoming environment for all contributors.

### Our Standards
- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/second-brain-private.git
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/skezyoxo/second-brain-private.git
   ```
4. Follow the setup instructions in [SETUP.md](SETUP.md)

## Development Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Branch Naming**
   - `feature/` - for new features
   - `fix/` - for bug fixes
   - `docs/` - for documentation
   - `refactor/` - for code refactoring
   - `test/` - for adding tests

3. **Keep Updated**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

## Pull Request Process

1. **Before Submitting**
   - Update documentation if needed
   - Add tests for new features
   - Run all tests locally
   - Ensure code passes linting

2. **PR Description**
   - Clearly describe the changes
   - Reference any related issues
   - Include screenshots for UI changes
   - List breaking changes if any

3. **Review Process**
   - PRs require at least one review
   - Address review comments
   - Keep PR scope focused

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Maintain strict type checking
- Document complex types

### React/Next.js
- Use functional components
- Implement proper error boundaries
- Follow React hooks best practices

### Database
- Follow schema conventions in [DATABASE.md](DATABASE.md)
- Include database migrations
- Test migrations both up and down

### Testing
- Write unit tests for utilities
- Include integration tests for API endpoints
- Add E2E tests for critical paths

### Style Guide
- Use ESLint and Prettier configurations
- Follow existing code style
- Use meaningful variable names

## Commit Messages

### Format
```
type(scope): subject

body

footer
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

### Examples
```
feat(auth): add JWT authentication

- Implement JWT token generation
- Add authentication middleware
- Include refresh token functionality

Closes #123
```

## Additional Notes

### Documentation
- Update README.md if needed
- Document new features
- Include JSDoc comments
- Update API documentation

### Testing
- Write tests before fixing bugs
- Include positive and negative test cases
- Mock external services

### Security
- Never commit sensitive data
- Review code for security issues
- Follow security best practices

## Questions?

If you have questions, please:
1. Check existing documentation
2. Search for similar issues
3. Create a new issue with the question

Thank you for contributing! 