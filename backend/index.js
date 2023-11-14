const express = require('express');
const port = process.env.PORT || 8000;
const products = require('./products');

const app = express();

app.use(express.json())

app.get('/', (req, res)=> {
    res.send("Hello World");
})

app.get('/api/products', (req, res)=> {
    if(req.query.search) {
        const filterProducts = products.filter((product)=> product.name.includes(req.query.search));
        res.send(filterProducts);
        return;
    }
    setTimeout(()=> {
        res.send(products);
    },3000)
    
})


app.post('/api/users', (req, res)=> {
     const user = [];
     user.push(req.body);
     res.json(user);
})

app.listen(port, ()=> {
    console.log(`Server is running on port:${port}`);
})