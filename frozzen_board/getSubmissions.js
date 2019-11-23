let URL = 'https://www.hackerrank.com/contests/interna-utp-2018/judge/submissions/'
let data = []
let MX = 33

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

function getData(submissions, cb) {
  function go (i) {
    if (i === submissions.length) {
      cb(null)
    } else {
      const cur = submissions[i].childNodes[0]
        .innerText.split('\n\n')
      data.push(cur)
      go(i + 1)
    }
  }
  go(0)
}

function fetchPage(page, cb) {
  var url = URL + page
  var newTab = window.open(url, '_blank')

  newTab.onload = function () {
    const submissions = newTab.document.getElementsByClassName('judge-submissions-list-view')
    setTimeout(function () {
      getData(submissions, function (err) {
        newTab.close()
        cb(null)
      })
    }, 100)
  }
}

function fetchAll(total, cb) {
  function go (i) {
    if (i === total) {
      cb(null)
    } else {
      const size1 = data.length
      fetchPage(i, function (err) {
        const size2 = data.length
        if (size1 === size2) {
          cb(null)
        }
        go(i + 1)
      })
    }
  }
  go(1)
}

fetchAll(MX, function (err) {
  console.log('Ready: ', data)
})

download('data.json', JSON.stringify(data))