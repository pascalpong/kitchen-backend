import * as express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
app.use(cors())

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Import your route files here
import indexRouter from './routes/index';

// Use routes
app.use('/', indexRouter);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});