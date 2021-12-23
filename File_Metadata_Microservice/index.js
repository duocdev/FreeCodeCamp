const express = require('express')
const cors = require('cors')
const multer = require('multer')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use('/public', express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/api/fileanalyse', upload.single("upfile"), (req, res) => {
    res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size})
})