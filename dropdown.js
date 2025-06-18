function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) { 
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}

const userIconLink = document.getElementById('userIconLink');
const userOptions = document.getElementById('userOptions');
let hideOptionsTimeout;
userIconLink.addEventListener('mouseenter', () => {
    clearTimeout(hideOptionsTimeout);
    userOptions.style.display = 'block';
});
userIconLink.addEventListener('mouseleave', () => {
    hideOptionsTimeout = setTimeout(() => {
        userOptions.style.display = 'none';
    }, 300); // Adjust the delay (in milliseconds) as needed
});

// Hide the options when the cursor leaves the options div
userOptions.addEventListener('mouseleave', () => {
    hideOptionsTimeout = setTimeout(() => {
        userOptions.style.display = 'none';
    }, 300); // Adjust the delay (in milliseconds) as needed
});

// Keep the options visible when the cursor is over the options div
userOptions.addEventListener('mouseenter', () => {
    clearTimeout(hideOptionsTimeout);
});
//for text to speech redirecting page
function announceRedirect(event, url, pageName) {
event.preventDefault(); // Prevent the default link behavior
if ('speechSynthesis' in window) {
const utterance = new SpeechSynthesisUtterance(`Redirecting to ${pageName}`);
speechSynthesis.speak(utterance);

// Redirect after the announcement
utterance.onend = function() {
    window.location.href = url;
};
} else {
// If speech synthesis is not supported, redirect immediately
window.location.href = url;
}
}