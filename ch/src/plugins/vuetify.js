/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
const customDarkTheme = {
  colors: {
    background: "#15202b",
    surface: "#121212",
    primary: "#3f51b5",
    secondary: "#03dac6",
    error: "#f44336",
    info: "#2196F3",
    success: "#4caf50",
    warning: "#fb8c00",
    text: '#000000',
  },
};
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      customDarkTheme,
      light: {
        colors: {
          primary: '#1867C0',
          text: '#ffffff',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
