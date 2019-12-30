import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from 'axios';

@Component
export default class LocalCouncil extends Vue {

  created(){}
  name = "Local-Council";
  distric = "";
  localCouncil = "";
  items= ["distric1", "distric2"];

  submit(){
    
  }
}