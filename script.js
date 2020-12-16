const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const buttonAerialCollection = document.getElementById('aerial-collection');
const imageInfoContainer = document.getElementById('image-info-container');
const imageTitleText = document.getElementById('image-title-text');
const imageDescriptionText = document.getElementById('image-description-text');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//unsplash API
const apiToken = 'Dny63d1ahp4bi9XVEE84qa6-_mAQq5jY24dehtVofqA';
const count = 10;
let collectionId;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiToken}&count=${count}&collections=${collectionId}`;

//Checking of images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }

}

//set Need attributes for blocks
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
     
    
    //for every object in array
    photosArray.forEach((photo) => {

        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });


        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
            width: 500,
            
            
        });

        const imagetext = document.createElement('p');
        setAttributes(imagetext, {
           text: photo.description,
        });
        //Event listner
        img.addEventListener('load', imageLoaded);     
        imageDescriptionText.appendChild(imagetext);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from API
async function getPhotos (){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray[1]);
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

function setCollection(id){
    collectionId = id;
}

//Check of scrolled
window.addEventListener('scroll', () => {
    //длина активного экрана + пройденная длина >= вся длина - 1000 рх
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

getPhotos();
