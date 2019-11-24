let URL = 'https://www.hackerrank.com/contests/interna-utp-2018/judge/submissions/'
let data = []
let duration = 300
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

function getData (submissions) {
  const process = async () => {
    for (let i = 0; i < submissions.length; ++i) {
      let cur
      await new Promise(resolve => {
        cur = submissions[i].childNodes[0]
          .innerText.split('\n\n')
        resolve()
      })
      const time = parseInt(cur[4])
      if (time >= 0 && time <= duration) {
        data.push(cur)
      }
    }
  }

  return new Promise(resolve => {
    process().then(() => {
      resolve()
    })
  })
}

function fetchPage (page) {
  return new Promise(resolve => {
    var url = URL + page
    var newTab = window.open(url, '_blank')

    newTab.onload = function () {
      const submissions = newTab.document
        .getElementsByClassName('judge-submissions-list-view')

      setTimeout(function () {
        getData(submissions).then(() => {
          newTab.close()
          resolve()
        })
      }, 1000)
    }
  })
}

function fetchAll (total) {
  const loop = async () => {
    for (let i = 1; i < total; ++i) {
      await new Promise(resolve => {
        fetchPage(i).then(() => resolve())
      })
    }
  }

  return new Promise(resolve => {
    loop().then(() => resolve(data))
  })
}

fetchAll(MX).then((data) => {
  console.log('Ready: ', data)
  download('data.json', JSON.stringify(data))
})

