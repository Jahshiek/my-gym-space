const puppeteer = require('puppeteer');

const url = 'https://locations.blinkfitness.com/ny/queens/130-20-farmers-blvd';

async function scrapeInformation(url) {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();

  await page.goto(url);

  // Use XPath to select the element
  const [element] = await page.$x('//*[@id="main"]/div[5]/div[5]/div/div/div[4]/button/div/div[1]/div/img');

  // Check if the element is found
  if (element) {
    const src = await element.getProperty('src');
    const srcStr = await src.jsonValue();
    console.log({ srcStr });
  } else {
    console.log('Element not found.');
  }

  browser.close();
}

scrapeInformation(url);
