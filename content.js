let contentTitle;

// Function to start speaking
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

// Function to stop speaking
function stopSpeaking() {
    window.speechSynthesis.cancel();
}

let colorBlindModeEnabled = false;

function toggleColorBlind() {
    colorBlindModeEnabled = !colorBlindModeEnabled;

    if (colorBlindModeEnabled) {
        enableColorBlindMode();
    } else {
        disableColorBlindMode();
    }
}

function enableColorBlindMode() {
    document.body.classList.add('color-blind-mode');
    changeHeadingsColor();
}

function disableColorBlindMode() {
    document.body.classList.remove('color-blind-mode');
    resetHeadingsColor();
}
function changeHeadingsColor() {
    const headings = document.querySelectorAll('#mainContainer h1');
    const elements = document.querySelectorAll('#mainContainer *');

    headings.forEach(function (heading) {
        heading.style.color = 'white';
    });
    elements.forEach(function (element) {
        element.style.fontSize = '1.5rem'; // Larger font size for better visibility
    });
}

function resetHeadingsColor() {
    const headings = document.querySelectorAll('#mainContainer h1');
    const elements = document.querySelectorAll('#mainContainer *');

    headings.forEach(function (heading) {
        heading.style.color = ''; // Reset to default color
    });
    elements.forEach(function (element) {
        element.style.fontSize = ''; // Larger font size for better visibility
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let mainContainer = document.getElementById("mainContainer");
    let containerClothing = document.getElementById("containerClothing");
    let containerAccessories = document.getElementById("containerAccessories");
    let fragment = document.createDocumentFragment();

    let httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status == 200) {
                contentTitle = JSON.parse(this.responseText);
                if (document.cookie.indexOf(",counter=") >= 0) {
                    var counter = document.cookie.split(",")[1].split("=")[1];
                    document.getElementById("badge").innerHTML = counter;
                }

                for (let i = 0; i < contentTitle.length; i++) {
                    let section = dynamicClothingSection(contentTitle[i]);
                    if (contentTitle[i].isAccessory) { // Using 'isAccessory' property
                        containerAccessories.appendChild(section);
                    } else {
                        containerClothing.appendChild(section);
                    }
                }
            } else {
                console.log("call failed!");
            }
        }
    };

    httpRequest.open(
        "GET",
        "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
        true
    );
    httpRequest.send();
});
// Define textToSpeechEnabled in a global scope
let textToSpeechEnabled = true;

// Function to toggle text-to-speech functionality
function enableTextToSpeech() {
    textToSpeechEnabled = !textToSpeechEnabled;
    
    // Update button style
    const button = document.getElementById('textToSpeech');
    if (textToSpeechEnabled) {
        button.classList.add('highlight');
    } else {
        button.classList.remove('highlight');
    }
    
    // Update event listeners for existing elements
    document.querySelectorAll("#box").forEach(boxDiv => {
        if (textToSpeechEnabled) {
            boxDiv.addEventListener("mouseover", handleMouseOver);
            boxDiv.addEventListener("mouseleave", handleMouseLeave);
        } else {
            boxDiv.removeEventListener("mouseover", handleMouseOver);
            boxDiv.removeEventListener("mouseleave", handleMouseLeave);
        }
    });
}

// Define speak and stopSpeaking functions
function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

function stopSpeaking() {
    speechSynthesis.cancel();
}

// Event handler functions
function handleMouseOver() {
    if (textToSpeechEnabled) {
        let ob = this.dataset; // assuming the data is stored as data attributes
        speak(ob.name + " by " + ob.brand + " priced at " + ob.price + " rupees");
    }
}

function handleMouseLeave() {
    if (textToSpeechEnabled) {
        stopSpeaking();
    }
}

// Function to create dynamic clothing section
function dynamicClothingSection(ob) {
    let boxDiv = document.createElement("div");
    boxDiv.id = "box";
    
    let boxLink = document.createElement("a");
    boxLink.href = "/contentDetails.html?" + ob.id;
    
    let imgTag = document.createElement("img");
    imgTag.src = ob.preview;
    
    let detailsDiv = document.createElement("div");
    detailsDiv.id = "details";
    
    let h3 = document.createElement("h3");
    let h3Text = document.createTextNode(ob.name);
    h3.appendChild(h3Text);
    
    let h4 = document.createElement("h4");
    let h4Text = document.createTextNode(ob.brand);
    h4.appendChild(h4Text);
    
    let h2 = document.createElement("h2");
    let h2Text = document.createTextNode("rs " + ob.price);
    h2.appendChild(h2Text);
    
    boxDiv.appendChild(boxLink);
    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(h4);
    detailsDiv.appendChild(h2);

    // Store data as data attributes for the element
    boxDiv.dataset.name = ob.name;
    boxDiv.dataset.brand = ob.brand;
    boxDiv.dataset.price = ob.price;

    // Adding text-to-speech functionality
    if (textToSpeechEnabled) {
        boxDiv.addEventListener("mouseover", handleMouseOver);
        boxDiv.addEventListener("mouseleave", handleMouseLeave);
    }

    return boxDiv;
}
