import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// How to import a single component globally:
//
// import BaseIcon from "@/components/BaseIcon.vue"
// Vue.component("BaseIcon", BaseIcon)

// How to import multiple components globally
//
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const requireComponent = require.context(
  "./components", // Which directory to search within
  false, // Search subdirectories
  /Base[A-Z]\w+\.(vue|js)$/ // Regex
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
