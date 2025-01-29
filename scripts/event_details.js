
import { events } from './database.js';

let link = document.createElement('link');
link.rel = "stylesheet";
link.href = "/css/event-details.css";
// Add this stylsheet link reference to the head element
// document.head.appendChild(link);


// Get hold of the event name/title that was passed in from events page
const urlParams = new URLSearchParams(window.location.search);
let eventName = urlParams.get("name");
eventName = eventName.replaceAll("%26", "&")
console.log(`from the frontend (params): ${eventName}`);

// const eventName = urlParams.get("name");
// const regex = /\/events\/([^\/]+)/;  // This matches '/events/{name}'
// const match = pathname.match(regex);

// let eventName;
// if (match && match[1]) {
//     eventName = match[1];
//     // Replace "%20" with white spaces
//     eventName = eventName.replaceAll("%20", " ");
//     console.log(`event name: ${eventName}`);
// }

// Set the event title in 'About ${EVENT_NAME}'
const aboutEventTitle = document.getElementById("about-event-title");
aboutEventTitle.innerText = `About ${eventName}`;

let eventImageSrc;

function onLoad() {

    console.log("front end from the event_details.js script test");

    const filteredEvents = events.filter(event=> {
        return event.title == eventName;
    });
    const event = filteredEvents[0];
    if (!event) {
        // redirect to a 404 page
        console.log("event not found");
        // TODO: Redirect to 404 not found page
        window.location.href = "404.html";
        return;
    }

    // Set the Event header message
    const headerMessage = document.getElementById("header-message");
    headerMessage.innerText = event.short_description;

    // Set the Event detials on the cards
    const detailTitles = ["datetime", "venue", "industry", "organizer"];
    for (const i in detailTitles) {
        const detailElement = document.getElementById(`${detailTitles[i]}-title`);
        console.log(`event detail (${i}): ${detailTitles[i]}-title`);
        if (detailElement) detailElement.innerText = event[detailTitles[i]];
    }

    eventImageSrc = `../assets/events/${event.img}`;

    console.log(`this is the path of cover img: ${eventImageSrc}`);

    const headerImage = document.getElementById("header-img");
    headerImage.src = eventImageSrc;

    // $('.addCoverImg').css("background-image", `url(${eventImageSrc})`)

    // take hold of the css stylesheet we're concerned with (css/event-details.css).
    let styleSheet = document.styleSheets[1];

    // Loop through all the rules in the first stylesheet
    // for (let i = 0; i < styleSheet.cssRules.length; i++) {
    //     let rule = styleSheet.cssRules[i];

    //     console.log(`rule.selectortext: ${rule.selectorText}`);

    //     // Modify the .addCoverImage class to take in the thumbnail of the event being viewed 
    //     if (rule.selectorText === '.addCoverImage') {
    //         rule.style.backgroundImage = eventImageSrc;
    //     }
    // }
}

onLoad();

// A function that is to be passed as callback to listen fo scroll events
// Manages the bottom scroll left

const BOTTOM_IGNORE_OFFSET = 110;

const scrollDownButton = document.getElementById("scroll-down-button");

scrollDownButton.addEventListener("click", ()=> {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
    })
})

function toggleScrollDownButtonVisibility(hide) {
    if (hide) {
        scrollDownButton.classList.add("hideElement");
    } else {
        scrollDownButton.classList.remove("hideElement");
    }
}

function getBottomScrollLeft() {
    const scrollTop = window.scrollY; // Current scroll position from the top
    const viewportHeight = window.innerHeight; // Height of the visible viewport
    const fullHeight = document.documentElement.scrollHeight; // Full height of the document

    // const offset = 50; // Offset (in pixels) from the bottom to trigger the event

    const bottomScrollLeft = fullHeight - viewportHeight - scrollTop;

    console.log(`bottom scroll left: ${bottomScrollLeft}`)

    return bottomScrollLeft;
}

function checkBottomScrollLeft() {
    const bottomScrollLeft = getBottomScrollLeft();
    // console.log(`bottomScrollLeft: ${bottomScrollLeft}`);
    if (bottomScrollLeft > BOTTOM_IGNORE_OFFSET) {
        toggleScrollDownButtonVisibility(false);
    } else {
        toggleScrollDownButtonVisibility(true);
    }
}

// <end> bottom scroll <end> //

// scroll on pressing the "Scroll to learn more" / chevron down icon
document.querySelector('#scroll-indicator').addEventListener('click', () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function changeNavbarItemsColor(color) {
    let navBar = document.getElementById("nav-items");

    navBar.querySelectorAll("*").forEach(child=> {
        if (!child.classList.contains("active")) {
            child.style.color = color;
        }
    })
}

function changeLogoColor(color) {
    document.getElementsByClassName("logo")[0].style.color = color;
}

const header = document.getElementById("header");
const main = document.getElementById("main");

let isScrolledDown = false;

// Listen to scroll event
window.addEventListener('scroll', async () => {

    // When scrolling down
    if (window.scrollY > 0) {

        isScrolledDown = true;

        if (window.scrollY >= 13) {
            changeNavbarItemsColor("#efefef");

            changeLogoColor("white");
        }

        // Shrink the main element's height as we scroll down
        main.classList.add("shrinking"); // Apply shrinking height animation
        header.classList.add("fixedHeader"); // Fix the header at the top

        // Hide the header children
        document.getElementById("header-elements").classList.add("hideElement");
        // the "learn more, chevron icon" are also part of header but they are outisde the actual header as their position fixed 
        // hiding the parent of the "learn more, chevron icon" elements
        document.getElementById("scroll-indicator").classList.add("hideElement")
        // remove the main element's top margin
        main.classList.add("margin-margin-zero")

        
        // Show the overlay for the navbar by removing the hideElement class
        document.querySelector(".overlay").classList.remove("hideElement");
        
        await delay(500);
    } else {

        changeNavbarItemsColor("#2E2B3A");
        changeLogoColor("#2E2B3A");
        // When scrolling back to the top, restore the main element's height
        main.classList.remove("shrinking"); // Remove shrinking height animation
        header.classList.remove("fixedHeader"); // Remove fixed header

        // show header child back
        document.getElementById("header-elements").classList.remove("hideElement");
        // show the scroll-indicator back (learn more & chevron icon)
        document.getElementById("scroll-indicator").classList.remove("hideElement")

        // (adding hideElement class to hide)
        // Hide the overlay for the navbar when scrolling up as it has absolute position
        document.querySelector(".overlay").classList.add("hideElement");

        // show the main element's top margin back
        // main.classList.remove("main-margin-zero")
    }

    // Actual tested values - diff header elements with diff heigh require different offsets
    if (window.scrollY >= 13) {
        document.getElementsByClassName("navbar")[0].classList.add("removePadding")
        header.classList.add("addCoverImg")
        header.style.backgroundImage = `url(${eventImageSrc})`;

        checkBottomScrollLeft();
    } else {
        document.getElementsByClassName("navbar")[0].classList.remove("removePadding")
        header.classList.remove("addCoverImg")
        header.style.backgroundImage = "unset";

        toggleScrollDownButtonVisibility(true);
    }
});

// Go to Register Page

const registerButtons = document.querySelector(".button.register");
registerButtons[i].addEventListener("click", goToRegisterPage);

function goToRegisterPage() {
    const eventNameTemp = eventName.replaceAll("&", "%26");
    window.location.href = `register.html?event=${eventNameTemp}`;
}