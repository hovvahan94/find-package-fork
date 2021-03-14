const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');
const path = require('path');

// require('dotenv').config();


const app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://find-package-fork.herokuapp.com​']
const corsOptions = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(morgan('tiny'));
app.use(cors(corsOptions));

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
    const error = new Error('Not Found babam');
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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')))

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../build', 'index.html'))
    })
}



// server started
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
