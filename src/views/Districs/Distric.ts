import Vue from "vue";
import { Component } from "vue-property-decorator";


@Component({
  components: {
  }
})


export default class Distric extends Vue {
  name = "Distric";
  distric = "";
  state = ""
  items = [
    "Stat1", "State2"
  ]

  submit(){
    
  }
}