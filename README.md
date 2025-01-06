# Backend

This is the backend for the **To-Do List Application**.

## Features
- **Authentication**: Secure login and session management via Auth0.
- **Task Management**: API endpoints for adding, updating, and deleting tasks.
- **Validation**: Zod for input validation.
- **Swagger Documentation**: Auto-generated API documentation.

## Tech Stack
- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **MongoDB**: Database (via Mongoose).
- **Zod**: Schema validation.
- **Swagger**: API documentation.

## Prerequisites
- **Node.js**: [Download here](https://nodejs.org/)
- **MongoDB Atlas**: Set up a cluster. [Follow these instructions](https://www.mongodb.com/docs/atlas/getting-started/).
- **Auth0 Account**: Create an account. [Sign up here](https://auth0.com/).

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/todo-back.git
   cd todo-back
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following values:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   AUTH0_DOMAIN=your_auth0_domain
   AUTH0_AUDIENCE=your_auth0_audience
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment on Render
1. Go to [Render](https://render.com/) and log in.
2. Create a new **Web Service**.
3. Connect the `todo-back` GitHub repository.
4. Configure the service:
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start`
   - **Environment Variables**:
     - Add the variables from your `.env` file.
5. Deploy the service.
6. Once deployed, your backend will be accessible at the provided URL (e.g., `https://todo-back.onrender.com`).

## API Documentation
Access the Swagger documentation at:
```
<backend_url>/api-docs
```

## Testing
Run backend tests:
```bash
npm test
```

## License
This project is licensed under the MIT License.
