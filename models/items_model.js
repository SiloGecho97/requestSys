let monogoose = require('mongoose')
 
monogoose.connect('mongodb://localhost/myapp'); 

let itemsSchema = new monogoose.Schema({
    itemNo: Number,
    itemDescription: String,
    brand: String,
    model:String,
    process:String,
    unit:String,
    


})

module.exports = monogoose.model('items',itemsSchema)