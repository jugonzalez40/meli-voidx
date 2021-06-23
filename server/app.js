const express = require('express');
const cors = require('cors');
const meliAPI = require('./meliApi');

const app = express();
const port = 8084;

app.use(cors());
app.get('/api/items', async (req,res) => {
    const products = await meliAPI.getProductsList(req.query.q); 
    res.json(products);
});

app.get('/api/items/:id', async (req,res) => {
    const product = await meliAPI.getProductDetail(req.params.id); 
    res.json(product);
});


app.listen(port, () => console.log(`Server Listen at ${port}`));