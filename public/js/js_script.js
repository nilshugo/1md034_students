function menuItem(name, kCal, ifGluten, ifLactose, img_url) {
    var burgerItem = {};
    burgerItem.name = name;
    burgerItem.kCal = kCal;
    burgerItem.gluten = ifGluten;
    burgerItem.lactose = ifLactose;
    burgerItem.img_url = img_url;
    return burgerItem;
}

function generateBurgers() {
    var burgers = [];

    burgers.push(menuItem("Bacon Cheese", 800, true, true,"/img/bacon-cheese.jpg"));
    burgers.push(menuItem("Kids Burger", 400, true, false,"/img/kids-burger.png"));
    burgers.push(menuItem("King Burger", 700, true, true,"/img/king-burger.jpg"));
    burgers.push(menuItem("A la chicken", 500, true, false,"/img/chicken-burger.jpg"));
    burgers.push(menuItem("Gluten free vegan", 400, false, false,"/img/vegan-burger.jpg"));

    return burgers;
}

function createMenu() {
    var grid = document.getElementById("wrapper");

    console.log(grid);
    for(var i = 0; i < burgers.length; i++) {
        console.log("Appending " + burgers[i].name);

        var box = document.createElement("div");
        box.setAttribute("class", "box" + (i+1));

        box.appendChild(document.createElement("h2")).innerHTML = burgers[i].name;

        var pic = document.createElement("img");
        pic.setAttribute("class", "burger");
        pic.setAttribute("src", burgers[i].img_url);
        box.appendChild(pic);

        grid.appendChild(box);
    }
}
/*
var parent = document.getElementById("wrapper");

function appendBurger(parent, burger) {
    var box = document.createElement("div");
    var head = document.createElement("h2");
    var pic = document.createElement("img");
    var list = document.createElement("ul");

    head.innerHTML = burger.name;

    pic.setAttribute("src", burger.img_url);
    pic.setAttribute("class", "burger");
    
    box.appendChild(head);
    box.appendChild(pic);
    parent.appendChild(box);
}

for(var i = 0; i < burgers.length; i++) {
    appendBurger(parent, burgers[i]);
}*/
createMenu();