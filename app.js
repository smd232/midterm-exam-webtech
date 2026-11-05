// Campus Lost & Found board
// First version generated with an AI assistant. The previous developer left before finishing it.

// Removed API_KEY: a key in front-end code is not secret and a static file does not need it.
const DATA_URL = "items.json";

const board = document.querySelector("#board");
const message = document.querySelector("#message");
const count = document.querySelector("#count");
const searchBox = document.querySelector("#search");
const categorySelect = document.querySelector("#category");

let allItems = []; // every item from the file, never changed after loading

// FIX 6: data was put in as raw HTML, so <u>Yellow</u> became real underline.
// Found it by seeing item 7 underlined. esc() turns it into plain text.
function esc(value) {
  const d = document.createElement("div");
  d.textContent = value ?? "";
  return d.innerHTML;
}

// "KEYS", "keys" and " Keys " all become the same key: "keys"
function categoryKey(item) {
  return String(item.category ?? "").trim().toLowerCase();
}

// Nice label for display: "keys" -> "Keys"
function categoryLabel(key) {
  return key ? key.charAt(0).toUpperCase() + key.slice(1) : "Uncategorised";
}

function render(items) {
  board.innerHTML = items.map(item => `
    <div class="item ${item.claimed ? "claimed" : ""}">
      <h3>${esc(item.name)}</h3>
      <p>${esc(categoryLabel(categoryKey(item)))} · ${esc(item.place || "Place not recorded")}</p>
      <p class="date">Found on ${esc(item.date || "date not recorded")}</p>
    </div>`).join("");
}
// FIX 3: the data field is "name", not "label" (titles showed "undefined").
// FIX 5: item 5 has no place, so I show "Place not recorded" instead of "undefined".

// Build the dropdown from the data, each category once.
function buildCategories() {
  const keys = [...new Set(allItems.map(categoryKey))].sort();
  categorySelect.innerHTML = "";

  const all = document.createElement("option");
  all.value = "all";
  all.textContent = "All categories";
  categorySelect.appendChild(all);

  keys.forEach(key => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = categoryLabel(key); // textContent is safe
    categorySelect.appendChild(option);
  });
}

// Apply search + category together, then show the cards, count and messages.
function update() {
  const query = searchBox.value.trim().toLowerCase();
  const chosen = categorySelect.value;

  const shown = allItems.filter(item => {
    const nameMatches = String(item.name ?? "").toLowerCase().includes(query);
    const categoryMatches = chosen === "all" || categoryKey(item) === chosen;
    return nameMatches && categoryMatches;
  });

  render(shown);
  count.textContent = `Showing ${shown.length} of ${allItems.length}`;
  message.textContent = shown.length === 0
    ? "No items match your search. Try a different word or category."
    : "";
}

async function loadItems() {
  message.textContent = "Loading items...";
  count.textContent = "";
  board.innerHTML = "";

  try {
    const response = await fetch(DATA_URL);

    // Case (a): server answered, but with an error such as 404
    if (!response.ok) {
      const err = new Error("Server error");
      err.status = response.status;
      throw err;
    }

    // FIX 2: response.json() gives a Promise, so I added await. Found it with console.log(data).
    const data = await response.json();

    if (!Array.isArray(data.results)) {
      throw new Error("Unexpected data format");
    }

    allItems = data.results;
    buildCategories();
    update();
  } catch (error) {
    console.error(error);
    board.innerHTML = "";
    count.textContent = "";

    if (error.status) {
      // Case (a)
      message.textContent =
        `Sorry, the list could not be loaded (error ${error.status}). Please try again later.`;
    } else if (error instanceof TypeError) {
      // Case (b): fetch itself failed, so there is no connection
      message.textContent =
        "Could not connect. Please check your internet connection and try again.";
    } else {
      message.textContent = "Sorry, something went wrong while reading the list. Please try again later.";
    }
  }
}

searchBox.addEventListener("input", update);
categorySelect.addEventListener("change", update);

loadItems();