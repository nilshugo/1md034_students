var vmMenu = new Vue({
  el: '#wrapper',
  data: {
    burgercontent: ""
  },
  methods: {
    testAppend: function() {
      var div = document.createElement("div");
      div.innerHTML = "test done";
      this.burgercontent = div;
    },
    createMenu: function() {

    }
  }
});

vmMenu.testAppend();

