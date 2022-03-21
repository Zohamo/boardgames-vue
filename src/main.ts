import Vue from "vue";
import App from "./App.vue";
import moment from "moment";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
import store from "@/store";

Vue.config.productionTip = false;

Vue.filter("date", function (value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

Vue.filter("roman", function (num) {
  if (isNaN(num)) {
    return num;
  }
  const digits = String(+num).split("");
  const key = [
    "",
    "C",
    "CC",
    "CCC",
    "CD",
    "D",
    "DC",
    "DCC",
    "DCCC",
    "CM",
    "",
    "X",
    "XX",
    "XXX",
    "XL",
    "L",
    "LX",
    "LXX",
    "LXXX",
    "XC",
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
  ];
  let roman = "";
  let i = 3;
  while (i--) {
    roman = (key[+digits.pop() + i * 10] || "") + roman;
  }
  return Array(+digits.join("") + 1).join("M") + roman;
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
