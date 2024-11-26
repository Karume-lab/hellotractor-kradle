
# Project Overview

## Tech Stack

* **Frontend** :
* **Next.js** : A framework for building React applications.
* **Tailwind CSS** : A utility-first CSS framework for fast UI development.
* **TanStack React Query** : Manages data fetching and state in React.
* **ShadCN** : A UI component library for building modern interfaces.
* **Backend** :
* **PostgreSQL** : Relational database for storing data.
* **Prisma** : ORM for easier database interactions.
* **Zod** : Schema validation for TypeScript.
* **Lucia** : Handles user authentication.
* **File Storage** :
* **Uploadthing** : Manages file uploads.
* **Deployment** :
* **Render** : Hosts the PostgreSQL database.
* **Vercel** : Hosts the frontend, optimized for Next.js apps.

## Architecture

The app uses **server-side rendering** (SSR) and API routes for backend logic. Components are organized into different services for better scalability and maintainability.

### Main Components

* **Frontend (Vercel)** :
* **Next.js** : Handles routing and page management.
* **Tailwind CSS** : Provides consistent, responsive styling.
* **TanStack React Query** : Efficiently handles data fetching and caching.
* **ShadCN UI** : Reusable UI components.
* **Backend (Render + PostgreSQL)** :
* **PostgreSQL** : Stores data like users and products.
* **Prisma ORM** : Simplifies database operations.
* **Lucia Authentication** : Manages user sessions.
* **Zod** : Validates data for consistency.
* **File Uploading (Uploadthing)** :
* Handles secure file uploads.

### Folder Structure

```
├── components.json
├── docker-compose.yml
├── docs
├── next.config.mjs
├── package.json
├── prisma
├── public
└── src
    ├── app
    ├── components
    ├── hooks
    ├── layouts
    └── styles
```

## Key Directories and Files

* **`src/app/api/`** : Contains API routes for authentication, data, and file uploads.
* **`prisma/`** : Holds database migrations and schema definitions.
* **`src/components/`** : Reusable UI components for different features like account management and file uploads.
* **`src/lib/`** : Utility functions for Google OAuth, authentication, and file uploads.

## Database

PostgreSQL with Prisma ORM is used for managing entities like users, products, and services. Migrations are handled with Prisma.

## Authentication

**Lucia Authentication** manages user sign-ups, logins, and sessions, including Google OAuth integration.

## File Upload

**Uploadthing** is used for securely handling file uploads, allowing users to upload files via a drag-and-drop interface.

## Deployment

* **Frontend (Vercel)** : Deployed on Vercel for serverless Next.js hosting.
* **Database (Render)** : PostgreSQL is hosted on Render.

### Deployment Steps

1. **Frontend (Vercel)** :

* Push your Next.js project to GitHub.
* Link it to Vercel for automatic deployment.

1. **Backend (Render)** :

* Create a PostgreSQL database on Render.
* Update your Prisma connection string with the new credentials.
* Run migrations to set up the database.

## Data Handling

**TanStack React Query** handles data fetching, caching, and syncing with the backend.

### API Routes

* **Authentication** : Manages user sign-up, login, and sessions.
* **Data** : Manages CRUD operations for entities like users and products.
* **File Upload** : Handles file uploads via Uploadthing.

## Design and Assets

* **Figma Links** : Access the design system and UI components on Figma [here](https://www.figma.com/design/bfhmmtyYLtn3MAezOyzF5i/HelloTractor--Kradle?node-id=2417-381&t=lzhXCSqaldcao5vf-1).
* **Canva Slides** : View the presentation slides for this project on Canva [here](https://www.canva.com/design/DAGXkfzepdE/fD__aRPZwmORCYoCjkz8QQ/edit?utm_content=DAGXkfzepdE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton).

---

This should provide a comprehensive overview while keeping it simple and adding the necessary links for design and presentation assets.
