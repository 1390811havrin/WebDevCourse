function getInfo(){

    const dl= document.getElementById("ddl1");
    const namet = dl.options[dl.selectedIndex].value;
    if(namet == "Wall")
    {

    document.getElementById("p121").innerHTML = "A basic stone wall. Around 15-20 feet high. Provides 1 security. Costs 50 gold. In event of a siege soldiers may be garrisoned inside." 
    
    }
    else if(namet == "East Wall")
    {

    document.getElementById("p121").innerHTML = "A basic stone wall that faces east. Around 15-20 feet high. Provides 1 security. Costs 50 gold. In event of a siege soldiers may be garrisoned inside" 
    
    }
    else if(namet == "West Wall")
    {

    document.getElementById("p121").innerHTML = "A basic stone wall that faces West. Around 15-20 feet high. Provides 1 security. Costs 50 gold. In event of a siege soldiers may be garrisoned inside" 
    
    }
    else if(namet == "North Wall")
    {

    document.getElementById("p121").innerHTML = "A basic stone wall that faces North. Around 15-20 feet high. Provides 1 security. Costs 50 gold. In event of a siege soldiers may be garrisoned inside" 
    
    }
    else if(namet == "South Wall")
    {

    document.getElementById("p121").innerHTML = "A basic stone wall that faces South. Around 15-20 feet high. Provides 1 security. Costs 50 gold. In event of a siege soldiers may be garrisoned inside" 
    
    }

    else if(namet == "Farm")
    {

    document.getElementById("p121").innerHTML = "A basic farm. Provides 1 food per month. Costs 50 gold." 
    
    }
    else if(namet == "Blacksmith")
    {

    document.getElementById("p121").innerHTML = "A rudimentary blacksmith. Provides an additional 5 gp per month. Costs 100 gp. Required for arming citizens with simple weapon types." 
    
    }
    else if(namet== "Baracks")
    {
        document.getElementById("p121").innerHTML ="A garrison for soldiers and in a pinch civilians. Provides 1 housing and 1 security. Effectively houses 1 population. Costs 200 gp"
    }
}