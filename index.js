var express = require('express');
var app = express();
var path = require('path');
var request = require("request");
var config = require("./config.json")

function get_data(cb) {
  var url = config.url_base + config.contest_name + '/leaderboard?offset=0&limit=' + config.contestants;
  console.log("url: ", url);

  request(url, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var data = JSON.parse(body);
      data['teams'] = config.teams;
      console.log("data")
      console.log(data)
      cb(null, data);
    }
    else {
      cb(true);
    }
  });
}

app.get('/score', function (req, res) {
  get_data(function(err, data) {
    if (!err) {
      res.json(data);
    }
    else {
      res.json({'ok': false});
    }
  })

});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(express.static('public'))
var port = process.env.PORT || '3000';
app.listen(port);
