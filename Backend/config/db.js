const mongoose= require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://crvotes:pollingapp@cluster0-shard-00-00.uahxc.mongodb.net:27017,cluster0-shard-00-01.uahxc.mongodb.net:27017,cluster0-shard-00-02.uahxc.mongodb.net:27017/PROJECT0?ssl=true&replicaSet=atlas-q90chp-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(() => console.log("Mongodb Connected"))
.catch((err => console.log(err)))