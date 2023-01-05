var exec = require('child_process').exec
fs = require('fs')
puppeteer = require('puppeteer')
setTimeout = require('timers/promises').setTimeout;
async function start() {
    console.log('Developed by kubi')
    try { await fs.unlinkSync("./image.png") } catch { }
    await exec(`Add-Type -AssemblyName System.Windows.Forms;[System.Drawing.Bitmap][System.Windows.Forms.Clipboard]::GetDataObject().getimage().Save('${__dirname + "\\image.png"}' , [System.Drawing.Imaging.ImageFormat]::Png)`, { 'shell': 'powershell.exe' })
    await setTimeout(2000)
    try { await fs.readFileSync("./image.png"); console.log("Yazıya çeviriliyor") } catch { console.log("Yazı bulunamadı"); process.exit(1); }
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
   console.log(text);
   await fs.writeFileSync("text.txt", text); 
   exec("start text.txt")
   await setTimeout(2000);
   process.exit(0);
} start()
