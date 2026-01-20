# Campus Fix-It

## Overview
Campus Fix-It is a React Native application with an admin and student interface designed to manage campus issues efficiently. The project includes a comprehensive CI/CD pipeline implementing DevSecOps principles with automated testing, security scanning, and Kubernetes SIT deployment using GitHub Actions.

## Features
- Admin and Student user roles
- Issue management
- Authentication system
- Complete CI/CD pipeline with GitHub Actions
- Automated security scanning (SAST, SCA, container scanning)
- AWS EC2 deployment automation
- Performance and security testing

## Project Structure
```
campus-fixit/
├── app/                    # React Native app source code
│   ├── (admin)/            # Admin interface
│   ├── (auth)/             # Authentication screens
│   └── (student)/          # Student interface
├── backend/                # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # Database and server config
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth and role middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── server.js        # Express server
│   ├── tests/              # Unit tests
│   └── Dockerfile          # Container definition
├── .github/workflows/      # CI/CD pipelines
│   ├── ci.yml              # Continuous Integration
│   └── cd.yml              # Continuous Deployment
├── scripts/                # Deployment scripts
│   ├── deploy-ec2.sh      # EC2 deployment script
│   └── setup-ec2.sh       # EC2 initial setup
├── services/               # API service modules
├── context/                # React context providers
└── components/             # Reusable React components
```

## Requirements
- Node.js (version 20 or later recommended)
- npm or yarn
- Docker (for containerization)
- MongoDB (for database)

## Setup and Installation

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd campus-fixit
   ```

2. Install dependencies:
   ```bash
   # Root dependencies
   npm install
   
   # Backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. Configure environment variables:
   
   Create `backend/.env`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=7224
   ```

### Running the Application

#### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Start the backend server:
   ```bash
   npm run dev
   ```

#### Frontend
1. From the root project directory, start the React Native app:
   ```bash
   npx expo start
   ```

#### Using Docker
```bash
cd backend
docker build -t campus-fixit-backend .
docker run -p 7224:7224 \
  -e MONGO_URI=your_mongo_uri \
  -e JWT_SECRET=your_jwt_secret \
  campus-fixit-backend
```

## CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline with the following stages:

### CI Pipeline (`.github/workflows/ci.yml`)
1. **Checkout & Setup**: Retrieve code and set up Node.js environment
2. **Linting**: ESLint code quality checks
3. **SAST**: Static Application Security Testing (CodeQL, Semgrep)
4. **SCA**: Software Composition Analysis (npm audit, Snyk)
5. **Unit Tests**: Jest test execution
6. **Build**: Application build verification
7. **Docker Build**: Container image creation
8. **Image Scan**: Container vulnerability scanning (Trivy)
9. **Runtime Test**: Container health and API validation
10. **Registry Push**: Push to Docker Hub

### CD Pipeline (`.github/workflows/cd.yml`)
1. **Artifactory**: Retrieve Docker image from registry
2. **Deploy to SIT**: System Integration Testing environment
3. **Performance Testing**: Basic curl-based performance probe
4. **Security Testing**: OWASP ZAP Baseline (passive)
5. **NLP Integration**: Optional NLP feature testing

### GitHub Secrets Configuration

Required (minimum)
- `DOCKERHUB_USERNAME`: Docker Hub username
- `DOCKERHUB_TOKEN`: Docker Hub access token

Optional (CD)
- `JWT_SECRET_SIT`: Optional JWT secret for SIT

See [CI_CD_SUBMISSION.md](./CI_CD_SUBMISSION.md) for complete details.

## Testing

### Run Tests Locally
```bash
# Backend tests
cd backend
npm test

# With coverage
npm run test:coverage
```

### Security Scans
```bash
# npm audit
cd backend
npm audit

# Trivy container scan
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image campus-fixit-backend:latest
```

## Deployment

### Automated Deployment
The CD pipeline automatically deploys after successful CI completion. You can also trigger it manually via GitHub Actions UI.

## Documentation

- [CI/CD Submission](./CI_CD_SUBMISSION.md) - Full pipeline details and diagram
- [API Documentation](./backend/README.md) - Backend API reference (if available)

## Notes
- Ensure your backend server is running before starting the frontend
- Environment variables must be configured for each environment
- Never commit secrets to the repository - always use GitHub Secrets
- Review security findings in the GitHub Security tab regularly

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request

The CI pipeline will automatically run on pull requests.

## License

[Your License Here]