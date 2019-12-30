import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from 'axios';

@Component({
  components: {
  }
})
// @ts-ignore
export default class StateList extends Vue {
  dialog= false;
  loading= false;
  valid= true;
  editIndex = 0;
  editData:any = "";
  baseUrl = "";
  token = ""

  componentLoader = false;
  mainComponent = false;

  // input fields variables
  state = "";
  
  // data table varibles
  headers= [
    { text: 'Id', value: 'id' },
    { text: 'State Name', value: 'name' },
    { text: 'Active', value: 'active', align: ' d-none' },
    { text: 'Actions', value: 'action', sortable: false },
  ]
  data = [ ];


  // operations

  async created(){
    this.componentLoader = true;
    this.mainComponent = false;

    this.baseUrl = this.$store.state.baseUrl;
    this.token = this.$store.state.token;
    const data = {
      "token": this.token
    }
    const resData = await axios.post(this.baseUrl+"get-all-state-list", data);
    this.data = resData.data.data;
    this.componentLoader = false;
    this.mainComponent = true;
  }

  async submit(){
    this.loading = true;
    if(this.editIndex === 0){
      const data = {
        "token": this.token,
        "name" : this.state
      }
      console.log(data)
      const resData = await axios.post(this.baseUrl+"add-edit-state", data);
    }else{
      const data = {
        "token": this.token,
        "name" : this.state,
        "id"   :this.editData.id
      }
      console.log(data)
      const resData = await axios.post(this.baseUrl+"add-edit-state", data);
    }
    const dataTable = {
      "token": this.token
    }
    const resDataTable = await axios.post(this.baseUrl+"get-all-state-list", dataTable);
    this.data = resDataTable.data.data;

    this.loading = false;
    this.dialog = false;
    // @ts-ignore
    this.$refs.form.reset();
    this.editIndex = 0
  }
    
  // choosing item for edit
  async editItem(item:any){
    this.state = item.name
    this.dialog = true;
    this.editIndex =1;
    this.editData = item
  }

  newItem(){
    if(this.state != ""){
      // @ts-ignore    
      this.$refs.form.reset();
    }
    this.editIndex = 0;
  }
}