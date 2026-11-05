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

**Entry 1**
- I asked:
- The AI gave:
- What was wrong or missing:
- How I checked:

**Entry 2**
- I asked:
- The AI gave:
- What was wrong or missing:
- How I checked:

## 4. One thing I would improve next
