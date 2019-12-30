import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from 'axios';

@Component({
  components: {
  }
})
export default class DistricList extends Vue {
  dialog= false;
  loading= false;
  valid= true;
  editIndex = 0;
  editData:any = ""
  baseUrl = "";
  token = "";

  componentLoader = false;
  mainComponent = false;

  /*======= input fields variables ======*/
  state = "";
  distric = "";

  /*======= dropdown variables ======*/
  items = [
    "State 1", "State 2"
  ]

  /*======= data table varibles ======*/
  headers= [
    { text: 'Id', value: 'districId' },
    { text: 'Distric Name', value: 'districName' },
    { text: 'State Name', value: 'stateName' },
    { text: 'State Id', value: 'stateId', align: ' d-none' },
    { text: 'Active', value: 'active', align: ' d-none' },
    { text: 'Actions', value: 'action', sortable: false }
  ]
  data = [
    // {id : 1, name: "us", active: true}
  ];

  /*======= operations ======*/
  async created(){
    this.componentLoader = true;
    this.mainComponent = false;
    this.baseUrl = this.$store.state.baseUrl;
    this.token = this.$store.state.token;
    // geting all state list
    const stateData = await axios.post(this.baseUrl+"get-all-state-list", {"token": this.token});
    this.items = stateData.data.data;

    // geting all distric data
    const resData = await axios.post(this.baseUrl+"get-all-district-list",{"token": this.token});
    const newData = resData.data.data.map((el:any)=>{
      return {
        districId: el.id,
        districName: el.name,
        active: el.active,
        stateId: el.state.id,
        stateName: el.state.name
      }
    });
    this.data = newData;
    this.componentLoader = false;
    this.mainComponent = true;

  }

  async submit(){
    this.loading = true;
    if(this.editIndex === 0){                 // New insert
      const data = {
        "token": this.token,
        "name" : this.distric,
        "stateId": this.state
      }
      // console.log(data)
      const resData = await axios.post(this.baseUrl+"add-edit-district",data)
    }else{                                    // Edits Records
      if (typeof(this.state) === "number"){
        const data = {
          "token": this.token,
          "id"   : this.editData.districId,
          "name" : this.distric,
          "stateId": this.state,
          "active": this.editData.active
        }
        console.log(data);
        const resData = await axios.post(this.baseUrl+"add-edit-district",data);

      }
      else{
        const data = {
          "token": this.token,
          "id"   : this.editData.districId,
          "name" : this.distric,
          // @ts-ignore
          "stateId": this.state.id,
          "active": this.editData.active
        }
        console.log(data);
        const resData = await axios.post(this.baseUrl+"add-edit-district",data);
      }
      
      // console.log(resData.data)
    }
    const resData = await axios.post(this.baseUrl+"get-all-district-list",{"token": this.token})
    // console.log(resData.data.data)
    const newData = resData.data.data.map((el:any)=>{
      return {
        districId: el.id,
        districName: el.name,
        active: el.active,
        stateId: el.state.id,
        stateName: el.state.name
      }
    });
    this.data = newData;
    this.loading = false;
    this.dialog = false;
    // @ts-ignore
    this.$refs.form.reset();
    this.editIndex = 0
  }

  /* ===== choosing item for edit =====*/
  async editItem(item:any){
    // @ts-ignore
    this.state = {name:item.stateName, id:item.stateId};
    this.distric = item.districName;
    this.dialog = true;
    this.editIndex =1;
    this.editData = item
  }

  newItem(){
    // @ts-ignore
    this.$refs.form.reset();
    this.editIndex = 0;
  }
}