require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const projetsRoutes = require('./routes/projets');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// CORS configuration: allow a list of origins from env (comma-separated)
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser or same-origin requests where origin may be undefined
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
// For legacy caches/proxies, hint that response may vary by Origin
app.use((req, res, next) => {
  res.header('Vary', 'Origin');
  next();
});
app.use(limiter);

app.use('/api/projets', projetsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => res.json({ success: true, status: 'ok' }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => {
    console.error('Impossible de connecter à MongoDB', err);
    process.exit(1);
  });