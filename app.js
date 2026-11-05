// Campus Lost & Found board
// First version generated with an AI assistant. The previous developer left before finishing it.

const API_KEY = "lf-demo-2086";
const DATA_URL = "items.json";

const board = document.querySelector("#board");
const message = document.querySelector("#message");

async function loadItems() {
  message.textContent = "Loading items...";
  const response = await fetch(DATA_URL + "?key=" + API_KEY);
  // FIX 2: response.json() gives a Promise, so I added await. Found it with console.log(data).
  const data = await response.json();
  render(data.results);
  message.textContent = "";
}

// FIX 6: data was put in as raw HTML, so <u>Yellow</u> became real underline.
// Found it by seeing item 7 underlined. esc() turns it into plain text.
function esc(value) {
  const d = document.createElement("div");
  d.textContent = value ?? "";
  return d.innerHTML;
}

function render(items) {
  board.innerHTML = items.map(item => `
    <div class="item ${item.claimed ? "claimed" : ""}">
      <!-- FIX 3: the data field is "name", not "label". Titles showed "undefined". -->
      <h3>${esc(item.name)}</h3>
      <!-- FIX 5: item 5 has no place, so it showed "undefined". Added a fallback text. -->
      <p>${esc(item.category)} · ${esc(item.place || "Place not recorded")}</p>
      <p class="date">Found on ${esc(item.date)}</p>
    </div>`).join("");
}

loadItems();