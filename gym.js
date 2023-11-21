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


    // gym REMINDER goes here
  })
  .catch(error => console.error('Error fetching data from Google Places API:', error));

function determineCrowdStatus(openingHours, currentTime) {
  // Check if opening hours are available
  if (openingHours && openingHours.weekday_text) {
    const currentDay = currentTime.getDay();
    const currentHour = currentTime.getHours();

    // Example: Check if it's a weekday and within a time range (adjust as needed)
    const isWeekday = currentDay >= 1 && currentDay <= 5; // Monday to Friday

    const isPeakHours = isWeekday && currentHour >= 17 && currentHour <= 19; // 5 PM to 7 PM

    return isPeakHours ? 'Busy Right now ' : 'Not crowded, Get in the gym';
  }

  // If opening hours are not available, return 'Crowd status not available'
  return 'Crowd status not available';
}


