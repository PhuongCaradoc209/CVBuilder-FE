# CV Builder Frontend

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, professional CV Builder application designed to help users create stunning resumes with ease. Built with React, TypeScript, and Vite, featuring multiple templates and multi-language support.

## 🚀 Key Features

- **Dynamic CV Editor**: Real-time preview of your changes.
- **Multiple Professional Templates**: Choose from various styles (ATS-standard, Modern Sidebar, Editorial Creative, etc.).
- **Multi-language Support**: Fully localized in 4 languages: **English (EN)**, **Vietnamese (VI)**, **Japanese (JA)**, and **Korean (KO)**.
- **PDF Export**: High-quality PDF generation using `jspdf` and `html-to-image`.
- **Smart Validation**: Real-time form validation with localized error messages.
- **Responsive Design**: Works perfectly on desktop and mobile devices.
- **Modern UI**: Built with Radix UI and Phosphor Icons for a premium feel.

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [TanStack React Query v5](https://tanstack.com/query/latest)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/), [Lucide React](https://lucide.dev/)
- **Components**: [Radix UI](https://www.radix-ui.com/), [Shadcn UI](https://ui.shadcn.com/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Yarn](https://yarnpkg.com/) (Package manager used in this project)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd seProject-FE
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add the following:
   ```env
   VITE_API_URL='https://cvbuilder-be-p5yh.onrender.com/api'
   ```

### Running Locally

To start the development server:
```bash
yarn dev
```
The application will be available at `http://localhost:5173`.

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `yarn dev` | Starts the development server with HMR. |
| `yarn build` | Compiles the application for production. |
| `yarn lint` | Runs ESLint to find and fix code quality issues. |
| `yarn prettier:fix` | Automatically formats code according to project standards. |
| `yarn preview` | Previews the production build locally. |

## 📂 Project Structure

```text
src/
├── assets/         # Static assets (images, logos)
├── components/     # Reusable UI components
│   ├── common/     # Generic components (Buttons, Inputs, etc.)
│   ├── ui/         # Shadcn/Radix UI primitive components
│   └── templates/  # CV Template definitions
├── config/         # App configuration
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts (Sidebar, Header)
├── pages/          # Application pages (Home, Create CV, Dashboard)
├── services/       # API services and Axios instances
├── styles/         # Global styles and Tailwind config
└── utils/          # Helper functions and constants
```

## 🌍 Localization

The project supports 4 languages. Localization data and logic are managed in:
- `src/pages/create-cv/components/shared/validation-messages.ts`
- Language sections in template components.

To add or modify translations, ensure you update all four languages (`en`, `vi`, `ja`, `ko`) to maintain consistency.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
