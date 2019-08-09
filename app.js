const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
const router = express.Router();
let itemsRoute = require('./routes/items')
let requestsRoute = require('./routes/request')

let itemModel=require('./models/items_model')
let requestsModel = require('./models/requests_model')

app.use(requestsRoute)
app.use(itemsRoute)

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/',function(req,res){
  itemModel.find()
  .then((items) => {
    res.render('index', { title: 'Listing items', items });
  })
  //__dirname : It will resolve to your project folder.
});





// router.post('/next', urlencodedParser,function (req, res) {
//   var desktop3=["Desktop","Desktop Computer with core i7 for basic Office","HP","290G2"];
//   console.log(req.body);
//   var body = req.body;
//   // res.sendFile(path.join(__dirname+'/request.html')); 
//   res.render(__dirname + "/request.html",{items:desktop3});
// });


let requests=[];

let departement=[];
let allRequest=[];

router.post('/next', urlencodedParser,(req, res) => {
  
  var dept = ["Adminstration", "Registrar", "School Civil And Enviromental engineering", "ITSC"];
  var desk1={
    itemNo:1,
    desc:"Desktop Computer with core i3 for basic Office",
    model:"Dell",
    brand:"290G2"
  };
  var desk2={itemNo:2,desc:"Desktop Computer with core i5 for basic Office",model:"Hp",brand:"290G2"};
  var desk3={itemNo:3,desc:"Desktop Computer with core i7 for basic Office",model:"Hp",brand:"290G2"};
  var lapt1={itemNo:4,desc:"Laptop Computer with core i3 for basic Office",model:"Hp",brand:"250 G6 Notebook"};
  var lapt2={itemNo:5,desc:"Laptop Computer with core i5 for basic Office",model:"Hp",brand:"250 G6 Notebook"};
  var lapt3={itemNo:6,desc:"Laptop Computer with core i7 for basic Office",model:"Hp",brand:"250 G6 Notebook"};
  var harddisk1={itemNo:7,desc:"2TB External hard disk",model:"--",brand:"Toshiba"};
  var harddisk2={itemNo:7,desc:"2TB External hard disk",model:"--",brand:"Toshiba"};
  var cd1={itemNo:8,desc:"CD-R",model:"--",brand:"RIdata"};
  var cd1={itemNo:9,desc:"CD-RAW",model:"--",brand:"RIdata"};
  var lcd1={itemNo:10,desc:"LCD Project",model:"--",brand:"Epson"};

 
  console.log(req.body);
  console.log(req.body.Desktop3);
  departement.push(dept[req.body.dept])
  // if(req.body.dept === '0'){
  //   allRequest.push(dept);
  // }

  if(req.body.Desktop1 != undefined){
    allRequest.push(desk1);
  }
  if(req.body.Desktop2 != undefined){
    allRequest.push(desk2);
  }
  if(req.body.Desktop3 != undefined){
    allRequest.push(desk3);
  }

  if(req.body.laptop1 != undefined){
    allRequest.push(lapt1);
  }
  if(req.body.laptop2 != undefined){
    allRequest.push(lapt2);
  }
  if(req.body.laptop3 != undefined){
    allRequest.push(lapt3);
  }
  if(req.body.hard1 != undefined){
    allRequest.push(harddisk1);
  }
  if(req.body.hard2 != undefined){
    allRequest.push(harddisk2);
  }
  if(req.body.lcd1 != undefined){
    allRequest.push(lcd1);
  }


  console.log(allRequest)
  
  res.render('request',
    {items:allRequest}
    );
});

 
router.post('/send_request',urlencodedParser,(req,res)=>{
  if (!req.body){
      return res.status(400).send('Request body is missing')
  }
   
  console.log(req.body);
  //res.send(req.body);

  for (i in allRequest) {
    var requests = {  
      sequenceNumber:i,
      itemNo: allRequest[i].itemNo,
      itemDescription: allRequest[i].desc,
      brand: allRequest[i].brand,
      model:allRequest[i].model,
      process:String,
      unit:String,
      qty:req.body.quantity[i],
      unitPrice:345,
      totalPrice:24578,
      requestedDate:'09-09-19',
      code:String,
      department: String,
      remarks:req.body.remarks[i],
    }
  
   console.log(requests)
   
  
   let model = new requestsModel(requests)
   model.save() 
  }
  
  // .then (doc =>{
  //     if (!doc || doc.length ==0){
  //         return res.status(500).send(doc)
  //     }
  //     res.status(201).send(doc)
  // })
  // .catch (err => {
  //     res.status(500).json(err) 
  // })
  allRequest=[];
  res.render('index',
    {msg:"Requested Submitted Succesfully!"}
    );
})



app.set('views',path.join(__dirname,"views"));
app.set('view engine','pug');
// app.engine('html', require('ejs').renderFile);
app.use('/', router);

app.use(express.static(__dirname));
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');