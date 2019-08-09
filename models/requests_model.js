let monogoose = require('mongoose')
 
monogoose.connect('mongodb://localhost/myapp'); 

let requestsSchema = new monogoose.Schema({
    sequenceNumber:Number,
    itemNo: Number,
    itemDescription: String,
    brand: String,
    model:String,
    process:String,
    unit:String,
    qty:Number,
    unitPrice:Number,
    totalPrice:Number,
    requestedDate:Date,
    code:String,
    department: String,
    remarks:String,
})

module.exports = monogoose.model('Request',requestsSchema)