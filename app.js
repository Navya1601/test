const express=require("express")
const request=require("request")
const https=require("https")
const bodyparser=require("body-parser")
const app=express()
app.use(bodyparser.urlencoded({extended:true}))
app.get("/",function(req,res){
  res.sendFile(__dirname+"/success.html")
})
app.use(express.static("public"))
app.post("/",function(req,res){
  var firstname=req.body.fname
  var lastname=req.body.lname
  var email=req.body.email
  var data={

    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
      FNAME:firstname,
      LNAME:lastname
    }

    }]
  };
  var jsondata=JSON.stringify(data);
  const url="https://us1.api.mailchimp.com/3.0/lists/e004708641"
  const options={
    method:"POST",
    auth:"Navya:99e71d39d268a544260f40961499fdca-us1"
  }
  const request=https.request(url,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));

    })

  })
  request.write(jsondata);
  request.end();
})



app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
//api key
//99e71d39d268a544260f40961499fdca-us1
//list key
//e004708641
