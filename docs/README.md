
# Project Documentation

## Tech Stack

* **Frontend** :
* **Next.js (App Router)** : A powerful React framework for building optimized and scalable web applications.
* **Tailwind CSS** : A utility-first CSS framework for rapid UI development.
* **TanStack React Query** : A powerful data-fetching and state management library for React.
* **ShadCN** : A UI component library for building user interfaces with a modern design approach.
* **Backend** :
* **PostgreSQL** : A powerful relational database to store and manage application data.
* **Prisma** : An ORM for Node.js and TypeScript that simplifies database interaction.
* **Zod** : A TypeScript-first schema declaration and validation library for data integrity.
* **Lucia** : A server-side authentication library to manage user sessions.
* **File Storage** :
* **Uploadthing** : A service for handling file uploads in your app.
* **Deployment** :
* **Render** : Hosting service for PostgreSQL database.
* **Vercel** : Hosting platform for frontend deployment, optimized for Next.js applications.

## Architecture Overview

The application follows a modern full-stack architecture, utilizing server-side rendering (SSR) and API routes to handle backend logic. The components are decoupled into various services to manage scalability and maintainability.

### Key Components

1. **Frontend (Vercel)** :

* **Next.js App Router** : Handles routing and page management, keeping everything clean and organized.
* **Tailwind CSS** : Provides utility-first styling, ensuring a consistent and responsive UI.
* **TanStack React Query** : Efficiently handles data fetching, caching, and synchronization with the backend.
* **ShadCN UI** : Implements reusable, styled UI components for a seamless user experience.

1. **Backend (Render + PostgreSQL)** :

* **PostgreSQL** : Hosts the application's database and stores all relevant data.
* **Prisma ORM** : Abstracts the database operations and allows for easier interaction with PostgreSQL.
* **Lucia Authentication** : Manages user authentication and session handling.
* **Zod** : Validates incoming data and ensures schema consistency across the application.

1. **File Uploading (Uploadthing)** :

* Uploadthing handles secure file uploads and integrates with the app for storing files, providing an efficient and scalable solution.

### Folder Structure

├── components.json
├── docker-compose.yml
├── docs
│   ├── README.md
│   └── REPORT.md
├── next.config.mjs
├── next-env.d.ts
├── node_modules
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── prisma
│   ├── migrations
│   ├── schema.prisma
├── public
│   └── img
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   ├── data
│   │   │   └── uploadthing
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   └── (pages)
│   ├── components
│   ├── config
│   ├── hooks
│   ├── layouts
│   ├── lib
│   └── styles
└── README.md

### Breakdown of Important Files and Directories

1. **`src/app/api/`** : Contains API routes for handling authentication, file uploads, and various data interactions.

* **`auth/`** : Authentication-related routes, including Google OAuth callbacks and session management.
* **`data/`** : API routes for managing application data such as inbox messages, tractors, and wishlist items.
* **`uploadthing/`** : Routes related to file uploads using Uploadthing.

1. **`prisma/`** : Houses database migration files and schema configurations.

* **`migrations/`** : Contains database schema changes and migrations.
* **`schema.prisma`** : Defines the Prisma schema for the database models.

1. **`src/components/`** : Stores UI components used throughout the application. Components are modular and include features like:

* **Account Management** : Forms and buttons for managing account types and profile details.
* **Admin Dashboard** : Components for managing attachments, dealers, tractors, and operators.
* **File Upload** : `FileUploadDropZone.tsx` component to manage file uploads.

1. **`src/layouts/`** : Contains layout components to structure pages such as `SharedLayout.tsx`, providing a common layout for authenticated pages.
2. **`src/hooks/`** : Custom React hooks like `use-mobile.tsx` for handling responsive layouts and other features.
3. **`src/lib/`** : Utility functions and services including:

* **Google OAuth** : Handles OAuth logic for Google sign-in.
* **Lucia Auth** : Helper functions for managing authentication.
* **Prisma Connection** : Manages the Prisma database client.
* **Uploadthing Integration** : Integration for file uploads using Uploadthing.

## Database

The application uses PostgreSQL with Prisma ORM for database management. It employs a relational database structure to manage entities like users, products (tractors), and services. The Prisma schema includes various models with defined relationships and validation rules. Database migrations are managed with Prisma’s built-in migration system.

## Authentication

**Lucia Authentication** is used for session management and authentication. Users can sign up, log in, and manage their accounts using secure authentication methods, including Google OAuth integration.

## File Upload

**Uploadthing** is integrated for file storage. The `FileUploadDropZone` component allows users to upload files in a drag-and-drop interface. The uploaded files are then securely stored and can be associated with specific entities like products or user profiles.

## Deployment

* **Frontend (Vercel)** : The frontend of the application is deployed on Vercel for optimal performance and serverless execution of the Next.js app.
* **Database (Render)** : PostgreSQL is hosted on Render, providing a managed database solution that integrates seamlessly with the backend.

### Deployment Steps

1. **Vercel Deployment** :

* Push your Next.js project to GitHub.
* Connect the GitHub repository to Vercel.
* Vercel automatically detects the Next.js framework and deploys the app.

1. **Render Deployment** :

* Create a new PostgreSQL database on Render.
* Update the Prisma connection string in `prisma/schema.prisma` to use the Render PostgreSQL database credentials.
* Run migrations to set up the database schema.

## API and Data Handling

The application uses **TanStack React Query** for efficient data fetching and caching on the frontend. Each API route is responsible for handling CRUD operations for various entities (e.g., users, tractors, services). Data is fetched using React Query’s hooks, which abstract the complexities of server-side fetching, caching, and synchronization.

### API Routes

* **Authentication** : Handles sign-up, login, and session management.
* **Data** : Manages CRUD operations for tractors, attachments, and user data.
* **File Upload** : Handles file storage via Uploadthing.

## Conclusion

This project leverages modern technologies and architecture for building a scalable and efficient full-stack application. With a modular structure, secure authentication, and optimized frontend, it offers a robust solution for the marketplace platform. The integration of third-party services like Uploadthing for file storage ensures a seamless user experience.
