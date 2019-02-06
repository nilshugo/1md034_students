// The code in this file is not used currently

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

    for(var i = 0; i < burgers.length; i++) {

        var box = document.createElement("div");

        box.appendChild(document.createElement("h2")).innerHTML = burgers[i].name;

        var pic = document.createElement("img");
        pic.setAttribute("class", "burger");
        pic.setAttribute("src", burgers[i].img_url);
        box.appendChild(pic);

        var list = document.createElement("ul");
        if(burgers[i].gluten) {
            list.appendChild(document.createElement("li")).innerHTML = "Contains gluten";
        }
        else {
            list.appendChild(document.createElement("li")).innerHTML = "Gluten-free";
        }

        if(burgers[i].lactose) {
            list.appendChild(document.createElement("li")).innerHTML = "Contains lactose";
        }
        else {
            list.appendChild(document.createElement("li")).innerHTML = "Lactose-free";
        }
        list.appendChild(document.createElement("li")).innerHTML = "Number of kCal: " + burgers[i].kcal;
        box.appendChild(list);

        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "burgerbox");
        checkbox.setAttribute("id", "burgerbox" + (i));
        checkbox.setAttribute("value", "burger" + (i));
        var label = document.createElement("label");
        label.setAttribute("for", "burgerbox" + (i));
        label.innerHTML = " Select";
        box.appendChild(checkbox);
        box.appendChild(label);

        grid.appendChild(box);
    }
}

//createMenu();

function displayOrder() {
    var orderInfo = {
        "burgerOrder":[]
    };
    for(var i = 0; i < 5; i++) {
        var checkbox = document.getElementById("burgerbox" + i);
        if(checkbox.checked) {
            orderInfo.burgerOrder.push(burgers[i].name);
        }
    }
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var adress = document.getElementById("adress").value;
    var payment = document.getElementById("payopt").value;
    orderInfo.name = name;
    orderInfo.email = email;
    orderInfo.adress = adress;
    orderInfo.payopt = payment;

    if(document.getElementById("male").checked) orderInfo.gender = "male";
    if(document.getElementById("female").checked) orderInfo.gender = "female";
    if(document.getElementById("other").checked) orderInfo.gender = "did not provide";

    var section = document.getElementById("contact");
    
    var textdiv = document.createElement("div");

    textdiv.innerHTML = "<br>Name: " + orderInfo.name + "<br>"
                        + "<br>Gender: " + orderInfo.gender + "<br>"
                        + "<br>Adress: " + orderInfo.adress + "<br>"
                        + "<br>Email: " + orderInfo.email + "<br>"
                        + "<br>Payment Option: " + orderInfo.payopt + "<br>"
                        + "<br>Order: " + orderInfo.burgerOrder.toString();

    section.appendChild(textdiv);
}