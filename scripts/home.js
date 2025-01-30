import { events } from './database.js';

const eventTitle = document.querySelector(".event-title");
const eventDateElement = document.querySelector(".event-date");

function getMostRecentUpcomingEvent(events) {
  // Get the current date and time
  const currentDate = new Date();

  // Parse the datetime of each event and filter out past events
  const upcomingEvents = events
    .map(event => {
      // Split the datetime string into date and time parts
      const [date, time] = event.datetime.split("\n");
      const [month, day, year] = date.split("-");  // Change to month-day-year format
      const [hour, minute, period] = time.split(/[: ]/); // Split time into hour, minute, and period
      let hours = parseInt(hour, 10);
      const minutes = parseInt(minute, 10);

      // Adjust hours based on am/pm
      if (period.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12;
      } else if (period.toLowerCase() === 'am' && hours === 12) {
        hours = 0;  // Midnight case (12 AM is 00:00 in 24-hour time)
      }

      // Create a new Date object for the event's datetime
     const eventDate = new Date(year, month - 1, day, hours, minutes);

      // Return the event along with its parsed Date object
      return { ...event, eventDate };
    })
    .filter(event => event.eventDate > currentDate)  // Filter out past events
    .sort((a, b) => a.eventDate - b.eventDate);  // Sort events by date

  // Return the most recent upcoming event, or null if no upcoming events
  let upcomingEventWithImg;
  for (const i in upcomingEvents) {
    if (upcomingEvents[i].img) {
      upcomingEventWithImg = upcomingEvents[i];
      break;
    }
  }
  return upcomingEventWithImg;
}

function formatDate(date) {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  // Return the formatted date as "MONTHNAME DD, YYYY"
  return `${monthName} ${day}, ${year}`;
}

// Example usage:
const mostRecentEvent = getMostRecentUpcomingEvent(events);

if (mostRecentEvent) {
  // Log the event title and its formatted date
  eventDateElement.innerHTML = formatDate(mostRecentEvent.eventDate);
  eventTitle.innerHTML = mostRecentEvent.title;
  console.log(`most recent event img: ../assets/events/${mostRecentEvent.img}`);
  // TODO: FIx this
  document.getElementById("header-parent").style.backgroundImage = `../assets/events/${mostRecentEvent.img}`;
  
} else {
  console.log("No upcoming events.");
}


// Event Timer / Time box Management

const eventDate = mostRecentEvent.eventDate;

function formatTime(time) {
    if (Number(time) < 10) {
        return `0${time}`;
    }
    return time;
}

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = formatTime(days);
    document.getElementById("hours").textContent = formatTime(hours);
    document.getElementById("minutes").textContent = formatTime(minutes);
    document.getElementById("seconds").textContent = formatTime(seconds);

    if (distance < 0) {
        clearInterval(countdown);
        document.querySelector(".countdown").textContent = "Event Started";
    }
}, 1000);


// handle register

const titleFormattedForUrlParams = mostRecentEvent.title.replace("&", "%26");
const registerButton = document.querySelector(".register.button");
registerButton.addEventListener("click", ()=> {
  window.location.href = `pages/register.html?event=${titleFormattedForUrlParams}`;
});

const learnMoreButon = document.querySelector(".learn-more.button");
learnMoreButon.addEventListener("click", ()=> {
  window.location.href = `pages/event_details.html?name=${titleFormattedForUrlParams}`;
});