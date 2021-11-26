/** @format */

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let fetchErrCount = 0;
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();

  // Pick a random quote from apiQuotes array
  let quote = null;
  if (apiQuotes.length > 0) {
    quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote) {
      console.log('Using Local Quotes');
      quote = newQuoteLocal();
    } else {
      console.log('Using quote array from api');
    }
  } else {
    console.log('Using Local Quotes, apiQuotes is null');
    // console.trace();
    quote = newQuoteLocal();
  }
  // Check if Author field is blank and replace it with "Unknown"
  console.log(quote);
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Local Quote Fallback
function newQuoteLocal() {
  showLoadingSpinner();
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  removeLoadingSpinner();
  return quote;
}

// Get array of quotes from api
async function getQuotes() {
  console.log('in getQuotes..');
  // console.trace();
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    // throw new Error("testing error"); // testing
    console.log('Fetching from ' + apiUrl);
    const response = await fetch(apiUrl);
    console.log('Got api response...');
    apiQuotes = await response.json();
    console.log('apiQuotes.length=' + apiQuotes.length);
    fetchErrCount = 0;
  } catch (error) {
    console.log('Error on fetch: ' + error + ' fetchErrCount=' + fetchErrCount);
    fetchErrCount++;
    if (fetchErrCount < 10) {
      console.log('Retrying api: ' + fetchErrCount);
      getQuotes();
    }
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
async function onLoad() {
  console.log('Loading...');
  await getQuotes();
  newQuote();
  console.log('Done loading.');
}

onLoad();
