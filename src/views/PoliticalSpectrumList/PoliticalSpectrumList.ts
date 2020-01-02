import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from 'axios';
import Test from '../../components/Test.vue'

@Component({
  components: {
    Test
  }
})
export default class PoliticalSpectrumList extends Vue {
  dialog= false;
  dialog2= false;
  loading= false;
  valid= true;
  editIndex = 0;
  editData:any = ""
  baseUrl = "";
  token = "";
  inject = ['theme'];

  componentLoader = false;
  mainComponent = false;

  table = false;

  /*==== input fields variables ======*/
  election = "";
  election2 = "";
  spectrum = "";
  min = "";
  max = "";
  issue = "";

  spectrumText = "";
  issueText = "";

  spectrumMcq = "";
  issueMcq = "";
  answerMcq = "";

  /*===== dropdown variables ======*/
  items= [];
  items2= [];
  /*===== type dropdown =====*/
  selectTypeItem = ["Bard", "Mcq", "Text"];
  chooseOption = [2,3,4,5,6,7,8,9,10]

  bird = false;
  mcq = false;
  text = false;
  buttonSubmit = false;

  /*===== data table varibles ======*/
  headers = [
    { text: 'Id', value: 'id' },
    { text: 'Political Spectrum Name', value: 'spectrum' },
    { text: 'Min', value: 'lowText' },
    { text: 'Max', value: 'highText' },
    { text: 'Issue', value: 'issueName' },
    { text: 'Answer', value: 'answers' },
    // { text: 'Election Name', value: 'electionName' },
    // { text: 'Election Id', value: 'electionId', align: ' d-none' },
    // { text: 'Active', value: 'active', align: ' d-none' },
    { text: 'Actions', value: 'action', sortable: false }
  ]
  data = [ ];

  /*======= operations ======*/
  async created(){
    this.componentLoader = true;
    this.mainComponent = false;
    this.baseUrl = this.$store.state.baseUrl;
    this.token = this.$store.state.token;
    console.log(this.token)
    //geting all distric list
    const districData = await axios.post(this.baseUrl+"get-all-election-list", {"token": this.token});
    console.log(districData.data.data)    
    const newDistData = districData.data.data.map((el:any)=>{
      return {
        id: el.id,
        name: el.name
      }
    })
    this.items = newDistData;
    this.items2 = newDistData;
    this.componentLoader = false;
    this.mainComponent = true;
  }

  async submit(){
    this.loading = true;
    if(this.editIndex === 0){
      const data = {                       // New Insert
        "token": this.token,
        "name" : this.spectrum,
        "electionId": this.election,
        "minName": this.min,
        "maxName": this.max,
        "issue": this.issue
      }
      console.log(data)
      const resData = await axios.post(this.baseUrl+"add-edit-political-spectrum",data);
      const res = await axios.post(this.baseUrl+"get-political-spectrum-list",{
        token: this.token,
        electionId: this.election
      })
      this.data = res.data.data
      this.election2 = this.election
    }else{                                // Edits Records
      console.log(typeof(this.election))
      if(typeof(this.election) === "number"){
        const data = {
          "token": this.token,
          "name" : this.spectrum,
          "electionId": this.election,
          "minName": this.min,
          "maxName": this.max,
          "issue": this.issue,
          "id": this.editData.id,
          "active": true        
        }
        console.log(data);
        const resData = await axios.post(this.baseUrl+"add-edit-political-spectrum",data);
        const res = await axios.post(this.baseUrl+"get-political-spectrum-list",{
          token: this.token,
          electionId: this.election
        })
        this.data = res.data.data;
        this.election2 = this.election;
      }else{
        const data = {
          "token": this.token,
          "name" : this.spectrum,
          // @ts-ignore
          "electionId": this.election.id,
          "minName": this.min,
          "maxName": this.max,
          "issue": this.issue,
          "id": this.editData.id,
          "active": true        
        }
        console.log(data);
        const resData = await axios.post(this.baseUrl+"add-edit-political-spectrum",data);
        const res = await axios.post(this.baseUrl+"get-political-spectrum-list",{
          token: this.token,
          // @ts-ignore
          electionId: this.election.id
        })
        this.data = res.data.data;
        // @ts-ignore
        this.election2 = this.election.id
      }      
    }
    this.loading = false;
    this.dialog = false;
    this.dialog2 = false;
    // @ts-ignore
    this.$refs.form.reset();
    this.editIndex = 0
  }

  /* ===== choosing item for edit =====*/
  async editItem(item:any){
    this.spectrum = item.spectrum;
    // @ts-ignore
    this.election = {name:item.electionName,id:this.election2}
    this.min = item.lowText;
    this.max = item.highText;
    this.issue = item.issueName;
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

  async selectElection(item:any){
    console.log(item)
    const data = {
      token: this.token,
      electionId: item
    }
    const res = await axios.post(this.baseUrl+"get-political-spectrum-list",data)
    this.data = res.data.data
    this.table = true;
  }

  // type checking
  itemChanged(data:any){
    console.log(data);
    this.buttonSubmit = true;
    if(data === "Bard"){
      this.bird = true;
      this.text = false;
      this.mcq = false;
    }
    else if(data === "Mcq"){
      this.bird = false;
      this.text = false;
      this.mcq = true;
    }
    else if(data === "Text"){
      this.bird = false;
      this.text = true;
      this.mcq = false;
    }
  }

  // :rules="[v => !!v || 'Item is required']"
}