const chatBox = document.querySelector(".chat-box");
const inputField = chatBox.querySelector("input[type='text']");
const button = chatBox.querySelector("button");
const chatBoxBody = chatBox.querySelector(".chat-box-body");

button.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function decryptData() {
  
  var decryptedData = CryptoJS.AES.decrypt("U2FsdGVkX18HUOrq2Gys4dDCkEP0OMN/ldD0PrrszS94TuIZ8EEY6Y7oQ7fEAJXxlRia6zdDTBMyin8wqVXIxAu6s5VYrCL0ly0OzbY+dCE=", "1258f*#%$6cjkc");
  var key_return = decryptedData.toString(CryptoJS.enc.Utf8);
  return key_return
}
function sendMessage() {
  const message = inputField.value;
  inputField.value = "";
  chatBoxBody.innerHTML += `<div class="message"><p>${message}</p></div>`;
  chatBoxBody.innerHTML += `<div id="loading" class="response loading">.</div>`;
  scrollToBottom();
  window.dotsGoingUp = true;
    var dots = window.setInterval( function() {
        var wait = document.getElementById("loading");
        if ( window.dotsGoingUp ) 
            wait.innerHTML += ".";
        else {
            wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
        if ( wait.innerHTML.length < 2)
            window.dotsGoingUp = true;
        }
        if ( wait.innerHTML.length > 3 )
            window.dotsGoingUp = false;
        }, 250);

  // fetch('https://d604-2401-4900-5602-d906-b978-c031-29cd-503f.in.ngrok.io/message', {
  //   method: 'POST',
  //   headers: {
  //     accept: 'application.json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({message})
  // }).then(response => {
  //   return response.json();
  // }).then(data => {
  //   document.getElementById("loading").remove();
  //   chatBoxBody.innerHTML += `<div class="response"><p>${data.message}</p></div>`;
  //   scrollToBottom();
  // })

        var oHttp = new XMLHttpRequest();
        
        var OPENAI_API_KEY = decryptData();
        oHttp.open("POST", "https://api.openai.com/v1/chat/completions");
        oHttp.setRequestHeader("Accept", "application/json");
        oHttp.setRequestHeader("Content-Type", "application/json");
        oHttp.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY);
        oHttp.onreadystatechange = function () {
          if (oHttp.readyState === 4) {
              //console.log(oHttp.status);
              var oJson = {}
              oJson = JSON.parse(oHttp.responseText);
              if (oJson.choices && oJson.choices[0].message) {
                
                var result = oJson.choices[0].message.content
                document.getElementById("loading").remove();
                chatBoxBody.innerHTML += `<div class="response"><p>${result}</p></div>`;
                scrollToBottom();
  
                }
              }
            };
  
          var data = {
          model: "gpt-3.5-turbo",
          messages: [{"role": "user", "content": "Assume the role of an Indian origin caring JIGYASABOT AI Chatbot and give response for"+message}],
          max_tokens:2000
          
          }
  
          oHttp.send(JSON.stringify(data));
  
  
        

}

function scrollToBottom() {
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}

