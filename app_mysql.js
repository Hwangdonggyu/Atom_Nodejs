let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
var mysql = require('mysql');
const { log } = require('console');
var conn = mysql.createConnection({
    host    :   '127.0.0.1',
    user    :   'root',
    password :  'hb970856!!',
    database :  'o2'
});
conn.connect();
let app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.locals.pretty = true;

app.set('views', './views_mysql');
app.set('view engine', 'jade');

app.get('/topic/add',function(req,res){
    var sql = 'select id,title from topic';
    conn.query(sql,function(err,topics,fileds){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        else{
        res.render('add',{topics:topics});
        }
    });
    /*
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new',{topics:files});
    });
    */
});
app.post('/topic/add',function(req,res){
    let title = req.body.title;
    let description = req.body.description;
    let author = req.body.author;
    var sql = 'insert into topic (title,description,author) values(?,?,?)';
    conn.query(sql,[title,description,author],function(err,result,fileds){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        else{
            res.redirect('/topic/'+result.insertId);
        } 
    });
    // fs.writeFile('data/' + title,des,function(err){
    //     if(err){
    //         res.status(500).send('Internal Server Error');
    //     }
    //     res.redirect('/topic/'+title);
    // });
    
})

app.get(['/topic/:id/edit'],function(req,res){
    var sql = 'select id,title from topic';
    conn.query(sql,function(err,topics,fileds){
        var id = req.params.id;
        if(id){
            var sql = 'select * from topic where id =?';
            conn.query(sql,[id],function(err,topic,fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                else{
                    res.render('edit',{topics:topics,topic:topic[0]});
                }
            });
        }
        else{
            console.log('There is no id.');
            res.status(500).send('Internal Server Error');
        }
    });
})

app.get(['/topic/:id/delete'],function(req,res){
    var sql = 'select id,title from topic';
    var id = req.params.id;
    conn.query(sql,[id],function(err,topics,fields){
        var sql = 'select * from topic where id=?';
        conn.query(sql,[id],function(err,topic){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            else{
                if(topic.length === 0){
                    console.log('There is no record.');
                    res.status(500).send('Internal Server Error');
                }
                else{
                    res.render('delete',{topics:topics, topic:topic[0]});
                }
            }
        });
    });
})
app.post(['/topic/:id/delete'],function(req,res){
    var id = req.params.id;
    var sql = 'delete from topic where id=?';
    conn.query(sql,[id], function(err,results){
        res.redirect('/topic/');
    });
})

app.post(['/topic/:id/edit'],function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var id = req.params.id;
    var sql = 'update topic set title=?, description=?, author=? where id=?';
    conn.query(sql,[title,description,author,id],function(err,result,fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        else{
            res.redirect('/topic/'+id);
        }
    });
})

app.get(['/topic','/topic/:id'],function(req,res){
    var sql = 'select id,title from topic';
    conn.query(sql,function(err,topics,fileds){
        var id = req.params.id;
        if(id){
            var sql = 'select * from topic where id =?';
            conn.query(sql,[id],function(err,topic,fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                else{
                    res.render('view',{topics:topics,topic:topic[0]});
                }
            });
        }
        else{
        res.render('view', {topics:topics});
        }
    });
})

    /*
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
    */

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

app.listen(3000, function(){
    console.log('Connected, 3000 port!');
})