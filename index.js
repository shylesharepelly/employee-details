const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.set("view engine","ejs");
app.use(bodyParser.json());
const { User} = require("./models");

app.use(express.urlencoded({extended:false}));

app.listen(3000, () => {
  console.log("Started express server at port 3000");
});



// app.use(cookieParser("ssh! some secret string"));
// app.use(csrf("this_should_be_32_character_long", ["POST", "PUT", "DELETE"]));
// app.use(session({
//     secret:"my-secret-super-key-21728172615261562",
//     cookie:{
//       maxAge:24*60*60*1000
//     }
//   }))

app.set("view engine","ejs");
const path = require('path');
app.get("/",async (request,response)=>{
    const users1= await User.getall();
    //console.log(users1)
    response.render("index.ejs",{data:users1});
})
app.get("/new-employee",(request,response)=>{
    response.render("employee.ejs");
})
app.get("/get-employee/:id",async (request,response)=>{
    console.log("id",request.params.id)
    const user1=await User.getDetails(request.params.id);
    console.log(user1)
    //console.log(user1[0])
    console.log(user1.name)
    response.render("employee1.ejs",{id:request.params.id,data:user1});
})

app.post("/employee",async (request,response)=>{

    console.log("user",request.body)
    
  try{
        const user1= await User.create({
        name:request.body.name,        
        job: request.body.job,
        email: request.body.email,
        phone: request.body.phone,
        address: request.body.address,
        city: request.body.city,
        state: request.body.state,
        primary: request.body.primary,
        phone1: request.body.phone1,
        relation1: request.body.relation1,
        second: request.body.second,
        phone2: request.body.phone2,
        relation2: request.body.relation2
        
        })
    }
    
  catch(error){
    console.log(error);
    return response.redirect("/new-employee");
    }
    response.redirect("/");
    
})
//update employee data
app.put("/update-employee/:id",async (request,response)=>{
    console.log("userid",request.params.id);
    console.log("name1",request.body.name)
    try{
    const updated= await User.updatedata(
        request.params.id,
        request.body.name,        
        request.body.job,
         request.body.phone,
         request.body.address,
        request.body.city,
        request.body.state,
         request.body.primary,
        request.body.phone1,
         request.body.relation1,
        request.body.second,
        request.body.phone2,
        request.body.relation2
    )
    console.log(updated);
    //response.redirect("/");
    return response.json(updated);
    }
    catch (error) {
        console.log(error);
        return response.status(422).json(error);
      }
    
});

//delete request
app.delete("/employee/:id",async(request,response)=>{
    try{
        await User.remove(request.params.id);
        return response.json(true);
      }
      catch (error) {
        console.log(error);
        return response.status(422).json(error);
      }
});