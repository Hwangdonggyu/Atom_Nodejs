let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.locals.pretty = true;

app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/topic/new',function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new',{topics:files});
    });
});

app.get(['/topic','/topic/:id'],function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        let id = req.params.id;
        if(id){
        // id 값이 있을 때
        fs.readFile('data/'+id,'utf8',function(err,data){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view', {topics:files ,title:id, des: data});
        })
    } else{
        // id값이 없을때
        res.render('view',{topics:files, title: 'Welcome', des:'Hello, JavaScript for server'});
    }
    })
});

// app.get('/topic/:id', function(req,res){
//     let id = req.params.id;
//     fs.readdir('data',function(err,files){
//         if(err){
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//      fs.readFile('data/'+id,'utf8',function(err,data){
//         if(err){
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         res.render('view', {topics:files ,title:id, des: data});
//     })
//   })
// })

app.post('/topic',function(req,res){
    let title = req.body.title;
    let des = req.body.description;
    fs.writeFile('data/' + title,des,function(err){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });
    
})
app.listen(3000, function(){
    console.log('Connected, 3000 port!');
})