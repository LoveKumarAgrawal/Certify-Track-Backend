# 🎓 Certify Track - Certificate Management System

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

**A robust backend system for managing certificates, students, and teachers in educational institutions**

[Features](#-features) • [Architecture](#-system-architecture) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Tech Stack](#-tech-stack)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Security](#-security)
- [Development](#-development)
- [Testing](#-testing)
- [Contributing](#-contributing)

---

## 🌟 Overview

**Certify Track** is a comprehensive backend system built with NestJS that manages digital certificates, student records, and teacher information for educational institutions. The system provides secure authentication, file management, and CRUD operations for all entities.

### Key Highlights

- 🔐 **JWT-based Authentication** with HTTP-only cookies
- 📁 **Secure File Upload** system for certificates (PDF support)
- 👨‍🎓 **Student Management** with validation
- 👨‍🏫 **Teacher Management** with CRUD operations
- 📜 **Certificate Tracking** with endorsement status
- 🔄 **RESTful API** design
- ✅ **Data Validation** using class-validator
- 🗄️ **MongoDB** integration with Mongoose ODM

---

## ✨ Features

### 🔒 Authentication Module
- User login with username and password (phone number)
- JWT token generation and validation
- Secure cookie-based session management
- Token verification endpoint
- Logout functionality

### 👥 Student Management
- Create, Read, Update, Delete (CRUD) student records
- Email and phone number validation
- Date of birth format validation (DD-MM-YYYY)
- Roll number uniqueness and format validation
- Role-based access control

### 👨‍🏫 Teacher Management
- Complete CRUD operations for teacher records
- Similar validation as student module
- Teacher profile management
- Role-based teacher identification

### 📄 File Upload & Certificate Management
- Multiple file upload support (up to 100 files)
- PDF certificate storage and retrieval
- Certificate metadata tracking:
  - Certificate name and type
  - Start and end dates
  - Student association (userId)
  - Status tracking (approved/pending/rejected)
  - Endorsement status
- File download and viewing capabilities
- Secure file deletion with database cleanup

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│                    (Frontend Application)                    │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/HTTPS
                         │ CORS Enabled
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway Layer                        │
│                   (NestJS Application)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Middleware Pipeline                      │  │
│  │  • CORS Handler                                       │  │
│  │  • Cookie Parser                                      │  │
│  │  • Validation Pipe (class-validator)                 │  │
│  │  • Exception Filters                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Auth Module  │  │Student Module│  │Teacher Module│
│              │  │              │  │              │
│ • Login      │  │ • CRUD Ops   │  │ • CRUD Ops   │
│ • Logout     │  │ • Validation │  │ • Validation │
│ • Verify JWT │  │ • Search     │  │ • Search     │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       │                 ▼                 │
       │          ┌──────────────┐         │
       │          │File Upload   │         │
       │          │Module        │         │
       │          │              │         │
       │          │ • Upload     │         │
       │          │ • Download   │         │
       │          │ • Delete     │         │
       │          │ • Metadata   │         │
       │          └──────┬───────┘         │
       │                 │                 │
       └────────┬────────┴────────┬────────┘
                │                 │
                ▼                 ▼
        ┌───────────────┐  ┌─────────────┐
        │  JWT Service  │  │   MongoDB   │
        │               │  │  Database   │
        │ • Sign        │  │             │
        │ • Verify      │  │ Collections:│
        │ • Decode      │  │ • register  │
        └───────────────┘  │ • teachers  │
                           │ • myformdatas│
                           └─────────────┘
```

### Module Architecture

#### 1. **Authentication Flow**
```
User Login Request
      ├─→ Auth Controller receives credentials
      ├─→ Auth Service validates user
      ├─→ Student Service queries database
      ├─→ Password verification (phone number)
      ├─→ JWT Service generates token
      ├─→ Token stored in HTTP-only cookie
      └─→ User data returned to client
```

#### 2. **File Upload Flow**
```
File Upload Request
      ├─→ Multer Interceptor receives files
      ├─→ Files saved to ./upload directory
      ├─→ Unique filename generation (originalname-timestamp)
      ├─→ Metadata validation (DTO)
      ├─→ File info stored in MongoDB
      ├─→ Response with file metadata
      └─→ Error handling and cleanup
```

#### 3. **Data Layer Architecture**
```
Controllers (HTTP Layer)
      ↓
Services (Business Logic)
      ↓
Mongoose Models (Data Access)
      ↓
MongoDB (Persistence)
```

### Design Patterns Used

1. **Module Pattern**: Each feature is encapsulated in its own module
2. **Dependency Injection**: NestJS IoC container manages dependencies
3. **Repository Pattern**: Mongoose models abstract database operations
4. **DTO Pattern**: Data Transfer Objects for validation and type safety
5. **Interceptor Pattern**: File upload and request transformation
6. **Guard Pattern**: JWT authentication guards (can be implemented)
7. **Pipe Pattern**: Validation pipes for request data

### Security Architecture

```
Request → CORS Check → Cookie Parser → JWT Validation
    ↓
Role Verification → Permission Check → Business Logic
    ↓
Response ← Sanitized Data ← Database Query
```

---

## 🛠️ Tech Stack

### Core Framework
- **NestJS 10.x** - Progressive Node.js framework
- **TypeScript** - Static typing and modern JavaScript features
- **Node.js** - JavaScript runtime

### Database
- **MongoDB** - NoSQL database
- **Mongoose 8.x** - MongoDB ODM

### Authentication & Security
- **@nestjs/jwt** - JWT token management
- **cookie-parser** - Cookie handling
- **class-validator** - DTO validation
- **class-transformer** - Object transformation

### File Handling
- **Multer** - Multipart/form-data file uploads
- **@nestjs/platform-express** - Express platform adapter

### Development Tools
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** or **yarn** package manager
- **MongoDB** (v5.x or higher) - Local or Atlas cluster
- **Git** - Version control

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/LoveKumarAgrawal/Certify-Track-Backend.git
cd Certify-Track-Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration (see [Environment Variables](#-environment-variables))

### 4. Create Upload Directory

```bash
mkdir upload
```

### 5. Start MongoDB

Ensure MongoDB is running:

```bash
# Local MongoDB
mongod

# Or use MongoDB service
net start MongoDB  # Windows
sudo systemctl start mongod  # Linux
```

### 6. Run the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

The server will start at `http://localhost:3001`

---

## 🔐 Environment Variables

Create a `.env` file with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/College_Project` |
| `ALLOWED_ORIGIN` | Frontend URL for CORS | `http://localhost:3000` |
| `JWT_SECRET` | Secret key for JWT signing | `your-super-secret-jwt-key` |
| `JWT_EXPIRATION_TIME` | Token expiration duration | `24h` |
| `PORT` | Server port (optional) | `3001` |

### Sample `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/College_Project
ALLOWED_ORIGIN=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION_TIME=24h
PORT=3001
```

> ⚠️ **Security Note**: Never commit your `.env` file to version control. Always use `.env.example` as a template.

---

## 📚 API Documentation

### Base URL
```
http://localhost:3001
```

### Authentication Endpoints

#### 1. Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "student_name",
  "password": 1234567890
}

Response: 200 OK
{
  "username": "student_name",
  "rollno": 1234567890
}
Set-Cookie: auth-cookie=<jwt_token>; HttpOnly
```

#### 2. Logout
```http
POST /auth/logout

Response: 200 OK
{
  "message": "success"
}
```

#### 3. Verify Token
```http
GET /auth/verify-token
Cookie: auth-cookie=<jwt_token>

Response: 200 OK
{
  "userRoleId": "student"
}
```

---

### Student Endpoints

#### 1. Get All Students
```http
GET /student

Response: 200 OK
[
  {
    "_id": "...",
    "roleId": "student",
    "name": "John Doe",
    "email": "john@example.com",
    "dob": "01-01-2000",
    "phoneNumber": 9876543210,
    "rollno": 1234567890
  }
]
```

#### 2. Get Student by ID
```http
GET /student/:id

Response: 200 OK
{
  "_id": "...",
  "name": "John Doe",
  ...
}
```

#### 3. Create Student
```http
POST /student
Content-Type: application/json

{
  "roleId": "student",
  "name": "John Doe",
  "email": "john@example.com",
  "dob": "01-01-2000",
  "phoneNumber": 9876543210,
  "rollno": 1234567890
}

Response: 201 Created
```

#### 4. Update Student
```http
PUT /student/:id
Content-Type: application/json

{
  "name": "John Doe Updated",
  ...
}

Response: 200 OK
```

#### 5. Delete Student
```http
DELETE /student/:id

Response: 200 OK
```

---

### Teacher Endpoints

Similar to Student endpoints:

- `GET /teacher` - Get all teachers
- `GET /teacher/:id` - Get teacher by ID
- `POST /teacher` - Create teacher
- `PUT /teacher/:id` - Update teacher
- `DELETE /teacher/:id` - Delete teacher

---

### File Upload Endpoints

#### 1. Get All Certificates
```http
GET /fileupload/get

Response: 200 OK
[
  {
    "_id": "...",
    "id": "cert123",
    "name": "JavaScript Certificate",
    "type": "course",
    "startDate": "2024-01-01",
    "endDate": "2024-06-01",
    "file": "certificate.pdf-1234567890",
    "userId": 1234567890,
    "status": "approved",
    "endorsed": "true"
  }
]
```

#### 2. Upload Single Certificate
```http
POST /fileupload/addOne
Content-Type: multipart/form-data

FormData:
  - file: <PDF file>
  - name: "Certificate Name"
  - type: "course"
  - startDate: "2024-01-01"
  - endDate: "2024-06-01"
  - id: "cert123"
  - userId: 1234567890
  - status: "pending"
  - endorsed: "false"

Response: 201 Created
```

#### 3. Upload Multiple Certificates
```http
POST /fileupload/add
Content-Type: multipart/form-data

FormData:
  - files: [<PDF files array>]
  - names: ["Cert1", "Cert2"]
  - types: ["course", "achievement"]
  - startDates: ["2024-01-01", "2024-02-01"]
  - endDates: ["2024-06-01", "2024-07-01"]
  - ids: ["cert1", "cert2"]
  - userId: [1234567890, 1234567890]
  - status: ["pending", "pending"]
  - endorsed: ["false", "false"]

Response: 201 Created
```

#### 4. Download/View Certificate
```http
GET /fileupload/openPdf/:filename

Response: 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename=<filename>.pdf
```

#### 5. Update Certificate
```http
PUT /fileupload/:id
Content-Type: application/json

{
  "status": "approved",
  "endorsed": "true"
}

Response: 200 OK
```

#### 6. Delete Certificate
```http
DELETE /fileupload/:id?filename=<filename>

Response: 200 OK
```

---

## 📁 Project Structure

```
Backend/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   ├── app.controller.ts          # Root controller
│   ├── app.service.ts             # Root service
│   │
│   ├── auth/                      # Authentication module
│   │   ├── auth.controller.ts     # Auth endpoints
│   │   ├── auth.service.ts        # Auth business logic
│   │   ├── auth.module.ts         # Auth module definition
│   │   └── *.spec.ts              # Unit tests
│   │
│   ├── student/                   # Student management module
│   │   ├── student.controller.ts  # Student endpoints
│   │   ├── student.service.ts     # Student business logic
│   │   ├── student.module.ts      # Student module
│   │   ├── student.dto.ts         # Data validation
│   │   ├── interface/
│   │   │   └── student.interface.ts
│   │   └── schemas/
│   │       └── student.schema.ts  # MongoDB schema
│   │
│   ├── teacher/                   # Teacher management module
│   │   ├── teacher.controller.ts
│   │   ├── teacher.service.ts
│   │   ├── teacher.module.ts
│   │   ├── teacher.dto.ts
│   │   ├── interface/
│   │   │   └── teacher.interface.ts
│   │   └── schemas/
│   │       └── teacher.schema.ts
│   │
│   └── fileupload/                # File upload module
│       ├── fileupload.controller.ts
│       ├── fileupload.service.ts
│       ├── fileupload.module.ts
│       ├── fileupload.dto.ts
│       ├── interface/
│       │   └── file.interface.ts
│       └── schemas/
│           └── file.schemas.ts
│
├── upload/                        # Uploaded files directory
├── test/                          # E2E tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env                           # Environment variables (gitignored)
├── .env.example                   # Environment template
├── nest-cli.json                  # NestJS CLI configuration
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.build.json            # Build configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

---

## 🗄️ Database Schema

### Collections

#### 1. `register` (Students)
```javascript
{
  _id: ObjectId,
  roleId: String,              // e.g., "student"
  name: String,                // 2-30 characters
  email: String,               // Valid email format
  dob: String,                 // Format: DD-MM-YYYY
  phoneNumber: Number,         // 10 digits, starts with 6-9
  rollno: Number               // 10 digits, unique
}
```

#### 2. `teachers` (Teachers)
```javascript
{
  _id: ObjectId,
  roleId: String,              // e.g., "teacher"
  name: String,
  email: String,
  dob: String,
  phoneNumber: Number,
  rollno: Number               // Teacher ID
}
```

#### 3. `myformdatas` (Certificates)
```javascript
{
  _id: ObjectId,
  id: String,                  // Certificate ID
  name: String,                // Certificate name
  type: String,                // course, achievement, etc.
  startDate: Date,             // Certificate start date
  endDate: Date,               // Certificate end date
  file: String,                // Filename on server
  userId: Number,              // Associated student rollno
  status: String,              // pending, approved, rejected
  endorsed: String             // true, false
}
```

### Relationships

```
Students (1) ←→ (N) Certificates
  └─ rollno ←→ userId

Teachers (1) ←→ (N) Students (via roleId and endorsement)
```

---

## 🔒 Security

### Implemented Security Measures

1. **JWT Authentication**
   - Tokens stored in HTTP-only cookies
   - Prevents XSS attacks
   - Token expiration management

2. **CORS Protection**
   - Configured allowed origins
   - Credentials support enabled
   - Prevents unauthorized cross-origin requests

3. **Input Validation**
   - class-validator for DTO validation
   - Email format validation
   - Phone number range validation
   - Date format validation
   - SQL injection prevention via Mongoose

4. **Password Security**
   - Phone number used as password (consider hashing in production)
   - Unauthorized exception on invalid credentials

5. **File Upload Security**
   - File size limits
   - Type restrictions (PDF)
   - Unique filename generation
   - Server-side storage

### Recommended Improvements

- [ ] Implement bcrypt for password hashing
- [ ] Add rate limiting (e.g., express-rate-limit)
- [ ] Implement RBAC (Role-Based Access Control) guards
- [ ] Add helmet.js for HTTP headers security
- [ ] Implement request logging and monitoring
- [ ] Add API versioning
- [ ] Implement refresh token mechanism
- [ ] Add CSRF protection
- [ ] Implement file type validation on server side
- [ ] Add virus scanning for uploaded files

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run start:dev        # Start with hot-reload
npm run start:debug      # Start in debug mode

# Production
npm run build            # Build the application
npm run start:prod       # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:cov         # Generate coverage report
npm run test:e2e         # Run end-to-end tests
```

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** strict mode

Run linting before committing:
```bash
npm run lint
npm run format
```

### Adding a New Module

```bash
# Generate a new module
nest g module <module-name>

# Generate a controller
nest g controller <module-name>

# Generate a service
nest g service <module-name>

# Generate a complete resource (CRUD)
nest g resource <module-name>
```

---

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov
```

### E2E Tests

```bash
# Run end-to-end tests
npm run test:e2e
```

### Test Structure

```
src/
  └── module/
      ├── module.controller.ts
      ├── module.controller.spec.ts    # Controller tests
      ├── module.service.ts
      └── module.service.spec.ts        # Service tests

test/
  └── app.e2e-spec.ts                   # E2E tests
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📝 License

This project is licensed under the UNLICENSED License - it is private and proprietary.

---

## 👨‍💻 Author

**Love Kumar Agrawal**

- GitHub: [@LoveKumarAgrawal](https://github.com/LoveKumarAgrawal)
- Repository: [Certify-Track-Backend](https://github.com/LoveKumarAgrawal/Certify-Track-Backend)

---

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Amazing framework
- [MongoDB](https://www.mongodb.com/) - Database platform
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [JWT](https://jwt.io/) - Token-based authentication

---

## 📞 Support

For support, please raise an issue in the GitHub repository or contact the development team.

---

## 🗺️ Roadmap

### Upcoming Features

- [ ] Role-based access control (RBAC)
- [ ] Email notifications for certificate approval
- [ ] Advanced search and filtering
- [ ] Certificate templates
- [ ] Bulk operations
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] API documentation with Swagger
- [ ] Docker containerization
- [ ] CI/CD pipeline

---

<div align="center">

**Made with ❤️ for Educational Institutions**

⭐ Star this repository if you find it helpful!

</div>
