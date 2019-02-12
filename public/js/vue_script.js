var socket = io();

var vmMenu = new Vue({
  el: "#main",
  data: {
    orders: {},
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
    createMenu: function() {
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
    },
    displayOrder: function() {
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
        
        var payment = document.getElementById("payopt").value;
        orderInfo.name = name;
        orderInfo.email = email;
        
        orderInfo.payopt = payment;

        if(document.getElementById("male").checked) orderInfo.gender = "male";
        if(document.getElementById("female").checked) orderInfo.gender = "female";
        if(document.getElementById("other").checked) orderInfo.gender = "did not provide";

        var section = document.getElementById("contact");
        
        var textdiv = document.createElement("div");

        textdiv.innerHTML = "<br>Name: " + orderInfo.name + "<br>"
                            + "<br>Gender: " + orderInfo.gender + "<br>"
                            + "<br>Email: " + orderInfo.email + "<br>"
                            + "<br>Payment Option: " + orderInfo.payopt + "<br>"
                            + "<br>Order: " + orderInfo.burgerOrder.toString();
        
        section.appendChild(textdiv);
      },
      getNext: function () {
        var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
          return Math.max(last, next);
        }, 0);
        return lastOrder + 1;
      },
      addOrder: function (event) {
        var offset = {x: event.currentTarget.getBoundingClientRect().left,
                      y: event.currentTarget.getBoundingClientRect().top};
        socket.emit("addOrder", { orderId: this.getNext(),
                                  details: { x: event.clientX - 10 - offset.x,
                                             y: event.clientY - 10 - offset.y },
                                  orderItems: ["Beans", "Curry"]
                                });
      }
  }
});

