const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get("/api/:date?", (req, res) => {
    let input = req.params.date;
    if (input === undefined) {
        res.json({
            "unix": new Date().getTime(),
            "utc": new Date().toUTCString()
        });
    } else {
        let date_string = new Date(input);
        if (date_string.toString() === "Invalid Date") {
            if (input.includes('-')) {
                const date = new Date(input);
                if (date.toString() === 'Invalid Date') {
                    res.json({
                        "error": "Invalid Date"
                    });
                } else {

                    res.json({
                        "unix": date.getTime(),
                        "utc": date.toUTCString()
                    });
                }
            } else {
                const date = new Date(parseInt(input));
                if (date.toString() === 'Invalid Date') {
                    res.json({
                        "error": "Invalid Date"
                    });
                } else {
                    res.json({
                        "unix": date.getTime(),
                        "utc": date.toUTCString()
                    });
                }
            }
        } else {
            res.json({
                "unix": date_string.getTime(),
                "utc": date_string.toUTCString()
            });
        }
    }
});





app.listen(port, () => console.log(`app listening on port ${port}!`));