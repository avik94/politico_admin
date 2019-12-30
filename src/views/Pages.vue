<template>
  <v-app>
    <v-navigation-drawer app dark class="leftSidebar" v-model="drawer" :width="280">
      <div class="text-center headerSidebar">
        <img
          style="border-radius: 50%;"
          class="profilePic"
          src="../assets/boy.svg"
          alt
        />
        <v-card-text class="white--text">Political Admin</v-card-text>
      </div>
      <v-list height="5" shaped dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.url">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="subtitle-2">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark class="navbarHeader" height="50">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <h3 style="padding-left:30px;color:rgb(81, 77, 77);">Politico Admin</h3>
    </v-app-bar>

    <v-content class="contentBackground">
      <router-view  />
    </v-content>
  </v-app>
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
export default class Pages extends Vue {
    drawer = null
    items =  [
      // { title: "State", icon: "mdi-view-dashboard", url: "/" },
      { title: "State", icon: "mdi-view-dashboard", url: "/state-list" },
      // { title: "Distric", icon: "mdi-image", url: "/distric" },
      { title: "District", icon: "mdi-image", url: "/distric-list" },
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