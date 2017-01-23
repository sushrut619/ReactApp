var mysql = require("mysql");
var path = require('path');

function REST_ROUTER(router,connection){
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection){
    /*
    router.get("/!*",function(req,res){
        res.sendFile(path.join(__dirname,'./build/js', 'main.<hash>.js'));
    });*/

    router.get("/doctors/:name/:date",function(req,res){
        console.log("get doctors appointments request received");
        var query = "SELECT * FROM ?? WHERE ??=? AND DATE_FORMAT(date,'%y-%m-%d') = DATE_FORMAT(?,'%y-%m-%d')";
        var table = ["appointments","doctor_name", req.params.name, req.params.date];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", "err:" : err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "appointments" : rows});
            }
        });
    });

    router.post("/appointment/new",function(req,res){
        console.log("body");
        /*
        var bodyStr = '';
        req.on("data",function(chunk){
            bodyStr += chunk.toString();
        });
        req.on("end",function(){
            console.log(bodyStr);
            res.send(bodyStr);
        });
        */
        var query = "INSERT INTO `appointments` (`doctor_name`, `date`, `time`, `subject`, `notes`) VALUES (?, ?, ?, ?, ?)";
        var table = [req.body.name, req.body.date, req.body.time, req.body.subject, req.body.notes];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Appointment added successfully !"});
            }
        });
    });

    router.put("/appointment/edit", function(req,res){
        console.log("put request received")
        var query = "UPDATE `appointments` SET `date` = ?, `time` = ?, `notes` = ? WHERE `doctor_name` = ? AND `subject` = ?";
        var table = [req.body.date,req.body.time, req.body.notes, req.body.name, req.body.subject];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err){
                res.json({"Error" : true, "Message" : "Error executing mysql query"});
            }else{
                res.json({"Error" : false, "Message" : "Appointment updated !"});
            }
        });
    });

    router.delete("/remove/:name/:subject", function(req,res){
        console.log("delete request received")
        var query = "DELETE FROM `appointments` WHERE `doctor_name` = ? AND `subject` = ?";
        var table = [req.params.name,req.params.subject];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err){
                res.json({"Error" : true, "Message" : "Error executing mysql query"});
            }else{
                res.json({"Error" : false, "Message" : "Appointment deleted !"});
            }
        });
    });
};



module.exports = REST_ROUTER;