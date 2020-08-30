// infinityscroll.js

// Create constants for HTML elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Support loading of images
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// array for fetched image batch
let photosArray = [];

// boolean for initial load condition
let isInitialLoad = true;

// Unsplash API use `` for template string to allow for embedded variables to be used
// size of fetched image batch
let imageCount = 5;
const apiKey = 'eKGid5P_utz9lh_xjo4ADnIWkYaoEOPSbuiNAyvU7R8';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

// adding a proxy to avoid the CORS error
//const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const proxyUrl = 'https://pacific-cliffs-73220.herokuapp.com/';

// Update apiUrl with new image count
function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
    console.log('imageCount now =', picCount); // test code; will be commented out later
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log('image loaded =', imagesLoaded); // test code; will be commented out later
    //console.log(imagesLoaded); // test code; will be commented out later

    // all images loaded
    if (imagesLoaded === totalImages) {
        ready = true;
        // only show loader first time
        loader.hidden = true;
        //imageCount = 30;
        //apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
        //console.log('imageCount =', imageCount); // test code; will be commented out later
        console.log('ready =', ready); // test code; will be commented out later
    }
}

// Helper Function to set element attributes on DOM Elements
// DRY - Don't Repeat Yourself
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create HTML elemenent for Links and Photos; add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images =', totalImages); // test code; will be commented out later
    
    // Run function for each object in photosArray using arrow function
    photosArray.forEach((photo) => {
        // Create an Anchor element <a> to link to Unsplash API server
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create Image element <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener: check when each is finished loading
        img.addEventListener('load', imageLoaded)

        // Put Image element <img> inside Anchor element <a>; then place both inside Div child element <div> class="image-container"
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        //const response = await fetch(proxyUrl + apiUrl);
        photosArray = await response.json();
        displayPhotos();

        if (isInitialLoad) {
            updateAPIURLWithNewCount(30);
            // reset boolean for initial load condition
            isInitialLoad = false;
        }
        //console.log(photosArray); // test code; will be commented out later
        //const data = await response.json(); // test code; will be commented out later
        //console.log(data); // test code; will be commented out later
    } catch (error) {
        // Catch error here
    }
}

// Check to see if user is scrolling near bottom of page; load more photos
// using the highest class in the DOM heirarchy (parent of HTML Document element)
// use and Arrow function
window.addEventListener('scroll', () => {
    //console.log('scrolled');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        //console.log('load more'); // test code; will be commented out later
    }
});

// On Load
getPhotos();