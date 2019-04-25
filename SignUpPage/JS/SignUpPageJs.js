console.log("javascript loaded")

 async function postNewUser(){
    console.log("Reaches SignUPValidate")

    const emal = document.getElementById('addEml').value;
    const pSW = document.getElementById('addPSW').value;
    //const pSWVert = document.getElementById('addPSWR').value;
    //const createAcc = 'http://citybuilderapi.ddns.net:333/api/Users?username=' + emal + '&password=' + pSW;
    //const getAccID = 'http://citybuilderapi.ddns.net:333/api/Users?username=' + emal +'&pass=' + pSW + '&potatoe=1';
    


     const fetchUserResp = fetch('http://citybuilderapi.ddns.net:333/ORMTest/api/Users',{
        method:'Post',
        mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-type' : 'application/json'        
        },
        body:JSON.stringify({Email:emal,PSW:pSW})
        })
 
            

    const response = await fetchUserResp;
    const jsonData = await response.json();
    //console.log(jsonData);     
    return (await jsonData);

        


        //window.location.replace("./SignInPage/SignUpPage.html");
}  
       
        //var check = getCookie("loginCookie");
        //console.log(check);
    

async function wrapNewUser(e){
    e.preventDefault();

    let newUserResponse = await postNewUser();
    const newUID = await newUserResponse.UserID;

    await postNewWallet(newUID);
    await postNewDate(newUID);
    for(var i = 0; i < 10; i++)
    {
        await addPop(newUID);
    }
    window.location.replace("../loginpage/LoginPage.html");
}

async function postNewWallet(UID1)
{

    const gp = 1000;
    const fd = 10;
    const rr = 0;
    const ud = UID1;
    
    const fetchMap = fetch(`http://citybuilderapi.ddns.net:333/ORMTest/api/PersistentSums`,{
        method:'Post',
        mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Access-Control-Allow-Origin': '*',
            'Content-type' : 'application/json'        
        },
        body:JSON.stringify({Gold:gp,Food:fd,RareResources:rr,UID:ud})
    })      
    const responseMap = await fetchMap;
}

async function postNewDate(UID1)
{
    const rr = 0;
    const ud = UID1;
    
    const fetchMap = fetch(`http://citybuilderapi.ddns.net:333/ORMTest/api/Dates`,{
        method:'Post',
        mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Access-Control-Allow-Origin': '*',
            'Content-type' : 'application/json'        
        },
        body:JSON.stringify({Date1:0,UID:ud})
    })      
    const responseMap = await fetchMap;

}

async function addPop(UID1){

    const fetchPop = fetch('http://citybuilderapi.ddns.net:333/ORMTest/api/People',{
        method:'Post',
        mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-type' : 'application/json'        
        },
        body:JSON.stringify({UID:UID1,RaceID:1})
        })
    const responsePop = await fetchPop;
}