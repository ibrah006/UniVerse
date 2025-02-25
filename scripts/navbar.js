// Navlinks
const navLinks = document.querySelector(".nav-links")

// Menu button to toggle menu visinility in small screens
const menuButton = document.getElementById("nav-menu");

// header with class navbar
const navbar = document.querySelector(".navbar");

// Mobile nav
const mobileNav = document.getElementById("nav-mobile");

window.addEventListener("resize", ()=> {
    main(false);
});

var smallScreen = false;

function main(onStart) {
    const width = window.innerWidth;

    // Special privilage for on start
    if (onStart) {
        console.log(`onStart: triggerred`)
        smallScreen = !(width <= 1110);
    } else {
        console.log(`not onStart: triggerred`)
    }

    if (width <= 1100 && !smallScreen) {
        smallScreen = true;
        // Small Screen / Mobile

        // Unhide the Menu button
        menuButton.classList.remove("hidden");

        // Switch Navlinks list to mobile version and hide, if (mobile navlinks) opened
        navLinks.classList.add("nav-links-small-screen-close");
        navLinks.classList.remove("nav-links-small-screen-open");
        navLinks.classList.add("small-screen");

        // Swicth navbar to mobile version
        navbar.classList.add("small-screen");

        // Remove navlinks from the desktop nav element
        const desktopNav = document.getElementById("nav-desktop");
        desktopNav.removeChild(navLinks);
        // And add navlinks to the mobile nav element
        mobileNav.appendChild(navLinks);

        // The menu button no press event lisener can also be placed inside this function 
        // but is placed outside for simplicity.
        // There won't be any unintended events as the button will be hidden when the screen is large enough
    } else if (width>1100 && smallScreen) {
        smallScreen = false;
        // Large Screen

        // Hide the Menu button
        menuButton.classList.add("hidden");

        navLinks.classList.remove("nav-links-small-screen-close");
        navLinks.classList.remove("nav-links-small-screen-open");
        navLinks.classList.remove("small-screen");

        navbar.classList.remove("small-screen");

        try {
            mobileNav.removeChild(navLinks);
        } catch(e) {}

        document.getElementById("nav-desktop").appendChild(navLinks);
    }
}

main(true);

menuButton.addEventListener("click", () => {
    console.log("menu button pressed");
    const isOpen = navLinks.classList.contains("nav-links-small-screen-open");
    if (isOpen) {
        navLinks.classList.remove("nav-links-small-screen-open");
        navLinks.classList.add("nav-links-small-screen-close");
        navbar.classList.add("open")
    } else {
        navLinks.classList.remove("nav-links-small-screen-close");
        navLinks.classList.add("nav-links-small-screen-open");
    }
});
