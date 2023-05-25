<template>
  <div class="">
    <v-card class=" h-screen ml-3 mt-3 mr-3 mb-3 elevation-5">
      <div class=" ml-4 mt-4d-flex d-flex flex-column justify-center">
        <div class="mt-16 mb-16 r">

                <div class="d-flex justify-center"><h1 class="text-h2" style="font-family: 'Bebas Neue', sans-serif;">Making Gunpowder</h1></div>

          <div class="d-flex justify-center mt-5"><h1 class="text-h4" style="font-family: 'Bebas Neue', sans-serif;">Only three ingredients</h1></div>

          <kinesis-container class="mt-10">
            <div fluid class="d-flex justify-center"><kinesis-element 
                  class="card1"
                  :strength="20"
                  type="rotate"
                  transformOrigin="60% 300%"
                  axis="x"
                  ><img class="rounded-xl" src="./Salpeter.jpg"></kinesis-element>
            <kinesis-element 
                  class="card2"

                  :strength="-20"
                  type="rotate"
                  transformOrigin="50% 300%"
                  axis="x"
                  ><img class="rounded-xl" src="./sulfur.jpg" ></kinesis-element>
            <kinesis-element 
                  class="card3"

                  :strength="50"
                  type="translate"
                  axis="x"
                  ><img class="rounded-xl" src="./charcoal.jpg" ></kinesis-element>
                </div>
          </kinesis-container>
        </div>
        <div class="mb-16"></div>
        <div class="mb-16"></div>
        <div class="ml-16 mr-16 mt-16 d-flex justify-center"><v-card variant="tonal" width="500">
          <v-card-title class="pt-6 pl-10 pr-10">How to</v-card-title>
          <v-card-text>öalskdfj</v-card-text>
        </v-card></div>
        <div class="d-flex justify-center mt-16"><v-card width="500">
          <v-form @submit.prevent="post"><v-text-field v-model="comment" v-if="loggedin==true" class="pl-5 pr-5" label="Comment" variant="underlined"></v-text-field>
          <v-btn type="submit"></v-btn></v-form>
          <v-card-title v-if="loggedin==false" class="pl-5 pr-5">To comment, you need to be logged in</v-card-title>
        </v-card></div>
      </div>
    </v-card>
  </div>
</template>
<script>
  import axios from 'axios'

  export default{
    data() {
    return {
      loggedin: false,
      comment: '',
    }
    },
    methods:{
      Log(){
        if(window.sessionStorage.getItem("username")!=null){
      this.loggedin=true
    }
      },
      async post(){
        axios.post("http://localhost:3001/post",{
          content:{
            username: window.sessionStorage.getItem("username"),
            password: window.sessionStorage.getItem("password"),
            comment: this.comment,
            time: new Date(),

          }
        }).then((response)=> {
          console.log(response.data)
          })
          .catch(function (error) {
              console.log(error)
          })
      }
    },
    mounted() {
      this.Log()
    },
  }

</script>
<style>
.card1 {
  position: absolute;
}

.card2 {
  position: absolute;
}
.card3 {
  position: absolute;
}

</style>