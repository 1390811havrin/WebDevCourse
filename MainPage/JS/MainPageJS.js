
window.onload = function OnLoad(){
    getImage();
    console.log("document Loaded");
    let table = document.getElementById('bagua-table');
    

    
    table.onclick = function (event) {
        let target = event.target;
        
        while (target != this) {
            if (target.tagName == 'TD') {
                let x = target.id.split("_")[0];
                let y = target.id.split("_")[1];
                console.log("X: " + target.id.split("_")[0] + " Y: " + target.id.split("_")[1]);
                openForm(x, y)
                highlight(target);
                return;
            }
            target = target.parentNode;
        }
    }

    getCurrentPersistentSums();    
    getCPop();
    getTypeCount("Defense");
    
    tableCreate();
    console.log("Table Loaded");
}


async function getTypeCount(type){
    //http://localhost:51299/api/Buildings?uID=18&type=Food
    const cke = getCookie("loginCookie")
        console.log("Reaches GCG") 
        const fetchResutl = fetch(`http://localhost:51299/api/Buildings?uID=${cke}&type=${type}`)
        const response = await fetchResutl;
        const jsonData = await response.json();
        console.log(jsonData);
        document.getElementById("Security").innerHTML = jsonData;
}


async function getCPop(){
//http://localhost:51299/api/People/55
const cke = getCookie("loginCookie")
    console.log("Reaches GCG") 
    const fetchResutl = fetch(`http://localhost:51299/api/People/${cke}`)
    const response = await fetchResutl;
    const jsonData = await response.json();
    console.log(jsonData);
    document.getElementById("Pop").innerHTML = jsonData;
    document.getElementById("Reknown").innerHTML = jsonData/2;  
}



async function getCurrentPersistentSums(){
    const cke = getCookie("loginCookie")
    console.log("Reaches GCG") 
    const fetchResutl = fetch(`http://localhost:51299/api/PersistentSums/${cke}`)
    const response = await fetchResutl;
    const jsonData = await response.json();
    console.log(jsonData);   
    document.getElementById("Gold").innerHTML = jsonData.Gold;
    document.getElementById("food").innerHTML = jsonData.Food;
    document.getElementById("Rare").innerHTML = jsonData.RareResources;
}
    //http://localhost:51299/api/PersistentSums/{id}

let selectedTd;

function highlight(node) {
    if (selectedTd) {
        selectedTd.classList.remove('highlight');
    }
    selectedTd = node;
    selectedTd.classList.add('highlight');
    //var check = getCookie("loginCookie");
    //console.log(check);
}

function tableCreate() {
    var body = document.body;
    var tbl = document.getElementById('bagua-table');
    var image = document.getElementById('background');
    const imageWidth = image.width;
    const imageHeight = image.height;
    tbl.style.width = imageWidth + "px";
    tbl.style.height = (imageHeight - 30) + "px";
    const cellWidth = imageWidth / 40;
    const cellHeight = imageHeight / 40;
    console.log("Width: " + imageWidth + " Height: " + imageHeight);
    console.log("cellWidth: " + cellWidth + " cellHeight: " + cellHeight);

    for (var i = 0; i < 40; i++) {
        var tr = tbl.insertRow();
        for (var j = 0; j < 40; j++) {
            var td = tr.insertCell();
            td.style.border = '1px solid black';
            td.appendChild(document.createTextNode(''));
            td.style.width = cellWidth + "px";
            td.style.height = cellHeight + "px";
            td.id = j + "_" + i;
        }
    }
    body.appendChild(tbl);
}



