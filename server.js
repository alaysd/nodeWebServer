const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port  = process.env.PORT || 3000;
var app = express();

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log =`${now} ${req.method}`;

  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Unable');
    }
  });
  next();
});


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})

/*hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
});*/
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    theName:'Alay'
  });
})
app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    theProjects: 'HERKO trial'
  })
});
app.get('/home',(req,res)=>{
  var x = req.id.nam;
  console.log(x);
})

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About page',
  });
});

app.listen(port,()=>{
  console.log('server is up',port);
});
