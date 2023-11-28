const apiKey = require('./config').SECRET_API_KEY;

const placeId = 'ChIJZcDpM7pnwokRWfuuVQOFR6s';
const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,geometry,formatted_address,opening_hours&key=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Extract information about the gym
    const name = data.result.name;
    const geometry = data.result.geometry;
    const formattedAddress = data.result.formatted_address;
    const openingHours = data.result.opening_hours;

    // Now you have the details, including opening hours

    // Check crowd status at the current time and proceed with the reminder system
    const currentTime = new Date();
    const crowdStatusNow = determineCrowdStatus(openingHours, currentTime);
    console.log('Crowd Status Now:', crowdStatusNow);

    // Need to check crowd status at times with peak in the variable name


    // GYM REMINDER GOES HERE

  })
  .catch(error => console.error('Error fetching data from Google Places API:', error));

function determineCrowdStatus(openingHours, currentTime) {
  // Check if opening hours are available
  if (openingHours && openingHours.weekday_text) {
    const currentDay = currentTime.getDay();
    const currentHour = currentTime.getHours();

    // Example: Check if it's a weekday and within a time range (adjust as needed) this is just a place holder time as im still figuring out how to webscrape information from a graph
    // and theres no way to get occupancy data currently from my own gym
    // const isWeekday = currentDay >= 1 && currentDay <= 5; // Monday to Friday

    // const isPeakHours = isWeekday && currentHour >= 17 && currentHour <= 19; // 5 PM to 7 PM

    // return isPeakHours ? 'Busy Right now ' : 'Not crowded, Get in the gym';
  }

  // If opening hours are not available, return 'Crowd status not available'
  // return 'Crowd status not available';
}


/*
1. so you can fetch data from the places api but there is no occupancy/usage data
2. you intended to use static value ranges
3. instead we could use the data from that graph at ur gym
  -web scrape that data but how are you going to scrape data from a live graph
  -can i even webscrape from a live graph
4. after we scrape the data then we can create the gym reminder and use the information from the graph and push the information to the user through email/firebase
  -
5.  Learn to automate that with lambda

*/
