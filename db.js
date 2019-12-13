const mongoose = require('mongoose');

const connStr = 'mongodb://localhost:27017/NodeAngularFilm';
mongoose.connect(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;