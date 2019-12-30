import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from 'axios';

@Component({
  components: {
  }
})
export default class LocalCouncilList extends Vue {
  dialog= false;
  loading= false;
  valid= true;
  editIndex = 0;
  editData:any = ""
  baseUrl = "";
  token = "";

  componentLoader = false;
  mainComponent = false;

  /*==== input fields variables ======*/
  distric = "";
  localCouncil = "";

  /*==== dropdown variables ======*/
  items= [];

  /*==== data table varibles ======*/
  headers = [
    { text: 'Id', value: 'localCouncilId' },
    { text: 'Local Council Name', value: 'localCouncilName' },
    { text: 'Distric Name', value: 'districName' },
    { text: 'Distric Id', value: 'districId', align: ' d-none' },
    { text: 'Active', value: 'active', align: ' d-none' },
    { text: 'Actions', value: 'action', sortable: false }
  ]
  data = [];

  /*======= operations ======*/
  async created(){
    this.componentLoader = true;
    this.mainComponent = false;
    this.baseUrl = this.$store.state.baseUrl;
    this.token = this.$store.state.token;
    //geting all distric list
    const districData = await axios.post(this.baseUrl+"get-all-district-list", {"token": this.token});
    const newDistData = districData.data.data.map((el:any)=>{
      return {
        id: el.id,
        name: el.name
      }
    })
    this.items = newDistData;

    // getting all local council data
    const resData = await axios.post(this.baseUrl+"get-all-local-council-list",{"token": this.token});
    const newData = resData.data.data.map((el:any)=>{
      return {
        localCouncilId: el.id,
        localCouncilName: el.name,
        active: el.active,
        districId: el.district.id,
        districName: el.district.name
      }
    });
    this.data = newData;
    this.componentLoader = false;
    this.mainComponent = true;
  }

  async submit(){
    this.loading = true;
    if(this.editIndex === 0){
      const data = {                       // New Insert
        "token": this.token,
        "name" : this.localCouncil,
        "districtId": this.distric
      }
      const resData = await axios.post(this.baseUrl+"add-edit-local-council",data)
    }else{                                // Edits Records
      if (typeof(this.distric) === "number"){
        const data = {
          "token": this.token,
          "name": this.localCouncil,
          "districtId": this.distric,
          "id": this.editData.localCouncilId,
          "active": this.editData.active
        
        }
      const resData = await axios.post(this.baseUrl+"add-edit-local-council",data)  
      }else{
        const data = {
            "token": this.token,
            "name": this.localCouncil,
            // @ts-ignore
            "districtId": this.distric.id,
            "id": this.editData.localCouncilId,
            "active": this.editData.active
          
        }
        const resData = await axios.post(this.baseUrl+"add-edit-local-council",data)
      }
    }
    // getting all local council data
    const resData = await axios.post(this.baseUrl+"get-all-local-council-list",{"token": this.token});
    const newData = resData.data.data.map((el:any)=>{
      return {
        localCouncilId: el.id,
        localCouncilName: el.name,
        active: el.active,
        districId: el.district.id,
        districName: el.district.name
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
    this.localCouncil = item.localCouncilName;
    // @ts-ignore
    this.distric = {name:item.districName,id:item.districId}
    this.dialog = true;
    this.editIndex =1;
    this.editData = item
    console.log(this.editData);
  }

  newItem(){
    // @ts-ignore
    this.$refs.form.reset();
    this.editIndex = 0;
  }
}