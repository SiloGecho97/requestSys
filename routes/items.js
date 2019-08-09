let itemsModel = require('../models/items_model')
let express = require('express')
var bodyParser = require('body-parser')


var urlEncodeParser = bodyParser.urlencoded({extended:true})
let router = express.Router()

//create a new customer
 
router.post('/add_items',urlEncodeParser,(req,res)=>{
    if (!req.body){
        return res.status(400).send('Request body is missing')
    }
   
    console.log(req.body);
    //res.send(req.body);

    let model = new itemsModel(req.body)
    model.save() 
    .then (doc =>{
        if (!doc || doc.length ==0){
            
        return res.status(500).send(doc)
        }
       
       res.status(201).send(doc)
    })
    .catch (err => {
        res.status(500).json(err) 
    })
})

router.get('/addItem',urlEncodeParser,(req,res)=>{
    res.render('addItem');
        
})
//list Items
router.get('/getItem',urlEncodeParser,(req,res)=>{
   
    itemsModel.find()
    .then((items) => {
      res.render('requestForm', { title: 'Listing items', items });
    })
        
})

module.exports = router