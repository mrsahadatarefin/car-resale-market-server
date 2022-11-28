const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
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
const bookingCollection = client.db('carResaleServer').collection('bookings')
const usersCollection = client.db('carResaleServer').collection('users')
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
    const cursor =await serviceCollection.find(query);
    const category = await cursor.toArray();
    res.send(category)
})


app.post('/bookings', async(req,res)=>{
    const booking =req.body
    console.log(booking);
    const result = await bookingCollection.insertOne(booking);
    res.send(result)
})
app.get('/bookings',async(req,res)=>{
    const email = req.query.email;
    const query ={email:email};
    const bookings =await bookingCollection.find(query).toArray();
    res.send(bookings)
})

app.post('/users',async(req,res)=>{
    const user = req.body;
    console.log(user);
    const result =await usersCollection.insertOne(user);
    console.log(result);
    res.send(result)
})

// app.get('/user',async(req,res)=>{
//     const email = req.query.email;
//     const query ={email:email};
//     const user = await usersCollection.findOne(query);
//     res.send(user)
// })
app.get('/user',async (req,res)=>{
    const query ={}
    const cursor = usersCollection.find(query);
    const services = await cursor.toArray();
    res.send(services)
    })
    app.delete('/user/:id',async(req,res)=>{
        const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const result = await usersCollection.deleteOne(query);
      res.send(result);

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