const webSocket = new WebSocket('wss://echo-ws-service.herokuapp.com');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('message');

webSocket.onmessage = function(event) {
 
  if (!isLocationMessage(message)) {
    const message = event.data;
    const divElement = document.createElement('div');
    divElement.setAttribute('align', 'right');
      
      messages.append(divElement);
  } 
  
};

function sendMessage() {
  const message = messageInput.value;
  const divElement = document.createElement('div');
  divElement.innerText = message;
  messages.append(divElement);
  messageInput.value = '';
  webSocket.send(message);
}

function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const locationData = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        const locationMessage = JSON.stringify(locationData);
        const locationLink = getLink(locationData);
        showLocationMessage(locationLink, 'left');
        webSocket.send(locationMessage);
      },
      function(error) {
        console.error(error);
        alert('Не удалось определить гео-локацию');
      }
    );
  } else {
    alert('Ваш браузер не поддерживает гео-локацию');
  }
}

function showLocationMessage(locationLink, align) {
  const divElement = document.createElement('div');
  const aElement = document.createElement('a');
  divElement.setAttribute('align', align);
  aElement.innerText = 'Моя локация';
  aElement.setAttribute('href', locationLink);
  aElement.setAttribute('target', '_blank');
  divElement.append(aElement);
  messages.append(divElement);
}

function getLink(locationData) {
  return `https://www.openstreetmap.org/#map=18/${locationData.latitude}/${locationData.longitude}`;;
}

function isLocationMessage(message) {
  try {
    const locationData = JSON.parse(message);
    return locationData.latitude && locationData.longitude;
  } catch {
    return false;
  }
}