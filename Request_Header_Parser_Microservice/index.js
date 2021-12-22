const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.get('/api/whoami', (req, res) => { 
    console.log(req.headers);
    const header_Parser = {
        "ipaddress": req.ip,
        "language": req.headers["accept-language"],
        "software": req.headers["user-agent"]
    }
    res.json(header_Parser);
});











app.listen(port, () => console.log(`app listening on port ${port}!`));