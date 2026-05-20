# visualTimer
visualTimer is a light weight timer web app that calculates your earnings over time based on your salary and displays a set of items you could purchase with those earnings.

## Features

- Live timer and earnings display
- Multiple selectable item sets (dropdown)
- Automatic purchases based on earned balance
- Visual inventory rendering with per-item images
- Simple CSV-driven content system for custom catalogs

## Tech stack

- Vanilla JavaScript (ES modules)
- HTML/CSS + Bootstrap
- PapaParse (CSV parsing)

## Repository structure

- `/main.html` – app entrypoint
- `/main.js` – global state and event wiring
- `/timer.js` – timer logic and salary handling
- `/purchase.js` – purchase decision logic
- `/render.js` – DOM rendering (items/timer)
- `/setup.js` – item set loading and CSV parsing
- `/itemSets` – item catalog sources (`.csv`, `itemSets.json`)
- `/images/<itemSetName>` – item images used by each catalog
- `/audio` – sound effects

## Run locally

Because the app fetches CSV/JSON files, run it with a local web server (not directly as a `file://` page).

Example:

```bash
cd path/to/visualTimer
python3 -m http.server 8000
```

Then open: `http://localhost:8000/main.html`

## Add a new itemSet

Follow all steps below so the new set appears and renders correctly.

1. **Create the CSV**
   - Path: `/itemSets/<itemSetName>.csv`
   - Required header: `name,price`
   - Add one row per item.
   - Example row: `Big Mac,8.39`

2. **Create the images folder**
   - Path: `/images/<itemSetName>/`
   - Add one `.webp` image per CSV item.
   - `.webp` is required by the app (`render.js` builds image paths using the pattern {itemName}.webp).
   - **Image filename must exactly match the item `name` in the CSV** (including spaces, punctuation, and capitalization).
   - Example: item name `Big Mac` -> image `/images/<itemSetName>/Big Mac.webp`

3. **Register the itemSet**
   - Edit `/itemSets/itemSets.json`
   - Add `"<itemSetName>"` to the JSON array.
   - The first entry is selected by default at app startup.

4. **Reload the app**
   - Restart/refresh your local server page and select the new set from the dropdown.

## Notes

- CSV prices are parsed as numbers.
- Items are sorted by price and internally grouped into cheap/normal/expensive buckets for purchase selection:
  - first 30% of sorted items -> `cheap`
  - next 30% -> `normal`
  - remaining 40% -> `expensive`
  - items are assigned by position in the sorted list, with boundaries at 30% and 60% of total item count
  - example with 10 items (sorted): indexes `0-2` cheap, `3-5` normal, `6-9` expensive
- Missing or mismatched image names will cause broken item images in the UI.
