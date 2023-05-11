var exec = require('child_process').exec
fs = require('fs')
puppeteer = require('puppeteer')
setTimeout = require('timers/promises').setTimeout
async function start() {
    console.log('Developed by kubi')
    try { await fs.unlinkSync("./image.png") } catch { }
    await exec(`Add-Type -AssemblyName System.Windows.Forms;[System.Drawing.Bitmap][System.Windows.Forms.Clipboard]::GetDataObject().getimage().Save('${__dirname + "\\image.png"}' , [System.Drawing.Imaging.ImageFormat]::Png)`, { 'shell': 'powershell.exe' })
    await setTimeout(2000)
    try { await fs.readFileSync("./image.png"); console.log("Please wait") } catch { console.log("Not found text"); process.exit(1); }
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://images.google.com",{waitUntil: 'load',timeout: 0});
    await page.waitForSelector('div > div > div > div:nth-child(10)');
    await page.click("div > div > div > div:nth-child(10)")
    await page.waitForSelector('c-wiz > div > div > div > div > div > div > span'); 
    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.evaluate(() => document.querySelector("c-wiz > div > div > div > div > div > div > span").click())
      ]);
    await fileChooser.accept([__dirname+"\\image.png"]);
    await setTimeout(7000);
    await page.evaluate(() => document.querySelector("#ucj-4 > span").click())
    await setTimeout(3000);
    await page.evaluate(() => document.querySelector("c-wiz > div > div > div > div > div > div > div > div > div > div > button").click())
    await setTimeout(5000);
    var text = await page.evaluate(()=>
    (document.querySelector("c-wiz > div > div > div > c-wiz > div > div > div > div > span > div > div:nth-child(2)").innerHTML)
    .replace('"', '').replace('"', '').replaceAll("&gt;",">").replaceAll("&lt;","<").replaceAll("&amp;","&"))
   await fs.writeFileSync("text.txt", text);
   exec("start text.txt")
   await setTimeout(2000);
   process.exit(0);
} start()
