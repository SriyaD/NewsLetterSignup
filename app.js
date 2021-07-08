const express=require("express");
const request  = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const mailchimp= require("@mailchimp/mailchimp_marketing");
const app = express();//initialize express ap

app.use(express.static("public"));//to make ststic pages like images ansd styles.css files appear
//bcos static files are not available to the server .place them in the public folder
app.use(bodyParser.urlencoded({extended:true}));
//uesd to go through the data posted by users on our server

 app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
 });

app.post("/",function(req,res){
  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const email = req.body.email;
  // console.log(firstName,lastName,email);
  var data = { //create a js object for maichimp to identify
    members : [ //array of objects
    {
      email_address : email,
      status : "subscribed",
      merge_fields : { //object
        FNAME : firstName,
        LNAME : lastName
       }
    }
    ]
  };
  const jsonData = JSON.stringify(data);//convert js object into flatpack json
  //send this json data to mailchimp
  const url = "https://us6.api.mailchimp.com/3.0/lists/1180603534"
  //this url is the mailchimps end point
  const options = { //js object
    method : "POST",
    auth : "sriya:"API KEY"//the api key has been hidden due to security resons
    //provides authentication through our API KEY
  }
  //https gets data from external resource but to requestt
  //this call back function gives response from mailchimps server
  if(response.statusCode == 200 ){
   const reques = https.request(url,options,function(response){
  //here we made a htpp request to the mailchimp server and the mailchimp server gave a response and store that in reques const
       res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
     }
    response.on("data",function(data) {//after making http req to maichimp server we check what response milchimp server gave us
    console.log(JSON.parse(data));
    })
  })
    reques.write(jsonData);//write the data that we converted into json(jsonData) to mailchimps server
    reques.end();//we are done with requesting
});


app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});
