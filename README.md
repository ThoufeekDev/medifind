# MediFind

Hospital Discovery and Appointment Management Platform

## Features

- User Registration & Authentication
- Hospital Admin Registration
- Email OTP Verification
- Role-Based Access Control
- Hospital Onboarding
- Hospital Dashboard
- Secure JWT Authentication
- Refresh Token Rotation
- Image Uploads with Cloudinary
- Rate Limiting
- Cloudflare Turnstile Protection

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Zustand
- React Hook Form
- Zod
- Axios

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Redis
- JWT Authentication

## Architecture

### Frontend

src/
├── features/
├── routes/
├── shared/
├── api/
└── layouts/

### Backend

src/
├── modules/
│ ├── auth/
│ └── hospital/
├── shared/
└── config/

## Authentication Flow

User/Admin Registration
↓
OTP Verification
↓
Login
↓
Access Token
↓
Refresh Token
↓
Protected Routes

## Current Progress

- [x] Authentication System
- [x] OTP Verification
- [x] Role-Based Access
- [x] Hospital Creation
- [x] Dashboard Foundation
- [ ] Doctor Management
- [ ] Department Management
- [ ] Appointment Booking
- [ ] Search & Filters
- [ ] Reviews & Ratings

## Future Roadmap

- Doctor Profiles
- Appointment Scheduling
- Search by Disease
- Queue Estimation
- Notification System
- Analytics Dashboard

## Author

Thoufeek Dev
