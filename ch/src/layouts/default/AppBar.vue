<template>
    <v-card class="pt-3 pb-3 elevation-3">
      <div class="d-flex align-center">
          <v-btn href="/" variant="plain" class="d-flex elevation-0"><div class="ml-16 mr-2 Making">Making </div>
          <div class="Gunpowder font-weight-black "> Gunpowder</div></v-btn>
          <!-- <v-menu
          open-on-hover
          >
            <template v-slot:activator="{ props }">
              <v-btn
              color="primary"
              v-bind="props"
              >
              Dropdown
              </v-btn>
            </template>
  
            <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
          </v-menu> -->
          
          
          <v-btn  v-if="!loggedin"  href="login" class="mr-16 ml-auto" variant="plain">Log in
          </v-btn>
          <!-- <v-btn @click="clear()" v-if="loggedin" variant="plain" class="mr-16 ml-auto">Hello {{ username }}</v-btn> -->
          <v-menu v-if="loggedin">
      <template v-slot:activator="{ props }">
        <v-btn class="mr-16 ml-auto"
          v-bind="props"
          variant="plain"
        >
          Hello {{ username }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <v-btn class="elevation-0" @click="clear()">Log out</v-btn>
          <v-btn class="elevation-0" @click="toggleTheme()">Change Theme</v-btn>

        </v-list-item>
      </v-list>
    </v-menu>
    </div>

    </v-card>
</template>
<script setup>
import { useTheme } from "vuetify";
const theme = useTheme();
theme.global.name.value = window.localStorage.getItem("theme");

const toggleTheme = () => {
  if(theme.global.name.value=="dark"){
    theme.global.name.value = "light";
    window.localStorage.setItem("theme","light")
  }else {theme.global.name.value = "dark"
  window.localStorage.setItem("theme","dark")

}

  // Optional: Get value of current theme
};
</script>

<script>
  export default{
    data() {
     return {
       loggedin: false,
       username: '',
       items: [0]
     }
    },
    mounted(){
      if(sessionStorage.getItem('username')!=null){
        this.username=sessionStorage.getItem('username')
        this.loggedin = true
      }


    },
    methods:{
      clear(){
        window.sessionStorage.clear()
        window.location.reload()
      },
    }

  }
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap');
</style>
<style>
  .Gunpowder{
    font-family: 'Dancing Script', cursive;
    font-size: 20px;
  background: linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
    }
  .Making{
    font-family: 'Bree Serif', serif;
    font-size: 17px;
  }
</style>