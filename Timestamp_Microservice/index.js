const express = require('express');
const app = express();
const port = 3000;

app.get('/api', (req, res) => {
    const now = new Date();
    const unix = now.getTime();
    const utc = now.toGMTString();
    res.json({ unix: unix, utc: utc });
})

app.get('/api/:date', (req, res) => {
    if (isNaN(req.params.date)) {
        const date = new Date(req.params.date);
        const unix = date.getTime();
        const utc = date.toGMTString();
        res.json({ unix: unix, utc: utc });
    } else {
        const unix = Number(req.params.date);
        const date = new Date(unix);
        const utc = date.toGMTString();
        res.json({ unix: unix, utc: utc });
    }
})






app.listen(port, () => console.log(`app listening on port ${port}!`));