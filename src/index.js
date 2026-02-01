require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT, NODE_ENV } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models'); // Sequelize models

const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://novaspace-seven.vercel.app",
    process.env.FRONTEND_URL,
    process.env.RAILWAY_STATIC_URL ? `https://${process.env.RAILWAY_STATIC_URL}` : null
  ].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the NovaSpace Backend!',
    environment: NODE_ENV,
    status: 'running'
  });
});


app.get('/health', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.json({ 
      status: 'healthy', 
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy', 
      database: 'disconnected',
      error: error.message
    });
  }
});


app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


const startServer = async () => {
  try {
    
    await db.sequelize.authenticate();
    console.log('Database connection established successfully');


    if (NODE_ENV === 'development') {
      await db.sequelize.sync({ alter: false });
      console.log('Database models synced');
    }

  
    app.listen(PORT, '0.0.0.0', () => {
      console.log(` Server is running on port ${PORT}`);
      console.log(` Environment: ${NODE_ENV}`);
      console.log(` CORS enabled for configured origins`);
    });
  } catch (error) {
    console.error(' Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;