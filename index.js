var Tesseract = require('tesseract.js'), fs = require('fs'), exec = require('child_process').exec, spawn = require('child_process').spawn, setTimeout = require('timers/promises').setTimeout;
async function start() {
    console.log('Developed by kubi')
    try { await fs.unlinkSync("./image.png") } catch { }
    await exec(`Add-Type -AssemblyName System.Windows.Forms;[System.Drawing.Bitmap][System.Windows.Forms.Clipboard]::GetDataObject().getimage().Save('${__dirname + "\\image.png"}' , [System.Drawing.Imaging.ImageFormat]::Png)`, { 'shell': 'powershell.exe' })
    await setTimeout(2000)
    try { await fs.readFileSync("./image.png"); console.log("Yazıya çeviriliyor") } catch { console.log("Yazı bulunamadı"); process.exit(1); }
    Tesseract.recognize('./image.png', 'eng',).then(async ({ data: { text } }) => {
        await fs.writeFileSync("text.txt", text); exec("start text.txt")
        spawn('clip').stdin.end(text);
        await setTimeout(2000)
        process.exit(0);
    })
} start()
