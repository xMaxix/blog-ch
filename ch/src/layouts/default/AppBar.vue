<template>
    <v-card class="pt-3 pb-3 elevation-3">
      <div class="d-flex align-center">
          <v-btn class="ml-16">Home</v-btn>
          <v-btn class="ml-6">Entries</v-btn>
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
          <v-btn @click="window.sessionStorage.clear()" v-if="loggedin" variant="plain" class="mr-16 ml-auto">Hello {{ username }}</v-btn>
    </div>

    </v-card>
</template>


<script>
  export default{
    data() {
     return {
       loggedin: false,
       username: ''
     }
    },
    mounted(){
      if(sessionStorage.getItem('username')!=null){
        this.username=sessionStorage.getItem('username')
        this.loggedin = true
      }
    },

  }
</script>
