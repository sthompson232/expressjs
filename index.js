const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const app = express();

// Init middlewware
app.use(logger);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html']
}));
app.use('/api/members', require('./routes/api/members'));

// app.get('/', (req, res) => {
  // res.send('<h1>Hello World!!!!</h1>');
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
