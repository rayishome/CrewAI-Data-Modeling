# CrewAI-Powered Dimensional Modeling and ETL Planning Tool

Welcome to the **CrewAI-Powered Dimensional Modeling and ETL Planning Tool** repository. This lightweight, web-based application is designed to assist users in defining fictional data tables, outlining business analysis needs, and generating outputs from three AI-driven expert roles: Business Analyst, Kimball Expert, and Data Architect.

> **Disclaimer**: This code was built by an AI Agent (Replit) and may not meet standard coding or architectural practices. Use at your discretion and feel free to contribute improvements!

---

## Overview

This prototype leverages the OpenAI API and the CrewAI framework to facilitate collaboration between AI-driven expert roles. It provides structured outputs to help users:

- Identify feasible analysis opportunities.
- Propose dimensional models.
- Create ETL plans.

---

## Features

### User Interface
1. **OpenAI API Key Input**
   - Enter your OpenAI API key in a validated text box.

2. **Table Schema Input**
   - Input fictional table schemas in a structured format:
     ```
     Table Name: Orders
     Columns: OrderID, CustomerID, OrderDate, TotalAmount

     Table Name: Customers
     Columns: CustomerID, CustomerName, Email, Region
     ```

3. **Business Problems/Analysis Needs Input**
   - Define business goals and data use cases in a multi-line text box.

4. **Submit Button**
   - Trigger the CrewAI expert analysis process.

5. **Results Display Area**
   - View outputs in collapsible panels for:
     - Business Analyst Output
     - Kimball Expert Output
     - Data Architect Output

### Backend Logic
- **API Key Handling**: Validates user input for OpenAI API key.
- **Input Parsing**: Structures user inputs for AI expert roles.
- **CrewAI Expert Roles**:
  1. **Business Analyst**: Identifies analysis opportunities, data gaps, and user follow-up questions.
  2. **Kimball Expert**: Proposes dimensional models with facts, dimensions, and relationships.
  3. **Data Architect**: Generates an ETL plan and highlights data challenges.

### Output Display
- **Business Analyst**: Feasible analyses, data gaps, and suggested questions.
- **Kimball Expert**: Dimensional model with facts, dimensions, and data grain.
- **Data Architect**: ETL plan with transformation steps and pseudocode suggestions.

---

## Technology Stack

### Frontend
- Framework: ReactJS or plain HTML/CSS/JavaScript.
- Libraries: Axios (API calls), Bootstrap (optional for styling).

### Backend
- Language: Python (preferred for CrewAI integration).
- Framework: Flask or FastAPI.
- Libraries: OpenAI Python SDK, CrewAI framework.

### Hosting
- Local setup for testing.
- Optional: Cloud deployment (e.g., Heroku, AWS).

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rayishome/CrewAI-Data-Modeling
   cd crewai-etl-tool
   ```

2. **Install Dependencies**:
   Ensure you have Node.js and npm/yarn installed. Then run:
   ```bash
   npm install
   ```
   or, if using Yarn:
   ```bash
   yarn install
   ```

3. **Development Server**:
   To start the development server, run:
   ```bash
   npm run dev
   ```
   This will use the `tsx` runner to initiate the server in development mode.

4. **Build for Production**:
   To build the project for production deployment, use:
   ```bash
   npm run build
   ```
   This command bundles the frontend using Vite and compiles the backend with esbuild.

5. **Start the Production Server**:
   After building, you can start the production server with:
   ```bash
   npm run start
   ```

6. **Database Schema Push**:
   If using Drizzle ORM, push your schema changes to the database with:
   ```bash
   npm run db:push
   ```

---

### Scripts Overview

| Script         | Description                                                                                              |
|----------------|----------------------------------------------------------------------------------------------------------|
| `dev`          | Starts the development server using `tsx`.                                                               |
| `build`        | Builds the project with Vite (frontend) and esbuild (backend).                                           |
| `start`        | Starts the production server from the `dist` folder.                                                     |
| `check`        | Runs TypeScript checks to ensure the project has no type errors.                                         |
| `db:push`      | Pushes database schema changes using Drizzle Kit.                                                        |

---

## Success Criteria

The tool is considered successful if it:
- Accepts and validates user inputs (API key, table schemas, business problems).
- Produces coherent outputs from the three expert roles.
- Highlights the collaborative process among AI experts.

---

## Validation and Error Handling

- **Input Validation**: Ensures correct formatting for API key and user inputs.
- **Error Handling**: Provides user-friendly messages for API failures or invalid inputs.
- **Output Validation**: Confirms coherence and accurate display of AI-generated results.

---

## Contribution

Contributions are welcome to enhance this AI-driven tool. Please fork the repository, create a feature branch, and submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

This project leverages:
- [OpenAI API](https://platform.openai.com/docs/)
- [CrewAI Framework](https://github.com/crew-ai-framework)

Special thanks to AI Agent Replit for the initial codebase.

