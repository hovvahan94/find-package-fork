const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

// require('dotenv').config();


const app = express();

app.use(morgan('tiny'));
app.use(cors());

// routes
app.get("/forks", (req, res) => {
    const url = `https://api.github.com/repos/${req.query.owner}/${req.query.repoName}/forks`
    const params = new URLSearchParams({ page: req.query.page });
    fetch(`${url}${params ? '?' + params.toString() : ''}`)
    .then(response => response.json())
    .then(json => {
        res.json(json);
    })
});

function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found');
    next(error);
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message
    })
}

app.use(notFound);
app.use(errorHandler);



// server started
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server started at port 5000");
});
