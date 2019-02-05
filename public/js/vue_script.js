var vmMenu = new Vue({
  el: '#myID',
  data: {
    arbitraryVariableName: 'Välj burgare '
  },
  methods: {
    menuItem: function(name, kCal, ifGluten, ifLactose) {
      var burgerItem = {};
      burgerItem.name = name;
      burgerItem.kCal = kCal;
      burgerItem.gluten = ifGluten;
      burgerItem.lactose = ifLactose;
      this.burgercontent = burgerItem.name;
		}
  }
});

var burgers = [menuItem("test", 300, true,true), menuItem("test", 300, true,true), menuItem("test", 300, true,true)];

vmMenu.menuItem("test",399,true,true);

