// infinityscroll.js


// Unsplash API use `` for template string to allow for embedded variables to be used
const count = 10;
const apiKey = 'VmqfLcDAq9Bu9KoV15jaWmjLFG3Ixr5MpiSPqpQQWMw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        // Catch error here
    }
}

// On Load
getPhotos();