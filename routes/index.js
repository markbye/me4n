var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user =  require('../models/user').user;
var test =  require('../models/test');
//var db = mongoose.createConnection('localhost','test');

mongoose.connect('mongodb://localhost/local');

/*get home page*/
router.get('/',function(req,res){
    var query_findAll = {};

     test.findAll(function(err,docs){
        if(err){
            console.log('index-err--'+err);
        }
        console.log(docs);
        res.render('index',{title:"index",titles:docs});
    });


})

/*login*/
router.get('/login',function(req,res){
    res.render('login',{title:'login'})
})
/*logout*/
router.get('/logout',function(req,res){
    res.render('logout',{title:'logout'})
})

/*hompage*/
router.post('/homepage',function(req,res){
    var query_doc = {userid:req.body.userid,password:req.body.password};
    (function(){
        user.count(query_doc,function(err,doc){
            if(doc==1){
                console.log(query_doc.userid+": login success in "+new Date());
                res.render('homepage',{title:'homepage'})
            }else{
                console.log(query_doc.userid+": login failed in "+new Date());
                res.redirect('/');
            }
        });
    })(query_doc);
});


/*addinfook*/
router.get('/addinfo',function(req,res){
res.render('addinfo',{title:'addinfo'})
})

/*addinfo*/
router.post('/doAddinfo',function(req,res){
    var query_doc = {pathname:req.body.pname,pointx:req.body.px,pointy:req.body.py};
    (function(){
        test.add(query_doc,function(err,rb){
            if(rb==1){
                console.log(query_doc.pathname+" :insesrt ok" +new Date());
                res.render('homepage',{title:"homepage"})
            }else{
                console.log(query_doc.pathname+" :insert fail "+new Date());
                res.redirect('/');
            }
        })

    })(query_doc);
});






module.exports = router;