<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="">
    <v-card class="  ml-3 mt-3 mr-3 mb-3 elevation-5">
      <div class=" ml-4 mt-4d-flex d-flex flex-column justify-center">
        <div class="mt-16 mb-16">

                <div class="d-flex justify-center"><h1 class="text-h2" style="font-family: 'Bebas Neue', sans-serif;">Making Gunpowder</h1></div>

          <div class="d-flex justify-center mt-5 m-auto"><h1 class="text-h4" style="font-family: 'Bebas Neue', sans-serif;">Only three ingredients</h1></div>

          <kinesis-container class="mt-10 m-auto">
            <div fluid class="d-flex justify-center"><kinesis-element 
                  class="card1"
                  :strength="30"
                  type="rotate"
                  transformOrigin="60% 400%"
                  axis="x"
                  ><img :style="{ 'width': '300px' }" class="rounded-xl elevation-2" src="./Salpeter.jpg"></kinesis-element>
            <kinesis-element 
                  class="card2"

                  :strength="-30"
                  type="rotate"
                  transformOrigin="50% 400%"
                  axis="x"
                  ><img :style="[{ 'width': '300px' }]" class="rounded-xl elevation-2" src="./sulfur.jpg" ></kinesis-element>
            <kinesis-element 
                  class="card3"

                  :strength="50"
                  type="translate"
                  axis="x"
                  ><img :style="[{ 'width': '320px' }]" class="rounded-xl elevation-2 m-auto" src="./charcoal.jpg" ></kinesis-element>
                </div>
          </kinesis-container>
        </div>
        <div class="mb-16"></div>
        <div class="mb-16"></div>
        
        <div :style="{'z-index': '0'}" class="justify-center d-flex"><v-card  class="d-flex align-center elevation-20 justify-center mt-16 flex-wrap rounded-xl pt-3 pb-3" :style="{ 'max-width': '1100px' }">        
          <div class=" d-flex justify-center mr-2 mt-2 ml-2 mb-2"><v-card class="rounded-xl elevation-1" :style="{ 'max-width': '500px' }" variant="tonal" >
          <v-card-title class="pt-6 pl-10 pr-10">The first step</v-card-title>
          <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, odit facere inventore suscipit quae rerum? Debitis placeat exercitationem, atque vero magnam sit dolor quia libero quasi corrupti, porro inventore itaque.</v-card-text>
        </v-card></div>
        <div class=" d-flex justify-center mr-2 mt-2 ml-2 mb-2"><v-card class="rounded-xl elevation-1" :style="{ 'max-width': '500px' }" variant="tonal" >
          <v-card-title class="pt-6 pl-10 pr-10 ">Second Step</v-card-title>
          <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, odit facere inventore suscipit quae rerum? Debitis placeat exercitationem, atque vero magnam sit dolor quia libero quasi corrupti, porro inventore itaque.</v-card-text>
        </v-card></div>
        <div class=" d-flex justify-center mr-2 mt-2 ml-2 mb-2"><v-card class="rounded-xl elevation-1" :style="{ 'max-width': '500px' }" variant="tonal" >
          <v-card-title class="pt-6 pl-10 pr-10 ">Third Step</v-card-title>
          <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, odit facere inventore suscipit quae rerum? Debitis placeat exercitationem, atque vero magnam sit dolor quia libero quasi corrupti, porro inventore itaque.</v-card-text>
        </v-card></div>
      </v-card></div>


        <div class="d-flex justify-center mt-16"><v-card width="500" class="elevation-20 rounded-xl"><v-card-title >Comment Section</v-card-title>
          <v-form @submit.prevent="post"><v-text-field v-model="comment" v-if="loggedin==true" class="pl-5 pr-5" label="Write a comment..." variant="underlined"></v-text-field>
          <!-- <v-btn v-if="loggedin==true" type="submit"></v-btn> -->
          </v-form>
          <v-card-title v-if="loggedin==false" class="pl-5 pr-5">To comment, you need to be logged in</v-card-title>
          <div class="d-flex justify-center" v-for="c in (commentObject)">
            <v-card class="mb-3 pl-4 pr-4" :style="{ 'width': '350px'}" variant="tonal">
              <div class=" d-flex align-center"><div class=" text-h6 mr-6">{{c.username}}</div>
              <div class="font-weight-light mr-3">{{ localDate(c.time)[0] }}</div>
              <div class="font-weight-light">{{ localDate(c.time)[1] }}</div>
            </div>

              <div>{{c.text}}</div>
            </v-card></div>
          <div class="mb-3"></div>
        </v-card></div>

      </div>
      <div class="mb-10"></div>
    </v-card>
  </div>
  <div class="mb-3"></div>

</template>

<script setup>
  import { useTheme } from "vuetify";
  const theme = useTheme();
  theme.global.name.value = window.localStorage.getItem("theme");
</script>

<script>
  import axios from 'axios'

  export default{
    data() {
    return {
      loggedin: false,
      comment: '',
      commentObject: '',
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
            time: (new Date()),

          }
        }).then((response)=> {
          console.log(response.data)
          this.loadcomments()
          this.comment = ""
          })
          .catch(function (error) {
              console.log(error)
          })
      },
      async loadcomments(){
        axios.get("http://localhost:3001/comments").then((response)=>{
          this.commentObject = response.data

          console.log(response.data)
        }).catch((error)=>{
          console.log(error)
        })
      },
      localDate( utcString){
        const utcDate = new Date(utcString);        
        const day = String(utcDate.getDate()).padStart(2, '0');
        const month = String(utcDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = String(utcDate.getFullYear());
        const clock = String(utcDate.getHours())+":"+String(utcDate.getMinutes());

        return [day +"."+ month +"."+ year,clock]

      }
    },
    mounted() {
      this.Log(),
      this.loadcomments()
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