function openForm(x, y) {
  console.log(x, y);
  var div = document.getElementById("myForm");
  div.style.display = "block";
  var xinputForm = document.getElementById("xinput");
  xinputForm.value = x;
  var yinputForm = document.getElementById("yinput");
  yinputForm.value = y;
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
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


async function destroyBuilding(){
    //get xy of location
    const xt = document.getElementById("xinput").value;
    const yt = document.getElementById("yinput").value;
    const cke =getCookie("loginCookie");
    //get building details from tthe building at that location 
    //then delete that building from the map
    //then delete that building from the sql db.
    
    const fetchresult1 = fetch(`http://localhost:51299/api/VDP?x=${xt}&y=${yt}&UID=${cke}`)
    const response = await fetchresult1;
    const jsonData1 = await response.json();
    console.log(jsonData1);
    const bdID = jsonData1.BuildingID;
    const fetchResult2 = fetch(`http://localhost:51299/api/VDP/${bdID}`,{
        method:'Delete',
        mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-type' : 'application/json'        
        }})
    const response2 = await fetchResult2;
    const fetchResult3 = fetch(`http://localhost:51299/api/Buildings/${bdID}`,{
        method:'Delete',
        mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-type' : 'application/json'        
        }})
    const response3 = await fetchResult3;
    location.reload();
}


function chooseAction() {
        
        var dl= document.getElementById("ddl1");
        var choice = dl.options[dl.selectedIndex].value;
        if(choice == "Build")
        {
            buildBetterBuilding()
        }
        else if(choice == "Destroy")
        {
            destroyBuilding();
        }
        else if(choice == "Upgrade")
        {
                //do upgrade shit
        }
        else{
            location.reload();
        }

}


function getImage(){
    
    var cke =getCookie("loginCookie");
    console.log("Reaches get Image");
        fetch(`http://localhost:51299/api/Image?cookie=${cke}`)
            .then((res)=>res.blob())
            .then((data)=>{
                var urlCreator = window.URL || window.webkitURL;

                var imgUrl = urlCreator.createObjectURL(data);
                    console.log("imgurl: " + imgUrl);
                document.querySelector("#background").src=imgUrl})
            .catch(error => alert('Error: Incorrect URL Creation'));            
   
    //var check = getCookie("loginCookie");
    //console.log(check);
}

async function buildBuilding(){

    const cke =getCookie("loginCookie");

    console.log("Reaches buildBuilding");
    const xt = document.getElementById("xinput").value;
    const yt = document.getElementById("yinput").value;
    const dl= document.getElementById("ddl2");
    const namet = dl.options[dl.selectedIndex].value;
    

    console.log(cke, xt, yt, namet);

    const fetchResutl = fetch('http://localhost:51299/api/Image',{
        method:'Post',
        mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-type' : 'application/json'        
        },
        body:JSON.stringify({cookie:cke,x:xt,y:yt,name:namet})
        })
    
    const response = await fetchResutl;
   

    location.reload();
    //var check = getCookie("loginCookie");
    //console.log(check);
}

