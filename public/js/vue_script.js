var socket = io();

var vm = new Vue({
  el: "#main",
  data: {
      orders: {},
      tempOrders: {
          orderId: "T",
          details: { "x": 100000000, "y": 10000000000000},
          orderItems: []
      }
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
    displayOrder: function(event) {
        var offset = {x: event.currentTarget.getBoundingClientRect().left,
                      y: event.currentTarget.getBoundingClientRect().top};
        
        this.tempOrders.details.x = event.clientX - 10 - offset.x;
        this.tempOrders.details.y = event.clientY - 10 - offset.y;
      },
      getNext: function () {
        var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
          return Math.max(last, next);
        }, 0);
        return lastOrder + 1;
      },
      addOrder: function () {
        this.tempOrders.orderItems = [];
        for(var i = 0; i < burgers.length; i++) {
          var box = document.getElementById("burgerbox" + i);
          if(box.checked) this.tempOrders.orderItems.push(burgers[i].name);
        }
        var personalInfo = [];
        personalInfo.push(document.getElementById("name").value);
        personalInfo.push(document.getElementById("email").value);
        personalInfo.push(document.getElementById("payopt").value);
        this.tempOrders.personalInfo = personalInfo;
        console.log(this.tempOrders);
        socket.emit("addOrder", this.tempOrders);
      }
  }
});

vm.createMenu();
