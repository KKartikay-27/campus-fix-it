# GitHub Actions Workflows

This directory contains the CI/CD pipeline workflows for the Campus FixIt project.

## Workflows

### `ci.yml` - Continuous Integration Pipeline

Runs on every push to `master`/`main` and on pull requests. Includes:
- Code quality checks (linting)
- Security scanning (SAST, SCA)
- Unit testing
- Docker image building
- Container vulnerability scanning
- Runtime validation

### `cd.yml` - Continuous Deployment Pipeline

Runs after successful CI completion. Includes:
- Artifact retrieval
- Deployment to SIT environment
- Performance testing
- Security testing
- Optional NLP integration testing

## Triggering Workflows

### Automatic Triggers
- **CI**: Automatically runs on push to `master`/`main` or on pull requests
- **CD**: Automatically runs after successful CI completion

### Manual Triggers
1. Go to the **Actions** tab in GitHub
2. Select the workflow you want to run
3. Click **Run workflow**
4. For CD, select the target environment

## Viewing Results

- Pipeline runs: **Actions** tab
- Security findings: **Security** tab → **Code scanning alerts**
- Test coverage: Check artifacts in workflow runs
- Performance results: Check artifacts in CD workflow runs


