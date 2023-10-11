const express = require('express')
const router = express.Router();
const Product = require('../models/ProductModel');
const checkauth = require('../check-auth')

router.get('', (req, res)=>{
    Product.find().then((products)=>{
        res.json(
            {
                message: 'Products found',
                products:products
            }
        )
    })
})

router.post('', checkauth, (req, res)=>{
    const product = new Product(
    {
        name: req.body.name,
        catagory: req.body.catagory
    }
)
product.save()
    .then(()=>{
    res.status(201).json
    ({
        message:'Product created',
        product:product
    })
})
})


router.delete('/:name', checkauth, (req, res)=>{
    Product.deleteOne({_id: req.params.id})
    .then((result)=>
    {
        res.status(200).json({message: "Product deleted"});
    });
})

module.exports = router