async function buildBetterBuilding(){
//get name of building from ddl
//get x of building 
//get y of building
//get user id
    const cke = getCookie("loginCookie");
    const xt = document.getElementById("xinput").value;
    const yt = document.getElementById("yinput").value;
    const dl= document.getElementById("ddl2");
    const namet = dl.options[dl.selectedIndex].value;

//Get Current Levels of Wealth    
    const fetchWallet = fetch(`http://localhost:51299/api/PersistentSums/${cke}`)
    const responseWallet = await fetchWallet;
    const jsonDataWallet = await responseWallet.json();
    console.log(jsonDataWallet);   


//Check if the space is already occupied
    const fetchOccupied = fetch(`http://localhost:51299/api/VDP?x=${xt}&y=${yt}&UID=${cke}`)
    const responseOccupied = await fetchOccupied;
    const jsonDataOccupied = await responseOccupied.json();
    console.log(jsonDataOccupied);


//if no building exists there continue
    if(jsonDataOccupied.BuildingName == "NA"){
        //find cost of desired building
    const fetchPrice = fetch(`http://localhost:51299/api/BuildingTemplates?name=${namet}`)
    const responsePrice = await fetchPrice;
    const jsonDataPrice = await responsePrice.json();
    console.log(jsonDataPrice);

        //check price against current wallet gold
        if(jsonDataPrice.Cost <= jsonDataWallet.Gold)
        {
            //actually build building
            const buildName = "BuildingName: " + jsonDataPrice.Name + ",";
            const buildType = "BuildingType: " + jsonDataPrice.Type + ",";
            const buildCost = "BuildingCost: " + jsonDataPrice.Cost + ",";
            const buildlvl = "BuildingLevel: " + jsonDataPrice.lvl + ",";
            const xf = "X: " + xt + ",";
            const yf = "Y: " + yt + ",";
            const uidf = "UserID: " + cke;
            const buildObj = "{"+ buildType + buildlvl + buildName + xf + yf + buildCost + uidf +"}";
            console.log(buildObj);
            //put building into sql

            const fetchSQLBuild = fetch('http://localhost:51299/api/Buildings',{
                method:'Post',
                mode:'cors',
                headers:{
                    'Accept': 'application/json, text/plain, */*',
                    'Access-Control-Allow-Origin': '*',
                    'Content-type' : 'application/json'        
                },
                body:JSON.stringify({BuildingType:jsonDataPrice.Type, BuildingLevel:jsonDataPrice.lvl, BuildingName:jsonDataPrice.Name,X:xt,Y:yt,BuildingCost:jsonDataPrice.Cost,UserID:cke})
                })         
            const responseSQLBuild = await fetchSQLBuild;
            const jsonDataSQLBuild = await responseSQLBuild.json();
            console.log(jsonDataSQLBuild);
            if(jsonDataSQLBuild.BuildingName != "Bad Model State" )
            {
                //building is built in SQL 
                //Need to now build it on the map
                const fetchMap = fetch(`http://localhost:51299/api/VDP/${jsonDataSQLBuild.BuildingID}`,{
                    method:'Put',
                    mode:'cors',
                    headers:{
                        'Accept': 'application/json, text/plain, */*',
                        'Access-Control-Allow-Origin': '*',
                        'Content-type' : 'application/json'        
                    }})      
                const responseMap = await fetchMap;
                const jsonDataMap = await responseMap.json();
                console.log(jsonDataMap);

                    if(jsonDataMap == 1)
                    {
                        //image successfully added to map
                        //now you may subtract the currency
                        /**
                         *
                         * {
                         "Gold": 1,
                        "Food": 1,
                        "RareResources": 1,
                        "UID": 1,
                        "ID": 1
                        }
                        * jsonDataPrice.Cost <= jsonDataWallet.Gold
                        *  
                        */
                       const newG = jsonDataWallet.Gold - jsonDataPrice.Cost;
                        const stringOShit = JSON.stringify({Gold:newG, Food:jsonDataWallet.Food, RareResources:jsonDataWallet.RareResources,UID:jsonDataWallet.UID,ID:jsonDataWallet.ID});
                        console.log(stringOShit);

                        const fetchMap = fetch(`http://localhost:51299/api/PersistentSums/${jsonDataWallet.ID}`,{
                            method:'Put',
                            mode:'cors',
                            headers:{
                                'Accept': 'application/json, text/plain, */*',
                                'Access-Control-Allow-Origin': '*',
                                'Content-type' : 'application/json'        
                            },
                            body:stringOShit
                        
                        })      
                        const responseMap = await fetchMap;

                        location.reload();
                    }
                    else
                    {
                        alert("Failed to Place Image On Map")
                    }
            }
            else{

                alert("Bad Model State")
            }

        }
        else{
            alert("Not Enough Gold")
        }
    }
    else
    {
        alert("Building Already Exists Here Deconstruct it first")
    }

//get building template
/**
 * {
  "ID": 1,
  "Name": "sample string 2",
  "Type": "sample string 3",
  "Cost": 1,
  "Benefit": 1,
  "lvl": 1
}
 * 
 */

//create building object like below using above 
/**
 * {
 "BuildingID": 1,
"BuildingType": "sample string 2",
"BuildingLevel": 1,
"BuildingName": "sample string 3",
"X": 1,
"Y": 1,
"BuildingCost": 1,
"UserID": 1
}
*/



}


