// To Do: Handle missing image, esp for small screen
// (e.g. when get error on line 16, though it looks like most of data gets thru. But make better substitute for image )
const TV_API_URL = `https://api.tvmaze.com/search/shows`
const form = document.querySelector('#searchForm')
const query = document.querySelector('#query');
const submitButton = document.querySelector('#submit')
const showsContainer = document.querySelector('#shows')

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  // console.dir(this)
  const searchTerm = form.elements.query.value

  // Using Axios
  const config = { params: {q: searchTerm}} // this is standard Axios for parameters instead of '?' after url. Can also have headers: {} as another entry in object (e.g. 'config' above
  const res = await axios.get(TV_API_URL, config)
  displayShows(res.data);

  // Using fetch instead of Axios:
  // const res = await fetch(TV_API_URL+"?q="+searchTerm);
  // const data = await res.json();
  // displayShows(data)
  
  // form.elements.query.value = ''
})

// If press enter on query field, submit
// query.addEventListener('keypress', function (event) {
//   if (event.key === 'Enter') {
//     event.preventDefault() // ?
//     submitButton.click()
//   }
// })

const displayShows = (shows) => {
  for (let result of shows) {
    const {averageRunTime, genres, image, name, network, premiered, ended, rating, runtime, schedule, status, summary, webChannel} = result.show;

    const mediumImage = image? image.medium : null


    const strippedSummary=stripped(summary)
    const showEl = document.createElement('DIV')
    showEl.classList.add('show')
    let imgHTML = `<img src="${mediumImage}" alt="${name}">`
    if (mediumImage === null) {
      imgHTML = `<div class="missing-image">
                    <div class="missing-image-name">${name}</div>
                    <div class="missing-image-chan">${webChannel.name}</div>
                  </div>`
    }
    let showHTML = imgHTML + `
      <div class="summary">
        <div class="">
          <h3>${name}</h3>
        </div>
        <div>
          <h3>Summary</h3>
            ${strippedSummary}
        </div>
        <h3><span class="heading">Genres:</span><span class="content">
        `;
    for (let genre of genres) {
      showHTML += ` ${genre}, `
      // console.log(genre)
    }
    showHTML = showHTML.slice(0, -2)
    showHTML += `</span></h3>`
    showHTML += `<h3><span class="heading">Premiered:</span><span class="content"> ${noNull(premiered)}</span></h3>`
    if (ended) showHTML += `<h3><span class="heading">Ended:</span><span class="content"> ${noNull(ended)}</span></h3>`
    if (webChannel) {
      if (webChannel.name) {
        showHTML += `<h3><span class="heading">Web Channel:</span><span class="content"> ${noNull(webChannel.name)} </span></h3>`
      }}
    showHTML += `</div>`
    console.log(showHTML)
    showEl.innerHTML = showHTML
    showEl.addEventListener('click', () => showShow(result.show))
    showsContainer.appendChild(showEl);
  }
}

function noNull(string) {
  if (string===null) return "" 
  return string
}

function makeImage(name) {
  return name
}

function showShow(show) {
  showsContainer.innerHTML = ''
  return null
  console.log(show)
  console.log(" ",show.name)
  console.log("Genre(s):")
  for (let genre of show.genres) {
    console.log(" ",genre)
  }
  console.log(stripped(show.summary))
  showIfNotNull("Premiered: ",show.premiered)
  showIfNotNull("Ended:     ",show.ended)
  if (show.webChannel) showIfNotNull("Web Channel: ",show.webChannel.name)
  showIfNotNull("Average Run Time: ", show.averageRuntime)
  showIfNotNull("Average Rating: ", show.rating.average)
}



function showIfNotNull(label, val) {
  if (val) console.log(label, val)
}

function stripped(htmlString) {
  let newString = htmlString.replace(/(<([^>]+)>)/gi, "").replace('&amp;', '&');
  return newString
}
