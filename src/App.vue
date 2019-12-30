<template>
  <!-- <v-container fluid> -->
  <v-app> 
    <!-- <v-content> -->
      <router-view  />
    <!-- </v-content> -->
  </v-app>
  <!-- </v-container> -->
</template>

<style lang="scss">
.profilePic {
  height: 80px;
  width: 80px;
  margin-bottom: 8px;
  border: 2px solid pink;
  background: #37373f;
}
.headerSidebar {
  background: #27323a; 
  padding: 15px;
}
.navbarHeader{
  background-image: linear-gradient(to left, #c7ccce , #98999e );
} 
.leftSidebar{
  background-image: linear-gradient(to bottom, #13161a , #031f36 );
}
.contentBackground{
  background: #e6edf0;
}
</style>
<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator"
@Component
export default class App extends Vue {
  drawer = null
    items =  [
      // { title: "State", icon: "mdi-view-dashboard", url: "/" },
      { title: "State", icon: "mdi-view-dashboard", url: "/state-list" },
      // { title: "Distric", icon: "mdi-image", url: "/distric" },
      { title: "Distric", icon: "mdi-image", url: "/distric-list" },
      // { title: "Local Council", icon: "mdi-help-box", url: "/local-council"},
      { title: "Local Council", icon: "mdi-help-box", url: "/local-council-list"},
      // { title: "Major Council", icon: "mdi-view-dashboard", url: "/major-council" },
      { title: "Major Bill", icon: "mdi-view-dashboard", url: "/major-council-list" },
      // { title: "Election", icon: "mdi-view-dashboard", url: "/election" },
      { title: "Election", icon: "mdi-view-dashboard", url: "/election-list" },
      // { title: "Political Spectrum", icon: "mdi-view-dashboard", url: "/political-spectrum" },
      { title: "Political Spectrum", icon: "mdi-view-dashboard", url: "/political-spectrum-list" },
      
    ]
}
</script>
