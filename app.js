const express = require('express');
const path = require('path');
const http = require('http');
const mysql = require('mysql');
const body_parser = require('body-parser');
// const hbs = require('hbs');


// Database Connection

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123**",
    database:"inventory"
})

//Connection
db.connect((err)=>{
    if(err) throw(err);
    console.log('Connectin Success');
})


const app = express();

app.use(body_parser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'./practise_2')));

// app.set("view","C:\Users\DELL\Desktop\Skill_Compo_practicals\practise_2");

// Add/Change default view engine | OR Render Engine

app.set("view engine","hbs");


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'./page.html'));
});


app.get('/insert',function(req,res){
    res.sendFile(path.join(__dirname,'./insert.html'));
});

app.get('/update',function(req,res){
    res.sendFile(path.join(__dirname,'./update.html'));
});

app.get('/delete',function(req,res){
    res.sendFile(path.join(__dirname,'./delete.html'));
});




app.post('/insert_operation',function(req,res){   

    // sql = `INSERT INTO store VALUES(${req.body.item_id},"${req.body.item}",${req.body.qty})`;

    // db.query(sql,(err,result)=>{
    //     if(err) throw(err);
    //     res.send("INSERTION SUCCESSFUL");
    //     console.log("INSERTION SUCCESSFUL");
    // });

});

app.post('/update_operation',function(req,res){
    sql = `UPDATE store SET item="${req.body.item}",qty=${req.body.qty} WHERE item_id=${req.body.item_id}`;

    db.query(sql,(err,result)=>{
        if(err) throw(err);
        res.send("UPDATION SUCCESSFUL");
        console.log("UPDATION SUCCESSFUL");
    });

});


app.post('/delete_operation',function(req,res){
    sql = `DELETE from store WHERE item_id=${req.body.item_id}`;

    db.query(sql,(err,result)=>{
        if(err) throw(err);
        res.send("DELETIPN SUCCESSFUL");
        console.log("DELETION SUCCESSFUL");
    });

});


app.get('/select_operation',function(req,res){
    sql = "SELECT * FROM store";

    respose = db.query(sql,(err,result)=>{
        if(err) throw(err);
        // res.send(result);
        // console.log(result);

        // res.render("about", { title: "Hey", message: "Hello there!" })
        res.render("select",{result: result});
    });    
});







app.listen(3000,()=>
{
    console.log('Listening to 3000');
}
)

