
   if (annyang) {
     // Add our commands to annyang
     annyang.addCommands({
       'basket': function() {
        window.location.href = 'cart.html';
    }
    
     });
     annyang.addCommands({
       'login': function() {
        window.location.href = 'login.html';
    }
    
     });
  
annyang.addCommands({
  'add to cart': function() {
    let buttonTag = document.createElement('button')
   buttonTag.onclick = function() {
       let order = id + " ";
       let counter = 1;
       if (document.cookie.indexOf(',counter=') >= 0) {
           order = id + " " + document.cookie.split(',')[0].split('=')[1];
           counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
       }
       document.cookie = "orderId=" + order + ",counter=" + counter;
       document.getElementById("badge").innerHTML = counter;
       console.log(document.cookie);
   };
      buttonTag.click(); // Simulate a click on the button when the command is recognized
  }
});
     // Tell KITT to use annyang
     SpeechKITT.annyang();
   
     // Define a stylesheet for KITT to use
     SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');
   
     // Render KITT's interface
     SpeechKITT.vroom();

   }

   