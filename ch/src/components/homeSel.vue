<template>
    <div class=" d-flex justify-center flex-wrap mt-4 h-100 mb-4">
        <v-btn onclick="window.location.href = '/howto'" style=" width: 48%;" class="mr-2 flex-wrap button-30 h-100">
        <div class="d-flex justify-center align-center">
            <v-card-title>Tutorial</v-card-title>
        </div>
        </v-btn>
        <v-btn onclick="window.location.href = '/chemistry'" style=" width: 48%; " class="ml-2 button-30 flex-wrap h-100">
        <div class="d-flex justify-center align-center">
            <v-card-title>The Chemistry behind it</v-card-title>
        </div>
        </v-btn>
    </div>
</template>

<style>



/* CSS */ 
.button-30 {
  align-items: center;
  appearance: none;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: text;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.button-30:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-8px);
}

.button-30:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}
</style>