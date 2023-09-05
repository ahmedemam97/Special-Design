let mainColor = localStorage.getItem('color_option');

if (mainColor != null) {
    document.documentElement.style.setProperty('--main-color', mainColor);

    document.querySelectorAll('colors-list li').forEach(element => {
        element.classList.remove('active');
        
        //Add Active Class On Element With Data Color === Local Storage Item
        if (element.dataset.color === mainColor) {
            element.classList.add('active');
        }
    });
}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem('background_option');

// Check If Random Background Local Storage Is Not Empty
if(backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;

        document.querySelector('.random-backgrounds .yes').classList.add('active');
        
    }else{

        backgroundOption = false;

        document.querySelector('.random-backgrounds .no').classList.add('active');

    }

    document.querySelectorAll('.random-backgrounds span').forEach(element => {
        element.classList.remove('active');
    });
}

// Toggle Spin Class On Icon 
document.querySelector('.toggle-settings .fa-gear').onclick = function () {
    // Toggle Class fa-spin For Rotation On Self
    this.classList.toggle('fa-spin');

    // Toggle Class Open On Main Settings Box
    document.querySelector('.settings-box').classList.toggle('open');
};

// Switch Colors
const colorsLi = document.querySelectorAll('.colors-list li');

colorsLi.forEach(li => {

    li.addEventListener('click', (e) => {
        // Set Color On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // Set Color In Local Storage
        localStorage.setItem('color_option', e.target.dataset.color)
        // console.log(localStorage.getItem('color_option'));

        handleActive(e);
    });
});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll('.random-backgrounds span');

randomBackEl.forEach(span => {

    span.addEventListener('click', (e) => {

        handleActive(e);

        if(e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();

            localStorage.setItem('background_option', true);
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('background_option', false);
        }
    });
});


// Select Landing Page Element 
let landingPage = document.querySelector('.landing-page');
// Get Array Of Images
let imgsArray = ['image-1.jpg', 'image-2.webp', 'image-3.jpg', 'image-4.png', 'image-5.jpg'];

// Function To Randomize Imgs
function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(()=> {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // Change Backgound Image Url
            landingPage.style.backgroundImage = `url("images/${imgsArray[randomNumber]}")`;
        }, 10000);
    }
}

randomizeImgs();



// Select Skills Selector

let ourSkills = document.querySelector('.skills');

window.onscroll = function () {
    // Skills Offset Top
    let skillsOffSetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window ScrollTop
    let windowScrollTop = this.scrollY;

    if (windowScrollTop > (skillsOffSetTop + skillsOuterHeight - windowHeight - 100)) {
        
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span');

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;

        });
    }
};


// Create Popup With The Image

let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // Create Overlay Element
        let overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);

        // Create The Popup Box
        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';

        if(img.alt !== null) {

            let imgHeading = document.createElement('h3');

            let imgText  = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading);
        }

        // Create The Image
        let popupImage = document.createElement('img');

        popupImage.src = img.src;

        popupBox.appendChild(popupImage);

        document.body.appendChild(popupBox);

        // Create The Close Span
        let closeButton = document.createElement('span');

        let closeButtonText = document.createTextNode('X');

        closeButton.appendChild(closeButtonText);

        closeButton.className = 'close-button';

        popupBox.appendChild(closeButton);

        // Close Popup
        document.addEventListener('click', (e) => {
            if(e.target.className === 'close-button') {
                // Remove The Current Popup
                e.target.parentNode.remove();
                // Remove OverLay
                document.querySelector('.popup-overlay').remove();
            }
        });

    });
});

// Select All Bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
const allLinks = document.querySelectorAll('.links a');

function scrollToSomewhere(elements) {

    elements.forEach(ele => {

        ele.addEventListener('click', (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: "smooth"

            });
        });
    });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
    });

    ev.target.classList.add('active');
}


let bulletsSpan = document.querySelectorAll('.bullets-option span');

let bulletsContainer = document.querySelector('.nav-bullets');

let bulletLocalItem = localStorage.getItem('bullets_option');

if(bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove('active');
    });

    if(bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector('.bullets-option .yes').classList.add('active');
    }else{

        bulletsContainer.style.display = 'none';

        document.querySelector('.bullets-option .no').classList.add('active');

    }
}

bulletsSpan.forEach(span => {
    span.addEventListener('click', (e) => {

        if(span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem('bullets_option', 'block');
        }else{

            bulletsContainer.style.display = 'none';

            localStorage.setItem('bullets_option', 'none');
        }

        handleActive(e);
    });
});


// Reset Button
document.querySelector('.reset-options').onclick = function () {

    // localStorage.clear();   // To Remove All Storage Data In Website
    localStorage.removeItem('color_option');
    localStorage.removeItem('background_option');
    localStorage.removeItem('bullets_option');

    window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = function (e) {

    // Stop Propagation
    e.stopPropagation();

    this.classList.toggle('menu-active');

    tLinks.classList.toggle('open');
}

// Click Anywhere Outside Menu And Toggle Button
let linksContiner = document.querySelector('.links-contianer');

document.addEventListener('click', (e) => {

    if(e.target !== toggleBtn && e.target !== tLinks) {

        if(toggleBtn.classList.contains('menu-active') && tLinks.classList.contains('open')) {
            
            toggleBtn.classList.remove('menu-active');

            tLinks.classList.remove('open');
        }
    }
});

tLinks.onclick = function (e) {
    e.stopPropagation();
}