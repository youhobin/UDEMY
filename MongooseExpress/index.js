const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Product = require('./models/product');

mongoose.connect('mongodb+srv://ghdb132:132465aa@cluster0.zz8ca1s.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true})); // post로 req.body의 값을 가져올수있음
app.use(methodOverride('_method'))


const categories = ['fruit', 'vegetable', 'dairy'];


app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
    
})

app.get('/products/new', (req, res) =>  {
    res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) =>  {  // 편집d
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories }) 
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000')
})