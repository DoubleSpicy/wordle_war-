// https://github.com/Jerga99/next-youtube-course
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;
const { sendConfirmationEmail, sendResetPasswordEmail } = require('./controllers/mailer');
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());



// routes
app.use('/', require('./routes/root'));
app.get('/test', (req, res) => {
    res.json({ message: 'Hello World!' });
})

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/activate', require('./routes/activate'));

app.use('/auth', require('./routes/auth'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));