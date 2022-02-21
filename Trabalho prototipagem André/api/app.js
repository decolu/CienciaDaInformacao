const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

const { List, Trip } = require('./db/models');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});


app.get('/lists', (req, res) => {
    List.find(req.body).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
})

app.post('/lists', (req, res) => {
    try {
        let title = req.body.title;
        let newList = new List({
            title
        });
        newList.save().then((listDoc) => {
            res.send(listDoc);
        })
    } catch (err) {
        console.log("Erro ao enviar dados");
    }
});

app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'Update completo' });
    });
});

app.delete('/lists/:id', (req, res) => {
    List.findOneAndRemove({
        _id: req.params.id,
    }).then((removedListDoc) => {
        res.send(removedListDoc);
        deleteTripsFromList(removedListDoc._id);
    })
});

app.get('/lists/:listId/trips', (req, res) => {
    Trip.find({
        _listId: req.params.listId
    }).then((trips) => {
        res.send(trips);
    })
});

app.post('/lists/:listId/trips', (req, res) => {
    List.findOne({
        _id: req.params.listId,
    }).then((trips) => {
        if (trips) {
            return true;
        }
        return false;
    }).then((canCreateTrips) => {
        if (canCreateTrips) {
            try {
                let newTrip = new Trip({
                    title: req.body.title,
                    _listId: req.params.listId
                });
                newTrip.save().then((newTripDoc) => {
                    res.send(newTripDoc);
                })
            } catch (err) {
                console.log("Erro enviando dados");
            }
        } else {
            res.sendStatus(404);
        }
    })
})

app.patch('/lists/:listId/trips/:tripId', (req, res) => {
    List.findOne({
        _id: req.params.listId,
    }).then((list) => {
        if (list) {
            return true;
        }
        return false;
    }).then((canUpdateTrips) => {
        if (canUpdateTrips) {
            Trip.findOneAndUpdate({
                _id: req.params.tripId,
                _listId: req.params.listId
            }, {
                $set: req.body
            }).then(() => {
                res.send({ message: 'Update completo' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});

app.delete('/lists/:listId/trips/:tripId', (req, res) => {
    List.findOne({
        _id: req.params.listId,
    }).then((list) => {
        if (list) {
            return true;
        }
        return false;
    }).then((canDeleteTrips) => {

        if (canDeleteTrips) {
            Trip.findOneAndRemove({
                _id: req.params.tripId,
                _listId: req.params.listId
            }).then((removedTripDoc) => {
                res.send(removedTripDoc);
            })
        } else {
            res.sendStatus(404);
        }
    });
});

let deleteTripsFromList = (_listId) => {
    Trip.deleteMany({
        _listId
    }).then(() => {
        console.log("Trip: " + _listId + " deletada");
    })
}

app.listen(3000, () => {
    console.log("Ouvindo na porta 3000");
})