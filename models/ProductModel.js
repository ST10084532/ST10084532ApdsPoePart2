const mongoose = require('mongoose')

const productschema = mongoose.Schema(
    {
       name: {type: String, required:true},
       catagory: {type: String, required:true}

    }
)

module.exports = mongoose.model('Product', productschema)