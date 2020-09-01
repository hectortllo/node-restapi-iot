import express from 'express';

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('hello world');
})

export default app;