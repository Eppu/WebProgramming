"use strict";

// **********
let app1data = {
  el: "#app",
  data:{
    message:"Hello Vue!"
  }
};
let app1 = new Vue(app1data);
// **********
let app2data = {
  el: "#app2",
  data:{
    message:"You loaded this page on " + new Date().toLocaleString()
  }
};
let app2 = new Vue(app2data);
// **********
let app3data = {
  el: "#app3",
  data: {
    seen: true
  }
};
let app3 = new Vue(app3data);
// **********
let app4data = {
  el: "#app4",
  data: {
    todos: [
      { text: "Learn JavaScript", time:"05.30" },
      { text: "Learn Vue", time:"06.30"},
      { text: "Build something awesome", time:"the rest of your life" }
    ]
  }
};
let app4 = new Vue(app4data);
// **********
let app5data = {
  el: "#app5",
  data:{
    message:"This string will be reversed"
  },
  methods:{
    reverseMessage: function(){
      this.message = this.message.split("").reverse().join("");
    }
  }
};
let app5 = new Vue(app5data);
// **********
let app6data = {
  el: "#app6",
  data:{
    message: "Type something"
  }
};
let app6 = new Vue(app6data);
