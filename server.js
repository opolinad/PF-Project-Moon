const express = require('express');
const app = express();


const path = require('path');
const viewsPath = path.join(__dirname, 'front', 'public');
app.use(express.static(viewsPath))
app.set('views',viewsPath)
//app.set('view engine', 'ejs')
app.engine('html',require('ejs').renderFile);
app.set('view engine','html')


app.get("/*",(req,res)=>
{
    res.render("index")
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("server is running");
})