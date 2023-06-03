/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import VueKinesis from "vue-kinesis";
import VueFullPage from 'vue-fullpage.js'


///node_modules/.vite/deps/vue-typed-js

const app = createApp(App)
app.use(VueKinesis);
app.use(VueFullPage)

registerPlugins(app)
app.mount('#app')
