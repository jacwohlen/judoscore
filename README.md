# Judo score board

A full Judo scoreboard software in a *single HTML file*.
Open it from the hosted page (always the latest version, works offline after the first visit) or just open score.html locally in your webbrowser. The ressource folder is for convenience only.
Optionally you can use a Google Spreadsheet to add data automaticly to your scoreboard. With each reload (shortcut: r) data is fetched from your spreadsheet. It displays data of the first fight which has  `done == false`.

![screenshot](google_sheet.png?raw=true "Example view")

![screenshot](scoreboard.png?raw=true "Example view")

## Hosted version (recommended)
The scoreboard is published with GitHub Pages on every push to `master`:

https://jacwohlen.github.io/judoscore/

- **Always up to date:** no local copy to update, just open the URL.
- **Works offline:** on the first visit (with internet) the browser keeps a copy of the page. If the internet connection is lost, the page still loads, also when pressing refresh. Open the URL once on each scoreboard computer before the event.
- **Fight survives reload:** points, shidos, times and names are saved in the browser on every change. After a reload the fight continues; the clocks are stopped, continue with Hajime. Press R to start the next fight.
- Chrome/Edge offer to install it as an app (install icon in the address bar), which opens it fullscreen.

Publishing (one-time setup): repository Settings → Pages → Source: "GitHub Actions". The workflow `.github/workflows/pages.yml` then deploys on every push to `master`.

## HW-setup
The software was designed to operate in "duplicate-screen"-setup, so that the operator sees the same as the audience. 

## Configuration
On first start or by navigating to the setting menu (gear icon in bottom-left corner), the configuration dialogue is opened.

## Operating
A brief usage description is included in the menu. Points are assigned via mouse control, but there are also various shortcuts to control clocks, etc.

## Google Sheets configuration
To get data off a sheet you have to do following steps.

1. Copy [this Google Sheet template](https://docs.google.com/spreadsheets/d/1hddz-5w_Wb4MR8uZh4Q7mzHyleLJMmjpHnPbzbc-nzU/edit?usp=sharing), or create your own. It has to have following Columns to have all features. Other Columns can be added but don't have any impact on the scoreboard.

| Header | Info | Example |
| ----------- | ----------- | ----------- |
| whitename | Name of white fighter | Pinkman Jessy |
| redname | Name of blue figther | White Walter |
| done | Checkbox or true/false, mark if fight is done/over | true |
| groupname | Name of group | MU +100 kg |
| roundname | Name of round | Semi-Final |

2. Make sure your Sheet is set to share with "anyone with link".

3. Open the config menu (gear icon or key C), paste the sheet URL (or its ID) and the sheet tab name in section "Google Sheet", and click Save. Settings are kept in the browser.

4. To set up further scoreboards with the same sheet, copy the "Share link" from the config menu and open it on each scoreboard computer, e.g.
   `https://jacwohlen.github.io/judoscore/?sheetId=<sheet ID>&sheetName=Mat%201` (optional `&apiKey=<key>`).
   With several mats use one sheet tab per mat and change `sheetName` per link.

Defaults can still be set in the variables `spreadSheetId`, `sheet`, `apiKey` and `gsx2json` at the top of score.html, e.g. for an own copy.

I highly suggest you use a Google Developer API key. For more information visit [GSX2JSON](https://gsx2json.com/).

## GSX2JSON
This project currently relies on the use of GSX2JSON. It's an easy to use api, that fetches Google Sheet data and presents it as json.

As the developer Nick Moreton on his product page writes:

> Please do not use this hosted version for anything important. I am not able to quickly react if Google updates their API, or if the Heroku app crashes. If you want to use this for something important, I suggest Self Hosting.

For more information head over to [GSX2JSON](https://gsx2json.com/).

## Own bell / horn / audio samples
Own audio files can be added in base64 embedded form <audio id="sound[n]" src="data:audio/ogg;base64,...>

## Licence
Free usage and modification for non-commercial use. 
(c) 2019 https://github.com/tuxmike/
