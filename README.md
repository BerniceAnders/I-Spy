# I Spy Touch Game

A touch-friendly hidden-object game built from the 12 I Spy pages created in the ChatGPT conversation.

## What it does

- Opens on a large **PLAY** screen.
- Chooses a random scene.
- A tap only counts when it lands on the configured object/character hit area.
- Each successful find places a green check over the matching icon at the bottom of the image.
- When everything is found, a **YAY!** celebration and confetti appear.
- The next scene loads automatically.
- Scenes do **not repeat until every scene has been played**. The remaining shuffle is saved in local storage when the browser allows it.
- No external libraries, fonts, APIs, or network calls are needed for gameplay.

## GitHub Pages setup

1. Create a new GitHub repository.
2. Upload the **contents of this folder** to the repository root (so `index.html` is at the root).
3. In GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. Open the GitHub Pages URL on the iPad in Safari at least once while online.
7. Use **Share → Add to Home Screen**.

The included service worker caches the game and all 12 scene images. After the first successful load, the Home Screen version is designed to keep working without an internet connection.

## Playing from local files on an iPad

The project itself is fully self-contained and uses relative file paths. A desktop browser can open `index.html` directly.

On iPadOS, the Files app may preview an HTML file instead of running a multi-file web app with JavaScript. For the most reliable iPad experience, use the GitHub Pages + **Add to Home Screen** method above; after the first load, it behaves like an offline app.

A second file, `offline-standalone.html`, is also included. It contains the CSS, JavaScript, and all 12 scene images inside one HTML file, so it has no companion-file dependencies. If your iPad/browser/app allows local HTML execution, that is the easiest file to copy directly to the device.

## Parent/debug mode

The clickable areas are stored in `scenes.js` and can be adjusted without changing the game logic.

When the game is hosted, add `?debug=1` to the end of the URL, for example:

`https://YOURNAME.github.io/YOUR-REPO/?debug=1`

Debug mode draws the tap circles over the scenes and prints the source-image coordinates of taps to the browser console. Remove `?debug=1` for normal play.

For parent testing, you can also open a specific scene immediately with:

`?autoplay=1&scene=sk-original&debug=1`

Valid scene IDs are listed in `scenes.js`.

All scenes use a source coordinate system of **1122 × 1402** pixels.

## Note about the Farm scene

The generated farm artwork appears to have rendered the requested yellow chick as the chicken in the coop. The `chick` touch target is therefore centered on that bird so the page remains completable. Everything else is mapped directly to the intended visible item/character.


## v3 compatibility update

This build uses JPEG scene files instead of WebP for broader iPad/Safari compatibility. It also resolves scene URLs relative to the page location and uses a refreshed service-worker cache (`v3-jpg`). If replacing an older GitHub Pages build, upload **all** files from this folder, then refresh the site once or twice so the new service worker activates.
