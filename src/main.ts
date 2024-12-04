import { createApp } from "vue";
import App from "./App.vue";
import "vuetify/styles";
import * as echarts from "echarts";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "virtual:windi.css";
const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");
