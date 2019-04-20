console.log("javascript loaded")

function postNewUser(e){
    console.log("Reaches postNewUser")
    e.preventDefault();
    let emal = document.getElementById('addEml').value;
    let pSW = document.getElementById('addPSW').value;
    let pSWVert = document.getElementById('addPSWR').value;
    
    if(pSW == pSWVert)
    {

        fetch('http://localhost:51299/api/Users',{
            method:'Post',
            mode:'cors',
            headers:{
                'Accept': 'application/json, text/plain, */*',
                'Access-Control-Allow-Origin': '*',
                'Content-type' : 'application/json'        
            },
            body:JSON.stringify({Email:emal, PSW:pSW})
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
    } else {   
        window.alert("Passwords Don't Match")
    }
    window.location.replace("http://127.0.0.1:5500/SignInPage/SignUpPage.html");
}