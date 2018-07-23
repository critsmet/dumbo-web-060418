// inktoni
// ask jeeves
// duck duck go
// babel
// aol Search
// msn search
// yahooligans

document.addEventListener('DOMContentLoaded', init);

function init() {
  const searchEngineForm = document.querySelector('form');
  searchEngineForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // grabbing some data from the page
    const searchEngineName = e.target.querySelector(
      '[name="search-engine-name"]'
    ).value;
    const searchEngineUrl = e.target.querySelector('[name="search-engine-url"]')
      .value;
    const searchEngineUrl = e.target.querySelector(
      '[name="search-engine-status"]'
    ).value;

    // doing something with that data
    const newSearchEngineTemplate = `<li><a href="${searchEngineUrl}">${searchEngineName}</a>: ${searchEngineStatus}</li>`;
    fetch('http://localhost:3000/engines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: searchEngineName,
        url: searchEngineUrl
      })
    });

    // rendering
    const linksUl = document.querySelector('ul');
    linksUl.innerHTML += newSearchEngineTemplate;
  });

  // Initial render
  fetch('http://localhost:3000/engines', {
    method: 'GET'
  })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(data) {
      const seList = document.querySelector('#search-engine-list');
      const template = data
        .map(function(engine) {
          return `<li><a href="${
            engine.url
          }">${engine.name}</a>: ${engine.status}</li>`;
        })
        .join('');
      seList.innerHTML += template;
    });
}
