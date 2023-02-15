let express = require('express');
let mongo = require('mongodb');
let bodyParser = require("body-parser");
let cors = require('cors');
let app = express();
let port = process.env.PORT || 8900;
let MongoClient = mongo.MongoClient;
let db = null;
// let mongoUrl = "mongodb://localhost:27017";
let mongoUrl = 'mongodb+srv://test:test1234@primedb.iqhk7dg.mongodb.net/?retryWrites=true&w=majority'

// middleware - supporting library
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// list of movies
app.get('/movies', (req, res) =>{
    db.collection('Primedb').find().toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
}) 

// 
// app.post('/addMovies', (req, res) => {
//     db.collection('Primedb').insertOne(req.body,(err,result) => {
//         if(err) throw err;
//         res.send('Data Inserted')
//     })
// })

app.get('/', (req, res) => {
    res.send("Hii Welcome!");
})

// connect with mongodb
MongoClient.connect(mongoUrl,{useNewUrlParser:true,  useUnifiedTopology: true},(err,connectedClient) => {
    if(err) console.log('Error while connecting');
    db = connectedClient.db('Prime');
    app.listen(port,() => {
        console.log(`Server is running on port ${port}`)
    })
})