1. Tools & Technologies
Application
•	Framework: React Native (Expo)
Reasoning:
o	Single codebase for iOS + Android.
o	Mature ecosystem for forms, charts, offline storage, and push notifications.
o	Easy OTA updates via Expo EAS.
•	Navigation: React Navigation
•	State Management: Redux Toolkit.
•	Networking: React Query.
•	UI Components: NativeWind (Tailwind for RN).
Backend
•	Language: TypeScript
•	Framework: NestJS
o	Strong module boundaries for a multi-role system.
•	ORM: Prisma
Database & Storage
•	Database: PostgreSQL.
•	Object Storage: S3-equivalent.
Authentication
•	Auth Provider: Auth0 
o	Supports secure mobile login, token refresh, and MFA.
Payments
•	Billing: Stripe Billing + React Native Stripe SDK
o	Simple integration, tax & invoice support.
AI & Analytics
•	LLM Provider: OpenAI 
•	Internal ML: Python (scikit-learn) for small structured models.
Infrastructure
•	API Hosting: Render, Railway, or AWS Elastic Beanstalk
•	CI/CD
o	GitHub Actions for backend
o	Expo EAS for mobile builds & OTA updates
•	Monitoring
o	Sentry (mobile + backend)
o	External uptime monitor (e.g., UptimeRobot/Pingdom)

2. Project Structure 
Mobile App (React Native)
/mobile
  /app
    /auth
    /athlete
    /coach
    /trainer
    /common
    /settings
  /components
  /hooks
  /context
  /services (API clients)
  /assets (icons, images)
  /utils

Backend (NestJS)
/backend
  /src
    /modules
      /auth
      /users
      /clubs
      /teams
      /athletes
      /surveys
      /analytics
      /ai
      /billing
      /rbac
      /notifications
    /common
  prisma/schema.prisma

3. Feature Prioritization 
Phase 1 (Months 0–2) 
Priority Features
•	User flow:
o	Secure login 
o	Daily/weekly surveys
o	Offline-first survey mode
•	Push notifications (survey reminders)
•	Coach & mental trainer dashboard
•	Backend multi-user and RBAC
•	Secure database model.
Reasoning:
•	Athletes are the primary data input providers.
•	Survey experience must be frictionless and reliable.

Phase 2 (Months 3–4) — Club Readiness
Priority Features
•	More advanced dashboards for psychologists.
•	Consent settings.
•	Team summaries
•	Risk pattern alerts
•	Push notification upgrades (role-based notifications)
•	Operational monitoring
Reasoning:
•	Supports real-world club trials.
•	Real-time insights for trainers

Phase 3 (Months 5–8) — AI Integration and Billing
Priority Features
•	In-app AI summaries (trainer-only).
•	Payment system.
•	Human validation workflow
•	Feedback loop for AI improvement
Reasoning:
•	First revenue system.
•	Supervised and ensured safe AI.

Phase 4 (Months 9–12) — Scale and Future B2C Prep
Priority Features
•	Club self-service configurations
•	Offline-aware dashboards & note-taking
•	Stronger analytics pipeline
•	Athlete self-reflection dashboards
•	Data lifecycle & GDPR tooling
•	Architecture alignment with B2C future: "one-person club" tenant pattern.
Reasoning:
•	Creating a more interactive version.
•	Mark reusable tools.

