const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res, next) => {
    res.sendFile(`${__dirname}/index.html`)
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});