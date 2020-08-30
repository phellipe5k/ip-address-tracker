let latit = 34.0614;
let longit = -118.08162;
let mymap = L.map('map');
const ip = document.querySelector('#ip-input');
const button = document.querySelector('#button');
const ipOut = document.querySelector('#ip-output')
const locationOut = document.querySelector('#location-output')
const timezoneOut = document.querySelector('#timezone-output')
const ispOut = document.querySelector('#isp-output') 



mymap.setView([latit, longit], 13)
const setMap = () => {
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
  }).addTo(mymap);
  L.marker([latit, longit]).addTo(mymap)
}

setMap();

const handleClick = () => {
  fetch(`https://geo.ipify.org/api/v1?apiKey=at_95EQQjQ0h1brmuaMeVmKX6OO99ajO&ipAddress=${ip.value}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    handleData(data)
  })
}

const handleData = (data) => {
  ipOut.innerText = data.ip
  locationOut.innerText = `${data.location.city}, ${data.location.region} - ${data.location.postalCode}`;
  timezoneOut.innerText = `UTC${data.location.timezone}`;
  ispOut.innerText = data.isp;
  latit = data.location.lat;
  longit = data.location.lng;
  mymap.setView([latit, longit], 13)
  setMap()
}

button.addEventListener('click', handleClick)
