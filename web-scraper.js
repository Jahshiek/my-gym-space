const puppeteer = require('puppeteer');

async function scrapeGoogleSearch(query) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the Google search page
  await page.goto(query);

  // Wait for the results to load (you might need to adjust the selector)
  await page.waitForSelector('.tcuWYc');

  // Wait for the graph elements to be present
  await page.waitForSelector('.xiXXie', { visible: true });

  // Extract data from the search results, targeting the graph element
  const results = await page.evaluate(() => {
    const graphs = Array.from(document.querySelectorAll('.xiXXie'));
    return graphs.map(graph => {
      // Extract relevant information from the graph element
      const dataHour = Number(graph.getAttribute('data-hour')); // Convert to an integer for comparison
      const dayOfWeek = graph.getAttribute('aria-label'); // Extract the day of the week

      // Determine if the gym is busy based on the value of data-hour, day of the week, and operating hours
      const isOpenHours =
        (dataHour >= 5 && dataHour <= 23) || (dataHour >= 7 && dataHour <= 19); // Adjust based on actual open hours
      const isBusy =
        isOpenHours &&
        (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday' || (dayOfWeek !== 'Friday' && dataHour >= 16 && dataHour <= 20)); // Adjust based on actual busy criteria

      return { dataHour, dayOfWeek, isBusy };
    });
  });

  console.log(results);

  // Close the browser
  browser.close();
}

// Invoke the function with the desired Google search URL
const googleSearchUrl = 'https://www.google.com/search?q=blink+farmers&oq=blink+farmers&gs_lcrp=EgZjaHJvbWUqCggAEAAY4wIYgAQyCggAEAAY4wIYgAQyDQgBEC4YrwEYxwEYgAQyCAgCEAAYFhgeMggIAxAAGBYYHjINCAQQABiGAxiABBiKBTIGCAUQRRg8MgYIBhBFGD0yBggHEEUYPNIBCDcwMDdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#ip=1';

// Call the function with the URL
scrapeGoogleSearch(googleSearchUrl);


//as youre iterating put all days in an objectscrape all the info from the resultant array