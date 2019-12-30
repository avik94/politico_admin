import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class MajorCouncil extends Vue {
  name = "Major-council";
  localCouncil = "";
  majorCouncil = "";
  items = ["local council1", "local council2"]

  submit(){
    
  }
}