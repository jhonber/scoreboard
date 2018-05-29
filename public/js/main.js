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
  var container = document.createElement("div");
  container.setAttribute("class", "table-responsive");

  var table = document.createElement('table');
  table.setAttribute("id", "scoreTable");
  table.setAttribute("class", "table");
  table.setAttribute("align", "center");
  table.setAttribute("style", "width:95%;");

  container.appendChild(table);
  document.body.appendChild(container);

  var col = ['Rank', 'Team', 'Solved', 'Time']
  var challenges = data.models[0].challenges.length;

  for (var i = 0; i < challenges; ++i) {
    col.push(String.fromCharCode(97 + i).toUpperCase());
  }


  var title = document.createElement("tr");
  title.setAttribute("style", "background-color:#a5acc6;");

  for (var i = 0; i < col.length; ++i) {
    var cell = document.createElement("th");
    var cur = document.createTextNode(col[i]);
    cell.appendChild(cur);
    title.appendChild(cell);
  }

  table.appendChild(title)

  var interna_rank = 1;
  for (var i in data.models) {
    var cur = data.models[i]
    var team = document.createElement("tr");
    if (!(cur.hacker in data.teams)) continue;

    var rank = document.createElement("td");
    rank.innerHTML = interna_rank ++;
    team.appendChild(rank);

    var name = document.createElement("td");
    name.innerHTML = data.teams[cur.hacker];
    team.appendChild(name);

    var solved = document.createElement("td");
    solved.innerHTML = cur.solved_challenges;
    team.appendChild(solved);

    var time = document.createElement("td");
    time.innerHTML = Math.ceil(cur.time_taken / 60);
    team.appendChild(time);

    var ind = 1;
    for (var j in cur.challenges) {
      var chall = data.models[i].challenges[j];

      var tmp = document.createElement("td");
      var solved_time = data.models[i].challenges[j].time_taken;
      if (solved_time > 0) {
        tmp.innerHTML = [
          "<figure>",
            "<img src=/images/" + ind.toString() +".png alt='yes' width='30'></img>",
            "<figcaption style='font-size: 14px;'>",
              "(",
              Math.ceil(solved_time / 60),
              ":",
              data.models[i].challenges[j].submissions - 1,
              ")",
            "</figcaption>",
          "</figure>"
        ].join(" ");
      }
      else {
        if (data.models[i].challenges[j].submissions > 0)
          tmp.innerHTML = " -" + data.models[i].challenges[j].submissions;
        else
          tmp.innerHTML = " --- ";
      }
      team.appendChild(tmp);
      ind ++;
    }

    table.appendChild(team);
  }
}

get_score('warm-up-maraton-interna-utp', '20', function(err, data) {
  console.log('Data: ')
  console.log(data)
  make_score(data)
});

