const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT ||5000;

const app = express()
app.use(cors());
app.use(express.json());





const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w5yg5ut.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
 
    const serviceCollection = client.db('carResaleServer').collection('services')
const  categoryCollection = client.db('carResaleServer').collection('category')

app.get('/services',async (req,res)=>{
const query ={}
const cursor = serviceCollection.find(query);
const services = await cursor.toArray();
res.send(services)
})
app.get('/categoryName',async (req,res)=>{
const query ={}
const cursor = categoryCollection.find(query);
const category = await cursor.toArray();
res.send(category)
})

app.get('/services/:id',async(req,res)=>{
    const id =req.params.id;
    const query ={category_id:(id)};
    const category =await serviceCollection.findOne(query);
    res.send(category)
})





}

finally{

}

}
run().catch (err => console.error(err));








app.get('/',(req,res)=>{
    res.send('car resale market server is running')


})


app.listen(port,()=>{
    console.log(`car  resale server  funning ons ${port} `);
    
})