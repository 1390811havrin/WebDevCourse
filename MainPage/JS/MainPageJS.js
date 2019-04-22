
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
    //get building details from tthe building at that location 
    //then delete that building from the map
    //then delete that building from the sql db.
    
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