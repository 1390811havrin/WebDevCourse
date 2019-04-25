console.log("javascript loaded")

function setCookie(data) {
    console.log(data);
    document.cookie = 'loginCookie=' + data + ';path=/';
    console.log(document.cookie);
}

function checkResponse(data){
        setCookie(data);
        window.location.replace("../MainPage/MainPage.html");
    
}


function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    console.log(ca);
    for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
//http://citybuilderapi.ddns.net:333/ORMTest
//http://localhost:51299
async function loginUser(e){
    console.log("Reaches loginValidate")
    e.preventDefault();
    const emal = document.getElementById('addEml').value;
    const pSW = document.getElementById('addPSW').value;

    


       const fetchResult = fetch('http://citybuilderapi.ddns.net:333/ORMTest/api/Login',{
            method:'Post',
            mode:'cors',
            headers:{
                'Accept': 'application/json, text/plain, */*',
                'Access-Control-Allow-Origin': '*',
                'Content-type' : 'application/json'        
            },
            body:JSON.stringify({Email:emal, PSW:pSW})
            })         
    const response = await fetchResult;
    const jsonData = await response.json();
    //console.log(jsonData);
    checkResponse(jsonData);
    //console.log(check);
}

