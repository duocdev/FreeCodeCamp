const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(__dirname + "/public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

const shortlink = [];

const logger = (req, res, next) => {
    console.log(shortlink);
    next();
}

app.post('/api/shorturl', logger, (req, res) => {
    const url = req.body.url;
    if (url.indexOf('http') === -1) {
        res.json({ error: 'invalid url' })
    } else {
        if (url.length > 0) {
            if (shortlink.includes(url)) {
                res.json({ original_url: url, short_url: shortlink.indexOf(url) });
            } else {
                shortlink.push(url);
                res.json({
                    "original_url": url,
                    "short_url": shortlink.indexOf(url)
                })
            }
        } else {
            res.json({ error: 'invalid url' })
        }
    }
});

app.get('/api/shorturl/:id', logger, (req, res) => {
    const id = req.params.id;
    if (id < shortlink.length) {
        res.redirect(shortlink[id]);
    } else {
        res.json({ error: 'invalid url' })
    }
});



app.listen(port, () => console.log(`app listening on port ${port}!`));