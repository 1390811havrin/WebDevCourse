console.log("javascript loaded")

 async function postNewUser(){
    console.log("Reaches SignUPValidate")

    const emal = document.getElementById('addEml').value;
    const pSW = document.getElementById('addPSW').value;
    //const pSWVert = document.getElementById('addPSWR').value;
    //const createAcc = 'http://localhost:51299/api/Users?username=' + emal + '&password=' + pSW;
    //const getAccID = 'http://localhost:51299/api/Users?username=' + emal +'&pass=' + pSW + '&potatoe=1';
    


     const fetchResutl = fetch('http://localhost:51299/api/Users',{
        method:'Post',
        mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-type' : 'application/json'        
        },
        body:JSON.stringify({Email:emal,PSW:pSW})
        })
 
            

    const response = await fetchResutl;
    const jsonData = await response.json();
    //console.log(jsonData);     
        

        


        //window.location.replace("http://127.0.0.1:5500/SignInPage/SignUpPage.html");
}  
       
        //var check = getCookie("loginCookie");
        //console.log(check);
    

