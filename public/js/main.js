function get_score (contest_name, limit, cb) {
  var url = '/score';
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    cb(null, myJson);
  });
}

function make_score (data) {
  var table = document.createElement('table');
  table.setAttribute("id", "scoreTable");
  table.setAttribute("class", "table");
  document.body.appendChild(table);

  var col = ['Rank', 'Team', 'Solved', 'Time']
  var challenges = data.models[0].challenges.length;

  for (var i = 0; i < challenges; ++i) {
    col.push(String.fromCharCode(97 + i).toUpperCase());
  }


  var title = document.createElement("tr");
  for (var i = 0; i < col.length; ++i) {
    var cell = document.createElement("th");
    var cur = document.createTextNode(col[i]);
    cell.appendChild(cur);
    title.appendChild(cell);
  }

  table.appendChild(title)

  for (var i in data.models) {
    var cur = data.models[i]
    var team = document.createElement("tr");
    if (!(cur.hacker in data.teams)) continue;

    var rank = document.createElement("td");
    rank.innerHTML = cur.rank;
    team.appendChild(rank);

    var name = document.createElement("td");
    name.innerHTML = data.teams[cur.hacker];
    team.appendChild(name);

    var solved = document.createElement("td");
    solved.innerHTML = cur.solved_challenges;
    team.appendChild(solved);

    var time = document.createElement("td");
    time.innerHTML = cur.time_taken;
    team.appendChild(time);

    for (var j in cur.challenges) {
      var chall = data.models[i].challenges[j];
      

      var tmp = document.createElement("td");
      if (data.models[i].challenges[j].time_taken) {
        tmp.innerHTML = "YES";
      }
      else {
        tmp.innerHTML = "NO";
      }
      team.appendChild(tmp);
    }

    table.appendChild(team);
  }
}

get_score('warm-up-maraton-interna-utp', '20', function(err, data) {
  console.log('Data: ')
  console.log(data)
  make_score(data)
});

