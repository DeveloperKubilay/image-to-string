# image-to-string
Best auto image to text for windows

Installation:npm init -y && npm i puppeteer fs child_process
```js
var exec = require('child_process').exec
fs = require('fs')
puppeteer = require('puppeteer')
setTimeout = require('timers/promises').setTimeout
beautify = require('js-beautify').js
async function start() {
    console.log('Developed by kubi')
    try { await fs.unlinkSync("./image.png") } catch { }
    await exec(`Add-Type -AssemblyName System.Windows.Forms;[System.Drawing.Bitmap][System.Windows.Forms.Clipboard]::GetDataObject().getimage().Save('${__dirname + "\\image.png"}' , [System.Drawing.Imaging.ImageFormat]::Png)`, { 'shell': 'powershell.exe' })
    await setTimeout(2000)
    try { await fs.readFileSync("./image.png"); console.log("Please wait") } catch { console.log("Not found text"); process.exit(1); }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.bing.com/visualsearch",{waitUntil: 'load',timeout: 0});
    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click("#vsk_brtext"),
      ]);
    await fileChooser.accept([__dirname+"\\image.png"]);
    await setTimeout(5000);
   var text = await page.evaluate(() => document.querySelector("#text_container > textarea").innerHTML)
   text = text.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&")
   await fs.writeFileSync("text.txt", text);
   exec("start text.txt")
   await fs.writeFileSync("codetext.txt", beautify(text,{indent_size: 0, space_in_empty_paren: true})); 
   exec("start codetext.txt")
   await setTimeout(1000);
   process.exit(0);
} start()
```
