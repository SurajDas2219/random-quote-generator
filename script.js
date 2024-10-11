const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuotesBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

let apiQuotes = [];

// Pick New Quotes
function newQuotes() {
  // Pick a random new Quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if there is no author, in that case set author = Unknown
  authorText.textContent = quote.author ? quote.author : "Unknown";

  // Check Quote Length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  complete();
}

// Get The Quote from API
async function getQuote() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    apiQuotes = await response.json();
    newQuotes();
  } catch (error) {
    // Display an error message
    quoteText.textContent = "Could not load quote. Please try again later.";
    authorText.textContent = "";
    complete();
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// Tweet Quote
function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, "_blank");
}

// Event Listeners
newQuotesBtn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
