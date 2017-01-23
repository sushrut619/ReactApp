var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var rest = require("./REST.js");

var app = express();

function REST(){
    var self = this;
    self.connectMysql();
}

REST.prototype.connectMysql = function(){
    var self = this;
    var  pool = mysql.createPool({
        connectionLimit : 100,
        host : 'localhost',
        port : '3307',
        user : 'root',
        password : 'root',
        database : 'qpair',
        debug : false
    });
    pool.getConnection(function(err,connection){
        if(err){
            self.stop(err);
        }else{
            self.configureExpress(connection);
        }
    });
};

REST.prototype.configureExpress = function(connection){
    var self = this;
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(express.static('./build'));
    var router = express.Router();
    app.use('/', router);
    var rest_router = new rest(router, connection);
    self.startServer();
};

REST.prototype.startServer = function(){
    app.listen(3000, function(){
       console.log("I am alive at port 3000");
    });
};

REST.prototype.stop = function(err){
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
};

new REST();