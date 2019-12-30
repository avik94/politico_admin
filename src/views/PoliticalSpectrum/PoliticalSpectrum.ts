import Vue from "vue";
import { Component } from "vue-property-decorator";


@Component({
  components: {
  }
})


export default class PoliticalSpectrum extends Vue {
  
  election = "";
  name = "";
  min = "";
  max = "";
  issue = "";

  items = ["election1", "election2"];

  submit(){
    
  }
  
}