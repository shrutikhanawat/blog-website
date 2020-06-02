//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require ("lodash");

const homeStartingContent = "2020 is a critical year for gender equality and women’s rights. Among other major milestones, this year marks the tenth anniversary of the Women's Empowerment Principles (WEPs), a framework guiding business on how to promote gender equality and women’s empowerment in the workplace, marketplace, and community.";
const aboutContent = "Women are essential in global value chains: as producers, employees, business owners, and consumers. The WEPs encourage companies to assess and address gender equality across the value chain, from increasing women’s representation in leadership positions, access to education, and training opportunities to gender-smart procurement that works with suppliers to ensure safe and inclusive workplaces. ";
const contactContent = "Over the past decade, 2,771 companies worldwide have become signatories to the WEPs. Companies have assessed their own practices to identify major gender gaps, designed strategies to promote more equal employment opportunities though human resources practices, policies, and objectives, and implemented workplace programs to equip women with more knowledge and resources, among other efforts. ";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

 let posts = [];

app.get("/", function(req,res){
  res.render("Home",{
    startingContent: homeStartingContent,
    posts:posts
  });
    
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});
app.get("/compose",function(req,res){
  res.render("compose");
});
app.post("/compose",function(req,res){
  const post ={
    title:req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});
 app.get("/posts/:postName",function(req,res){
   const requiredTitle =_.lowerCase(req.params.postName);
   posts.forEach(function(post){
     const storeTitle=_.lowerCase(post.title);
  
   if (requiredTitle ==storeTitle){
     res.render("post",{
      title:post.title,
      content:post.content
     });
   }
   

   });

   
 });







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
