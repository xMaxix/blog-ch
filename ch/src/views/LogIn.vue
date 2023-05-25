<template>
      <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form fast-fail @submit.prevent="login">
                <v-text-field v-model="username" label="User Name"></v-text-field>

                <v-text-field v-model="password" type="password" label="password"></v-text-field>

                <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>

            </v-form>
            <div class="mt-2">
                <p class="text-body-2">Don't have an account? <a href="signup">Sign Up</a></p>
            </div>
        </v-sheet>
    </div>

</template>
<script>
    import axios from 'axios'
    import CryptoJS from 'crypto-js';

export default  {

    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        encryptPassword(password) {
            const encryptedPassword = CryptoJS.SHA256(password).toString();
            return encryptedPassword;
        },

        async login() {
            axios.post('http://localhost:3001/login', {
                content: {
                    username: this.username,
                    password: this.encryptPassword(this.password)
                }
            })
            .then((response)=> {
                if(response.data==true){
                    window.sessionStorage.setItem('username', this.username)
                    window.sessionStorage.setItem('password', this.encryptPassword(this.password))
                    // better: a uuid, created in the backend gets sent to the frontend, which will be recreated every time the user logs in, will be used for authentitfication of requests
                    window.location.href = '/';
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
    },
}
</script>