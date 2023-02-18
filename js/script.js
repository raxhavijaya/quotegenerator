const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  authorName = document.querySelector(".authorName"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  synth = speechSynthesis;

function randomQuote() {
  quoteText.classList.add("active");
  authorName.classList.add("active");
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "";
  fetch("http://api.quotable.io/random")
    .then((response) => response.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteText.classList.remove("active");
      authorName.classList.remove("active");
      quoteText.classList.add("in");
      authorName.classList.add("in");
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    utterance.lang = "en-US";
    utterance.voiceURI = "Google UK English Female";
    utterance.pitch = 0.9;
    utterance.rate = 0.9;
    synth.speak(utterance);

    setInterval(() => {
      !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
    }, 10);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);
