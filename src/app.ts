import * as express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
app.use(cors())

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
// Routes
// Import your route files here
import indexRouter from './routes/index';

// Use routes
app.use('/', indexRouter);

// Set static folder
app.use('/public', express.static(path.join(__dirname, '../public')));

// Set views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});