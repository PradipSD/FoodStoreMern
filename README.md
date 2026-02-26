# Food Recipe MERN

A full-stack MERN application to create, manage, search, and analyze food recipes.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, DaisyUI, Axios, React Router, React Hot Toast
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

## Features

- Create, edit, delete, and view recipes
- Search recipes by title, cuisine, ingredients, and instructions
- Filter by cuisine, difficulty, vegetarian/non-vegetarian, and max cook time
- Sort by newest, oldest, title (A-Z/Z-A), and cook time (low-high/high-low)
- Favorite recipes toggle (stored in browser localStorage)
- Dashboard with recipe statistics and distribution views
- Responsive UI for desktop/tablet/mobile

## Project Structure

```text
food-recipe-mern/
  backend/
    config/
    controllers/
    models/
    routes/
    server.js
  frontend/
    src/
      components/
      pages/
      services/
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB (local or cloud connection string)

## Environment Variables

### Backend (`backend/.env`)

Create `backend/.env` using `backend/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/food-recipe-mern
```

### Frontend (`frontend/.env`) optional

If backend runs on a different host/port, create:

```env
VITE_API_URL=http://localhost:5000/api
```

If omitted, frontend defaults to `http://localhost:5000/api`.

## Setup and Run

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Start backend

```bash
cd backend
npm run dev
```

Backend runs on `http://localhost:5000`.

### 3. Start frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on Vite dev server (usually `http://localhost:5173`).

## Available Scripts

### Backend

- `npm run dev` - start with nodemon
- `npm start` - start with node

### Frontend

- `npm run dev` - start dev server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## API Endpoints

Base URL: `/api/recipes`

- `GET /api/recipes` - list recipes with optional query params
- `GET /api/recipes/:id` - get single recipe
- `POST /api/recipes` - create recipe
- `PUT /api/recipes/:id` - update recipe
- `DELETE /api/recipes/:id` - delete recipe

### Query Parameters for `GET /api/recipes`

- `search` - text search across title/cuisine/ingredients/instructions
- `cuisine` - exact cuisine filter
- `difficulty` - `Easy` | `Medium` | `Hard`
- `vegetarian` - `true` | `false`
- `maxTime` - number (minutes)
- `sortBy` - `newest` | `oldest` | `title_asc` | `title_desc` | `time_asc` | `time_desc`

Example:

```http
GET /api/recipes?search=pasta&difficulty=Easy&vegetarian=true&sortBy=time_asc&maxTime=30
```

## Recipe Data Model

Each recipe includes:

- `title` (string, required)
- `ingredients` (string array, required)
- `instructions` (string, required)
- `time` (number, required)
- `difficulty` (`Easy` | `Medium` | `Hard`, required)
- `cuisine` (string, required)
- `servings` (number, required)
- `vegetarian` (boolean)
- `coverImage` (string URL)
- `createdAt`, `updatedAt` (timestamps)

## How Each Feature Works

### Home Page

- Loads recipes from backend using current search/filter/sort values
- Debounced fetch to reduce request spam while typing
- "Show Favorites" filters current results to IDs saved in localStorage
- "Reset All" clears search, filters, sort, max-time, and favorites-only view

### Recipe Card

- Shows image, tags, ingredients preview, and actions
- Favorite button toggles local favorite state
- Edit opens recipe edit page
- Delete removes recipe from backend and current UI list

### Create Recipe

- Form collects all required fields
- Ingredients are entered line-by-line and converted to array before submit
- Sends `POST /api/recipes`

### Edit Recipe

- Fetches recipe by ID
- Prefills form with existing values
- Sends `PUT /api/recipes/:id`

### Dashboard

- Loads all recipes
- Displays total counts and key metrics
- Shows top cuisines and difficulty split
- Includes tabular view of recipes

## Error Handling

- Backend returns `404` for unknown routes
- Backend returns standard JSON error message for server/validation issues
- Frontend uses toast messages for API success/failure feedback

## Quick Troubleshooting

- Mongo connection error:
  - Confirm MongoDB is running and `MONGO_URI` is correct
- CORS/API not reachable:
  - Verify backend is running and `VITE_API_URL` matches backend URL
- Empty recipe list:
  - Check browser network tab for failed `/api/recipes` calls

## License

ISC
