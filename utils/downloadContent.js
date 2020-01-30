const puppeteer = require('puppeteer');

module.exports = async function(url) {
    const browser = await puppeteer.launch({
        headless: true
    })

    const page = await browser.newPage();
    await page.setUserAgent("'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36'");
    await page.goto(url);

    return await page.content();
}
