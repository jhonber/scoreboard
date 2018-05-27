// match teams and usernames
var teams = {
            'cardona_627': 'Coders',
            'diegorestrepo68': 'Wrong syntax',
            'catalinacst': 'UTP - lucas',
            'yefri_gaitan97': 'Los hijos de Pitágoras',
            'carojimenez26': 'Never sorry',
            's_londono': 'Hard Rock',
            'marclap': 'Legendary team',
            'kenpo': 'No merce',
            'andbet050197': 'UTPitos',
            'jhonber': 'No good one',
          }


// https://www.hackerrank.com/rest/contests/warm-up-maraton-interna-utp/leaderboard?offset=0&limit=10&_=1527445932946
function get_score (contest_name, limit, cb) {
  var url = 'https://www.hackerrank.com/rest/contests/' + contest_name + '/leaderboard?offset=0&limit=' + limit;
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
  document.body.appendChild(table);

  var col = ['Rank', 'Team', 'Solved', 'Time']
  var challenges = data.models[0].challenges.length;

  for (var i = 0; i < challenges; ++i) {
    col.push(String.fromCharCode(97 + i).toUpperCase());
  }

  console.log(col)

  var title = document.createElement("tr");
  for (var i = 0; i < col.length; ++i) {
    var cell = document.createElement("th");
    var cur = document.createTextNode(col[i]);
    cell.appendChild(cur);
    title.appendChild(cell);
  }

  table.appendChild(title)
}

get_score('warm-up-maraton-interna-utp', '20', function(err, data) {
  console.log('Data: ')
  console.log(data)
  make_score(data)
});

