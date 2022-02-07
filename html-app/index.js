const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res, next) => {
    res.sendFile(`${__dirname}/index.html`)
});
app.get('/script.js', (req, res, next) => {
    res.sendFile(`${__dirname}/script.js`)
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});