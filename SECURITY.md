# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within auto-readme-lite, please send an email to [your-email@example.com]. All security vulnerabilities will be promptly addressed.

Please include the following information in your report:

- **Type of issue** (buffer overflow, SQL injection, cross-site scripting, etc.)
- **Full paths of source file(s) related to the vulnerability**
- **The location of the affected source code (tag/branch/commit or direct URL)**
- **Any special configuration required to reproduce the issue**
- **Step-by-step instructions to reproduce the issue**
- **Proof-of-concept or exploit code (if possible)**
- **Impact of the issue, including how an attacker might exploit it**

## What to expect

- You'll receive acknowledgment of your report within 48 hours
- We'll provide a more detailed response within 72 hours
- We'll keep you informed of our progress toward a fix
- We'll credit you in the security advisory if you wish

## Security Considerations

auto-readme-lite is designed to be safe and secure:

- **No external API calls** - All processing is done locally
- **No file system writes** - Only reads and analyzes code
- **No network access** - Completely offline operation
- **No code execution** - Only static analysis is performed

## Best Practices

When using auto-readme-lite:

1. **Review generated content** before committing
2. **Test on a copy** of your project first
3. **Use dry-run mode** to preview changes
4. **Backup your README** before running the tool

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release new versions with security fixes
5. Publicly announce the vulnerability 