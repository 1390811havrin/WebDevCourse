const myInit = {
mode:'cors',
Headers:'Access-Control-Allow-Origin: *'
};

let myRequest = new Request('http://csrestfulapi.ddns.net:333/ORMTest/api/Races');

var inputbutton = document.getElementById('enter');
inputbutton.addEventListener('click', function(){
fetch(myRequest, myInit)
  .then(function(response) {
    if(!response.ok){
      throw new Error('HTTP error, status = ' + response.status);
    }
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
});