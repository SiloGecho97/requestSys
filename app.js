const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
const router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/',function(req,res){
  res.render('index')
  //__dirname : It will resolve to your project folder.
});



let items = [
  {
    item:"Desktop",
    desc:"Desktop Computer with core i7 for basic Office",
    brand:"HP",
    model:"290G2"
  },
  {
    item:"Desktop",
    desc:"Desktop Computer with core i7 for basic Office",
    brand:"HP",
    model:"290G2"
  },
  {
    item:"Desktop",
    desc:"Desktop Computer with core i7 for basic Office",
    brand:"HP",
    model:"290G2"
  }

]

// router.post('/next', urlencodedParser,function (req, res) {
//   var desktop3=["Desktop","Desktop Computer with core i7 for basic Office","HP","290G2"];
//   console.log(req.body);
//   var body = req.body;
//   // res.sendFile(path.join(__dirname+'/request.html')); 
//   res.render(__dirname + "/request.html",{items:desktop3});
// });


let requests=[];
let allRequest=[];
let departement=[];


router.post('/next', urlencodedParser,(req, res) => {
  var dept = ["Adminstration", "Registrar", "School Civil And Enviromental engineering", "ITSC"];
  var desk1={item:"Desktop",desc:"Desktop Computer with core i3 for basic Office",model:"Dell",brand:"290G2"};
  var desk2={item:"Desktop",desc:"Desktop Computer with core i5 for basic Office",model:"Hp",brand:"290G2"};
  var desk3={item:"Desktop",desc:"Desktop Computer with core i5 for basic Office",model:"Hp",brand:"290G2"};
  allRequest.push(desk1);
  console.log(req.body.Desktop3);
  console.log(req.body.dept);
  departement.push(dept[req.body.dept])
  // if(req.body.dept === '0'){
  //   allRequest.push(dept);
  // }
  if(req.body.Desktop2 != undefined){
    allRequest.push(desk1);
  }
  else if(req.body.Desktop3 != undefined){
    allRequest.push(desk2);
  }
  else if(req.body.Desktop4 != undefined){
    allRequest.push(desk3);
  }

  console.log(allRequest)
  
  res.render('request',
    {items:allRequest}
    );
});

app.set('views',path.join(__dirname,"views"));
app.set('view engine','pug');
// app.engine('html', require('ejs').renderFile);
app.use('/', router);

app.use(express.static(__dirname));
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');