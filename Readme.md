# Lost & Found Board: Hand-over notes

**Name:**            **Roll No.:**            **Variant:** C

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
Write 3 to 5 lines in your own words.

## 3. AI log (at least 2 entries)
For each entry: what I asked, what the AI gave me, **what was wrong or missing**, and **how I checked it**.

## 3. AI log (at least 2 entries)

**Entry 1**
- I asked: I shared index.html, app.js, style.css and items.json plus the console error, and asked the AI to help me find the six faults in the starter page.
- The AI gave: a list of faults in the order they appear (script without defer, missing await, item.label instead of item.name, a CSS rule overriding the claimed style, a missing place in the data, and raw HTML being inserted) with a short fix for each.
- What was wrong or missing: it did not say exactly where in the file fixes 5 and 6 go, so I could not find them at first. It also mentioned the fixed widths and the API key, which may or may not be among the six, so I had to decide myself how to log them.
- How I checked: I reloaded the page after each fix. I used console.log(data) to see the Promise, looked at the claimed cards in DevTools, and checked that item 5 and item 7 displayed correctly.

**Entry 2**
- I asked: for the full render function and the exact line changes for fixes 5 and 6, then for short FIX comments to add to my code.
- The AI gave: a complete render function with an esc() helper and a fallback for place, then my code with comments added, including two HTML comments inside the template string.
- What was wrong or missing: HTML comments inside the template string would be copied into the page for every card, which is messy. I moved my comments out of the template and used normal // comments instead. The AI also left the API key line in my file even though it said to remove it.
- How I checked: I opened the page and viewed the page source in DevTools to make sure no stray comments were being repeated on each card, and I checked item 7 showed the text <u>Yellow</u> raincoat with no underline.

## 4. One thing I would improve next
I will delete the API key (API_KEY and the ?key= part of the fetch). A key in front-end code is visible to anyone who opens DevTools, so it is not secret, and a static items.json does not need one. If the Security Office ever needs real protection, it should be done on the server, not in this page.
