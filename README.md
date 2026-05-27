# visualTimer
This is a project I made for learning javascript. It's a no backend web timer that keeps track of money earned over time based on salary. It visualizes what you could buy with the earned money using AI generated images of products from one of a series of selectable item sets.

## Built in item sets
- McDonalds products from the US.
- Mercadona products (Spanish grocery store)

## Add a new itemSet

Follow all steps below so the new set appears and renders correctly. Copilot wrote these instructions so they are a little hard to follow sorry. Will fix when I have time.

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