console.log("javascript loaded")
//console.log(document.getElementById("rptPsw2"))




//document.getElementById('getAPIDATA').addEventListener("click", getAPI);

function postNewUser(e){
    console.log("Reaches postNewUser")
    e.preventDefault();
    let emal = document.getElementById('addEml').value;
    let pSW = document.getElementById('addPSW').value;

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
}


function getAPI(){
    console.log("Reaches getAPI")
    fetch('http://localhost:51299/api/Users')
    .then((res)=>res.json())
    .then((data)=>{let output = '<h2>Users</h2>';
    data.forEach(function(user){
        output += `
        <ul>
            <li>ID: ${user.UserID} </li>
            <li>Email: ${user.Email} </li>
            <li>PSW: ${user.PSW} </li>
            </ul>
        `;
    });
    document.getElementById('output').innerHTML = output;
    
})
}



