# Lost & Found Board: Hand-over notes

**Name:** Syeda Maryam            **Roll No.:** 006          **Variant:** C

## 1. Fault log (Part 1)
| # | What I saw | What was wrong | How I found it |
|---|------------|----------------|----------------|
| 1 | Blank page. Console error: cannot set properties of null (setting 'textContent'). | The script was in the head without defer, so it ran before #message existed. | Read the error line in the console (app.js:11), then checked where the script tag was. |
| 2 | Page still empty after fix 1, with an error about data.results. | response.json() was not awaited, so data was a Promise. | Used console.log(data) and saw Promise {pending}. |
| 3 | Cards showed "undefined" as the title. | The code used item.label but the data field is name. | Compared app.js with items.json. |
| 4 | Claimed items looked the same as unclaimed ones. | The rule "#board .item" is stronger than ".item.claimed", so it overrode the grey style. | Inspected a claimed card in DevTools and saw the claimed styles crossed out. |
| 5 | The Red cap card said "Clothing · undefined". | That record in items.json has no place, and I cannot edit the file. | Looked through the JSON and found item 5 had no place. |
| 6 | The "Yellow raincoat" title was underlined. | The name contains HTML (<u>) and innerHTML ran it as markup. This is also a security risk. | Noticed the underline, then saw <u> in the JSON name. I added esc() to show it as text. |

## 2. What I built (Parts 2 to 4)
I fixed the six faults, then added a search box that filters by name without caring about capital letters. The category dropdown is built from the data, and KEYS and Keys become one option. A "Showing X of N" line stays correct with search, category and the tickbox together. I added loading, empty and error messages (404 and no connection), and item text is escaped so the data cannot change the page, with "Place not recorded" for missing places. For phones I added the viewport tag, a wrapping layout, 44px inputs and Claimed / Still waiting badges. For the client's change I added a "Hide claimed items" tickbox and list unclaimed items first.

## 3. AI log (at least 2 entries)
For each entry: what I asked, what the AI gave me, **what was wrong or missing**, and **how I checked**.

**Entry 1**
- I asked: I shared index.html, app.js, style.css and items.json plus the console error, and asked the AI to help me find the six faults.
- The AI gave: the faults in the order they appear (script without defer, missing await, item.label instead of item.name, a CSS rule overriding the claimed style, a missing place in the data, and raw HTML being inserted) with a short fix for each.
- What was wrong or missing: it did not say exactly where fixes 5 and 6 go in the file, so I could not find them and had to ask again. It also mentioned the fixed widths and the API key without saying whether they were among the six, so I decided myself how to log them. Its first code also left the API key in app.js.
- How I checked: I reloaded the page after each fix. I used console.log(data) to see the Promise, looked at a claimed card in DevTools, and checked that item 5 and item 7 displayed correctly.

**Entry 2**
- I asked: for short FIX comments in my code, and then for the search, category, count, loading, empty and error features for Part 2.
- The AI gave: my code with comments added, and a full app.js with all the Part 2 features plus a test table.
- What was wrong or missing: it first put HTML comments inside the template string, which would be copied into every card, so I moved them out as // comments. It also could not run the code, so it could not prove the features worked. I tested them myself.
- How I checked: I tested search, category and the count together, then changed DATA_URL to a wrong file name for the 404 case and to the .invalid address for the no-connection case, then changed it back.

**Entry 3**
- I asked: for the phone layout (Part 3) and then the Hide claimed items tickbox (Part 4).
- The AI gave: a new style.css, a badge in render(), and a checkbox with an updated update() function.
- What was wrong or missing: the CSS rule for `.controls input` also styled the checkbox, so it became huge and sat in the wrong place. I saw this in my own screenshot. It was fixed by targeting only `input[type="text"]`. I also typed "electronics" in the search box and got 0 results. That is correct, because the search is by name only, but the AI had not made that clear.
- How I checked: I looked at the page at full width and at 375 px, and tried the tickbox with search and category in different combinations.

## 4. One thing I would improve next
I deleted the API key (API_KEY and the ?key= part of the fetch). A key in front-end code is visible to anyone who opens DevTools, so it is not secret, and a static items.json does not need one. If the Security Office ever needs real protection, it should be done on the server, not in this page.