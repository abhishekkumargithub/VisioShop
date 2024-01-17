let contentTitle;

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
  let h2Text = document.createTextNode("rs  " + ob.price);
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  // Adding text-to-speech functionality
  boxDiv.addEventListener("mouseover", function () {
    speak(ob.name + " by " + ob.brand + " priced at " + ob.price + " rupees");
  });

  boxDiv.addEventListener("mouseleave", function () {
    stopSpeaking();
  });

  return boxDiv;
}


// Function to start speaking
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

// Function to stop speaking
function stopSpeaking() {
  window.speechSynthesis.cancel();
}



// Get references to the button and headings
const switchBtn = document.getElementById('switchBtn');
const headings = document.querySelectorAll('#mainContainer h1');

// Function to change the headings color
function changeHeadingsColor() {
  // Change color to, for example, white
  headings.forEach(function(heading) {
    heading.style.color = 'white';
  });
}

// Add click event listener to the switch button
switchBtn.addEventListener('click', changeHeadingsColor);

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
