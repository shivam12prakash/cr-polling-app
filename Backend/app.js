const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/db')

const app = express();

const crpolling = require('./Routes/crpolling')


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use('/crpolling', crpolling)

const port = 3003;

app.listen(port,() =>{
    console.log(`Server is set on PORT ${port}`);
})
