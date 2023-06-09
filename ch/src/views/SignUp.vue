<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-sheet width="400" class="mx-auto">
          <v-form fast-fail @submit.prevent="signup">
            <div class="w-full d-flex justify-center mb-2">
                <h3>{{ exists }}</h3>
            </div>
              <v-text-field v-model="username" label="User Name"></v-text-field>

              <v-text-field v-model="password" :rules="nameRules" type="password" label="password"></v-text-field>

              <v-btn type="submit" color="primary" block class="mt-2">Sign Up</v-btn>
              
            </v-form>
            <div class="mt-2">
                <p class="text-body-2">Already have an account? <a href="login">Log in</a></p>
            </div>

      </v-sheet>
  </div>
</template>

<script>
  import axios from 'axios'
  import CryptoJS from 'crypto-js';
  import dotenv from 'dotenv';
  dotenv.config(); // Load environment variables from .env
  const port = process.env.API_URL;

export default  {

  data() {
      return {
          username: '',
          password: '',
          nameRules: [
            v => !!v || 'Password is required',
            v => /(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter and one uppercase letter',
          ]
      };
  },
  methods: {
      encryptPassword(password) {
          const encryptedPassword = CryptoJS.SHA256(password).toString();
          return encryptedPassword;
      },

      async signup() {
          axios.post(port+'/signup', {
              content: {
                  username: this.username,
                  password: this.encryptPassword(this.password),
                  exists: ''
              }
          })
          .then((response)=> {
              if(response.data==true){
                  window.sessionStorage.setItem('username', this.username)
                  window.sessionStorage.setItem('password', this.encryptPassword(this.password))

                  window.location.href = '/';
              }
              else{
                this.exists='This username is already taken'
              }
          })
          .catch(function (error) {
              console.log(error)
          })
      },
  },
}
</script>