import { events } from './database.js';

const eventsContainer = document.getElementsByClassName("events-list")[0];

const goToEventDetails = (eventName)=> {
  console.log(`event detail: ${eventName}`);
  window.location.href = `event_details.html?name=${eventName}`;
}

events.forEach(event => {
  if (!event.img) {
    return;
  }
  // Create a card element for each event
  const eventCard = document.createElement('div');
  eventCard.classList.add('event-card');

  // Format the date
  const eventDate = new Date(event.datetime.replace("\n", " "))
  const formattedDate = eventDate.toLocaleString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
  });

  // Create the content for the card using template literals
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');
  cardContent.innerHTML = `
      <p class="event-date">${formattedDate}</p>
      <h3 class="event-title">${event.title}</h3>
      <p class="event-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
  `;

  // Attach the onclick listener to the card content div
  cardContent.addEventListener("click", () => {
    goToEventDetails(event.title);
  });

  // Append the content and image to the event card
  eventCard.appendChild(cardContent);
  const eventImage = document.createElement('img');
  // eventImage.classList.add();
  if (event.img) {
    eventImage.src = `../assets/events/${event.img.replace("%7D", "")}`;
  }
  eventImage.alt = `${event.title} Thumbnail`;
  eventCard.appendChild(eventImage);

  // Append the event card to the container
  eventsContainer.appendChild(eventCard);
});


