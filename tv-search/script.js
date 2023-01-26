// Next - sort by name? Seems to be by popularity or rating or something.
// Get cast? Show # seems to be in _links.self at end after last '/'
// Then http2://api.tvmaze.com/shows/(showid)/cast

const form = document.querySelector('#searchForm')
const query = document.querySelector('#query')
const submitButton = document.querySelector('#submit')
const showsContainer = document.querySelector('#shows')
const TV_API_URL = `https://api.tvmaze.com/search/shows`

form.addEventListener('submit', async function (e) {
  e.preventDefault()
  const searchTerm = form.elements.query.value
  clearShows()

  // Using Axios
  const config = { params: {q: searchTerm}} // this is standard Axios for parameters instead of '?' after url. Can also have headers: {} as another entry in object (e.g. 'config' above)
  const res = await axios.get(TV_API_URL, config)
  displayShows(res.data)
  
  // Using fetch instead of Axios:
  // const res = await fetch(TV_API_URL+"?q="+searchTerm);
  // const data = await res.json();
  // displayShows(data)
})

// If press enter on query field, submit
// query.addEventListener('keypress', function (event) {
//   if (event.key === 'Enter') {
//     event.preventDefault() // ?
//     submitButton.click()
//   }
// })

const displayShows = async (shows) => {
  for (let result of shows) {
    const {averageRunTime, genres, image, name, network, premiered, ended, rating, runtime, schedule, status, summary, webChannel, _links} = result.show
    // Get Show Number
    const self = _links.self.href
    const showId = self.slice(self.lastIndexOf('/')+1)

    // Get Cast
    const cast_API_URL = `https://api.tvmaze.com/shows/${showId}/cast`
    const castRes = await axios.get(cast_API_URL)
    const cast = castRes.data
    let castList = ''
    let maxCast = Math.min(4, cast.length-1)
    for (let i = 0; i <= maxCast; i++ ) {
      if (cast[i]) {
        castList += cast[i].person.name
        if (i < maxCast) castList += ", "
      }
    } 

    let mediumImage = image ? image.medium : null
    const missingImage = (mediumImage === null)
    if (missingImage) {
      const canvas = document.createElement('canvas')
      const width = 300
      const height = 421
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'rgba(0, 0, 0, 0)'
      ctx.fillRect(0,0, width, height)
      mediumImage = canvas.toDataURL()
    }

    const strippedSummary=stripped(summary)
    const showEl = document.createElement('DIV')
    showEl.classList.add('show')

    let imgHTML = `<img src="${mediumImage}" alt="${name}">`
    if (missingImage) { // overlay for blank mising image
      imgHTML += `<div class="missing-image">
                    <h3 class="missing-image-name">${name}</h3>
                    <h4 class="missing-image-chan">${webChannel.name}</h4>
                  </div>`
    }
    let showHTML = imgHTML + `
      <div class="show-info">
        <div class="">
          <h2>${name}</h2>
        </div>
        <div class="summary">
          <h3>Summary</h3>
            ${strippedSummary}
        </div>
        <h3><span class="heading">Genres:</span><span class="content">
        `
    for (let genre of genres) {
      showHTML += ` ${genre}, `
    }
    showHTML = showHTML.slice(0, -2)
    showHTML += `</span></h3>`
    if (castList) showHTML += `<h3><span class="heading">Cast:</span><span class="content"> ${castList}</span></h3>`
    showHTML += `<h3><span class="heading">Premiered:</span><span class="content"> ${noNull(premiered)}</span></h3>`
    if (ended) showHTML += `<h3><span class="heading">Ended:</span><span class="content"> ${noNull(ended)}</span></h3>`
    if (webChannel) {
      if (webChannel.name) {
        showHTML += `<h3><span class="heading">Web Channel:</span><span class="content"> ${noNull(webChannel.name)} </span></h3>`
      }}
    showHTML += `</div>`
    showEl.innerHTML = showHTML
    showsContainer.appendChild(showEl)
  }
}

function noNull(string) {
  if (string === null) return "" 
  return string
}

function clearShows() {
  showsContainer.innerHTML = ''
}

// function showShow(show) {
//   showsContainer.innerHTML = ''
//   return null
//   console.log(show)
//   console.log(" ",show.name)
//   console.log("Genre(s):")
//   for (let genre of show.genres) {
//     console.log(" ",genre)
//   }
//   console.log(stripped(show.summary))
//   showIfNotNull("Premiered: ",show.premiered)
//   showIfNotNull("Ended:     ",show.ended)
//   if (show.webChannel) showIfNotNull("Web Channel: ",show.webChannel.name)
//   showIfNotNull("Average Run Time: ", show.averageRuntime)
//   showIfNotNull("Average Rating: ", show.rating.average)
// }

function stripped(htmlString) {
  let newString = htmlString.replace(/(<([^>]+)>)/gi, "").replace('&amp;', '&')
  return newString
}
