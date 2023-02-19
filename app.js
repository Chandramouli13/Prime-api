let express = require('express');
let mongo = require('mongodb');
let bodyParser = require("body-parser");
let cors = require('cors');
let app = express();
let port = process.env.PORT || 8900;
let MongoClient = mongo.MongoClient;
let db = null;
// let mongoUrl = 'mongodb://localhost:27017';
let mongoUrl = 'mongodb+srv://test:test1234@primedb.iqhk7dg.mongodb.net/?retryWrites=true&w=majority'

// middleware - supporting library
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// welcome
app.get('/', (req, res) => {
    res.send("Hii Welcome!");
})

// list of movies
app.get('/movies', (req, res) =>{
    db.collection('Primedb').find().toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
}) 

// with respect to category_id (http://localhost:8900/movies/1)
app.get('/movies/:cat_Id',(req,res) => {
    let id = Number(req.params.cat_Id)
    
    db.collection('Primedb').find({category_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// with respect to id
app.get('/movies//:movieId',(req,res) => {
    let id = Number(req.params.movieId)

    db.collection('Primedb').find({id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


// app.use((req, res, next) => {
//     res.header({"Access-Control-Allow-Origin": "*"});
//     next();
// }) 

// add movies
// app.post('/addMovies',(req,res) => {
//     db.collection('Primedb').insert(req.body,(err,result) => {
//         if(err) throw err;
//         res.send('Data Inserted')
//     })
// })

// connect with mongodb
MongoClient.connect(mongoUrl,{useNewUrlParser:true,  useUnifiedTopology: true},(err,connectedClient) => {
    if(err) console.log('Error while connecting');
    db = connectedClient.db('Prime');
    app.listen(port,() => {
        console.log(`Server is running on port ${port}`)
    })
})