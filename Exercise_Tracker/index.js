const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

const listener = app.listen(port, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})

//----------------------------------------------------------------------------------------------------------------------
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://demo:demo@cluster0.3earh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true });


