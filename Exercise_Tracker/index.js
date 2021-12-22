const express = require('express');

const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(exppress.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://demo:demo@cluster0.3earh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true });
const User = require('./model/user');
const Exercise = require('./model/exercise');
const Log = require('./model/log');


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})


app.post('/api/users', (req, res) => {
    const user = new User(req.body.username);
    user.save((err, user) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(user);
    });
})

app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(users);
    });
})

app.post('/api/users/:userId/exercises', (req, res) => {
    const { description, duration, date } = req.body;
    const userId = req.params.userId;
    date = date ? new Date(date).toString() : new Date().toString();
    const exercise = new Exercise({ description, duration, date, userId });
    exercise.save((err, exercise) => {
        if (err) return res.status(500).send(err);
        if (Log.findOne({ userId })) {
            Log.findOne({ userId }, (err, log) => {
                if (err) return res.status(500).send(err);
                log.log.push(exercise);
                log.count += 1;
                log.save((err, log) => {
                    if (err) return res.status(500).send(err);
                    return res.status(201).send(log);
                });
            });
        } else {
            const log = new Log({ log: [exercise], userId, count: 1 });
            return res.status(201).send(exercise);
        }
    });
})

app.get('/api/users/:_id/logs', (req, res) => {
    const userId = req.params._id;
    const { from, to, limit } = req.query;
    from = from ? new Date(from) : new Date();
    to = to ? new Date(to) : new Date();
    limit = Number(limit) || 10;
    Log.findOne({ userId }).where('date').gte(from).lte(to).limit(limit).exec((err, log) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(log);
    });



})


app.listen(port, () => console.log(`app listening on port ${port}!`));