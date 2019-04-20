
window.onload = function OnLoad(){
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
    
    tableCreate();
    console.log("Table Loaded");
}

let selectedTd;

function highlight(node) {
    if (selectedTd) {
        selectedTd.classList.remove('highlight');
    }
    selectedTd = node;
    selectedTd.classList.add('highlight');
    var check = getCookie("loginCookie");
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