const puppeteer = require('puppeteer');

const url = 'https://www.amazon.com/roborock-Auto-Drying-Self-Refilling-Self-Emptying-Avoidance/dp/B0BVVSTJWS?ref_=Oct_DLandingS_M_679161dd_0';

async function scrapeInformation(url) {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();

  await page.goto(url);

  // Use XPath to select the element
  const [element] = await page.$x('//*[@id="main-image"]');

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


// function scrapeMultiple() {
//     // Example URLs and XPaths
//     const locations = [
//       {
//         url: 'https://locations.blinkfitness.com/ny/queens/130-20-farmers-blvd',
//         xpath: '//*[@id="main"]/div[5]/div[5]/div/div/div[4]/button/div/div[1]/div/img',
//       },
//       {
//         url: 'https://locations.blinkfitness.com/ny/queens/130-20-farmers-blvd',
//         xpath: '//*[@id="main"]/div[5]/div[5]/div/div/div[4]/button/div/div[1]/div/img',
//       },
//       //*[@id="main-image"]
//     ];
  
//     // Scrape information for each location
//     for (const location of locations) {
//       console.log(`Scraping information for: ${location.url}`);
//       scrapeInformation(location.url, location.xpath);
//     }
//   }
  
//   // Run the function
//   scrapeMultiple();

// const puppeteer = require('puppeteer');

// async function scrapeInformation(url, xpath) {
//   const browser = await puppeteer.launch({
//     headless: 'new'
//   });
//   const page = await browser.newPage();

//   await page.goto(url);

//   // Use XPath to select the element
//   const [element] = await page.$x(xpath);

//   // Check if the element is found
//   if (element) {
//     const src = await element.getProperty('src');
//     const srcStr = await src.jsonValue();
//     console.log({ srcStr });
//   } else {
//     console.log('Element not found.');
//   }

//   browser.close();
// }

// function scrapeMultiple() {
//   // Example URLs and XPaths
//   const thingsToBeScraped = [
//     {
//       url: 'https://locations.blinkfitness.com/ny/queens/130-20-farmers-blvd',
//       xpath: '//*[@id="main"]/div[5]/div[5]/div/div/div[4]/button/div/div[1]/div/img',
//     },
//     {
//       url: 'https://www.amazon.com/roborock-Auto-Drying-Self-Refilling-Self-Emptying-Avoidance/dp/B0BVVSTJWS?ref_=Oct_DLandingS_M_679161dd_0',
//       xpath: '//*[@id="main-image"]',
//     }
//   ];

//   // Scrape information for each location
//   for (const things of thingsToBeScraped) {
//     console.log(`Scraping information for: ${thingsToBeScraped.url}`);
//     scrapeInformation(thingsToBeScraped.url, thingsToBeScraped.xpath);
//   }
// }

// // Run the function
// scrapeMultiple();