async function rollMonth(){
    //each month need to 
    //1 Subtract Cpop from Cfood
    //2 Add Nfood from farms to Cfood
    //3 Calculate Nwealth = CWealth + (Cpop * 100)
    //4 Calculate New population as Old Pop + 1 if OPop <= NFood
    //5 Calculate Current Date as ODate + 1 then parse it out 
    //
    //I need to pull wallet to get current gold, current food, 
    //
    const cke = getCookie("loginCookie");
//Get Your Current Date
const fetchCD = fetch(`http://localhost:51299/api/Dates/${cke}`)
const responseCD = await fetchCD;
const jsonDataCD = await responseCD.json();
console.log(jsonDataCD);   



//Get The Admin Date
const fetchCDA = fetch(`http://localhost:51299/api/Dates/${cke}`)
const responseCDA = await fetchCDA;
const jsonDataCDA = await responseCDA.json();
console.log(jsonDataCDA);   


//Get Current Levels of Wealth    
    const fetchWallet = fetch(`http://localhost:51299/api/PersistentSums/${cke}`)
    const responseWallet = await fetchWallet;
    const jsonDataWallet = await responseWallet.json();
    console.log(jsonDataWallet);   

//Get Current Population
    const fetchPop = fetch(`http://localhost:51299/api/People/${cke}`)
    const responsePop = await fetchPop;
    const jsonDataPop = await responsePop.json();
    console.log(jsonDataPop);

//Get New Amount of Food
    const ftype = "Food";
    const fetchFood = fetch(`http://localhost:51299/api/Buildings?uID=${cke}&type=${ftype}`)
    const responseFood = await fetchFood;
    const jsonDataFood = await responseFood.json();
    console.log(jsonDataFood);

//Steps 1 and 2
    let nFood = (jsonDataWallet.Food - jsonDataPop) +  jsonDataFood;
//Steps 3
    let nWealth = jsonDataWallet.Gold + (jsonDataPop * 100);
//Step 4
    
    if(jsonDataPop <= nFood)
    {
        //when you have enough food for growth
        const popTBAdded = Math.floor(nFood/jsonDataPop);
         
        //add on the population
        for(var i = 0; i < popTBAdded; i++)
        {
            addPop();
        }

    }
    else{
        //when you don't have enough food for growth
        const popTL = Math.floor(jsonDataPop/nFood);
            //Remove the population
            for(var i = 0; i < popTL; i++)
            {
                RemovePop(jsonDataWallet.UID);
            }
    }

    const stringObj = JSON.stringify({Gold:nWealth, Food:nFood, RareResources:jsonDataWallet.RareResources,UID:jsonDataWallet.UID,ID:jsonDataWallet.ID});
    updateWallet(stringObj, jsonDataWallet.ID);
    //if you haven't reached current day
    if(jsonDataCD.Date1 < jsonDataCDA.Date1)
    {
        let cday = jsonDataCD.Date1 + 1;
        const datObj = JSON.stringify({ID:jsonDataCD.ID, Date1: cday, UID: jsonDataCD.UID});
        rollDay(datObj, jsonDataCD.ID);

    }
    else
    {
        alert("Current Time Reached")
    }
     



}


async function addPop(){
    const fetchPop = fetch('http://localhost:51299/api/People',{
        method:'Post',
        mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-type' : 'application/json'        
        },
        body:JSON.stringify({UID:cke,RaceID:1})
        })
    const responsePop = await fetchPop;

}

async function RemovePop(UID){
    const fetchPop = fetch(`http://localhost:51299/api/People?UID=${UID}`,{
        method:'DELETE',
        mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-type' : 'application/json'        
        }
        })
    const responsePop = await fetchPop;
}

async function updateWallet(stringObj, ID){

    const fetchMap = fetch(`http://localhost:51299/api/PersistentSums/${ID}`,{
        method:'Put',
        mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Access-Control-Allow-Origin': '*',
            'Content-type' : 'application/json'        
        },
        body:stringObj
    
    })      
    const responseMap = await fetchMap;

}

async function rollDay(datObj, ID){
    const fetchMap = fetch(`http://localhost:51299/api/Dates/${ID}`,{
        method:'Put',
        mode:'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Access-Control-Allow-Origin': '*',
            'Content-type' : 'application/json'        
        },
        body:datObj
    })      
    const responseMap = await fetchMap;
}


