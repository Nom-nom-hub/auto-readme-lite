# Contributing to auto-readme-lite

Thank you for your interest in contributing to auto-readme-lite! This document provides guidelines and information for contributors.

## Development Setup

1. **Fork and clone** the repository
2. **Install dependencies**: `npm install`
3. **Run tests**: `npm run test:comprehensive`

## Testing

We have a comprehensive test suite to ensure the tool works correctly:

### Quick Tests
```bash
npm run test:quick
```
Runs basic functionality tests on the test project.

### Comprehensive Tests
```bash
npm run test:comprehensive
```
Runs all tests including edge cases, export detection, CLI commands, and README generation.

### Test with Save
```bash
npm run test:comprehensive:save
```
Runs comprehensive tests and saves the updated README for inspection.

## Adding New Features

1. **Create a feature branch** from `main`
2. **Add tests** for your feature in the `test/` directory
3. **Update documentation** in README.md
4. **Run tests** to ensure everything works
5. **Submit a pull request**

## Test Project Structure

The `test/` directory contains a comprehensive test project with:
- Various export patterns (CommonJS, ES modules, TypeScript)
- CLI commands (Commander.js, Yargs)
- Edge cases (anonymous functions, async, generators)
- Different script types
- Files with syntax errors (for error handling)

## Code Style

- Use **2 spaces** for indentation
- Follow **JavaScript Standard Style** conventions
- Add **JSDoc comments** for new functions
- Use **descriptive variable names**

## Submitting Changes

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Commit** with clear messages
6. **Push** to your fork
7. **Submit** a pull request

## Commit Message Format

Use conventional commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test additions
- `refactor:` for code refactoring

## Reporting Issues

When reporting bugs, please include:
- **Environment details** (OS, Node.js version)
- **Project structure** and code examples
- **Expected vs actual behavior**
- **Steps to reproduce**

## Feature Requests

When suggesting features, please include:
- **Use case** and problem description
- **Expected behavior**
- **Examples** of how it would work
- **Alternative solutions** considered

## Questions?

Feel free to open an issue for questions or discussions about the project! 