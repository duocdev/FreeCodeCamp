const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

const logSchema = new mongoose.Schema({
    username: String,
    log: [Object]

})
const Log = mongoose.model('Log', logSchema);

app.post('/api/users/', (req, res) => {
    console.log(req.body);

    Log.create(req.body, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
})

app.get('/api/users', (req, res) => {
    Log.find({}, (err, data) => {
        if (err) { console.log(err); }
        else {
            const users = data.map(user => {
                return {
                    username: user.username,
                    _id: user._id
                }
            })
            console.log(users);
            res.json(users);
        }
    })
})

app.post('/api/users/:userId/exercises', (req, res) => {
    console.log(req.body);

    let { description, duration, date } = req.body;
    if (!date || date === undefined || date === null || date === '') {
        date = new Date().toDateString();
    } else {
        date = new Date(date).toDateString();
    }

    const exercises = { description, duration: +duration, date };

    Log.findById(req.params.userId, (err, data) => {
        if (err) { console.log(err); }
        else {
            data.log.push(exercises);
            data.save((err, data) => {
                if (err) { res.json(err); }
                else {
                    const user = {
                        username: data.username,
                        _id: data._id,
                        ...exercises
                    }
                    console.log(user);
                    res.json(user);
                }
            })
        }
    })
})

app.get('/api/users/:_id/logs', (req, res) => {
    let { from, to, limit } = req.query;
    from = new Date(from);
    to = new Date(to);
    limit = +limit;

    Log.findById(req.params._id, (err, data) => {
        if (err) { console.log(err); }
        else {
            
            if (limit) {
                data.log = data.log.slice(0, limit);
            }

            const user = {
                username: data.username,
                _id: data._id,
                log: data.log,
                count: data.log.length
            }
            console.log(user);
            res.json(user);
        }
    })
})

