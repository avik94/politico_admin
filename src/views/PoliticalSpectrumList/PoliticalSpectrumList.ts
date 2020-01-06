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
  minMcq = "";
  maxMcq = ""

  /*===== dropdown variables ======*/
  items= [];
  items2= [];
  /*===== type dropdown =====*/
  selectTypeItem = ["bard", "mcq", "text"];
  chooseOption = [2,3,4,5,6,7,8,9,10];
  selectType = "";

  answer:any = [];
  answerVal:any = []

  bird = false;
  mcq = false;
  text = false;
  buttonSubmit = false;
  option = "";

  /*===== data table varibles ======*/
  headers = [
    { text: 'Id', value: 'id' },
    { text: 'Political Spectrum Name', value: 'spectrum' },
    { text: 'Min', value: 'lowText' },
    { text: 'Max', value: 'highText' },
    { text: 'Issue', value: 'issueName' },
    { text: 'Answer', value: 'answers' },
    { text: 'Type', value: 'type' },
    // { text: 'Election Name', value: 'electionName' },
    // { text: 'Election Id', value: 'electionId', align: ' d-none' },
    // { text: 'Active', value: 'active', align: ' d-none' },
    { text: 'Actions', value: 'action', sortable: false }
  ]
  data:any = [ ];

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
    if(this.selectType === "mcq"){
      const data = {                       // New Insert
          "token": this.token,
          "name" : this.spectrumMcq,
          "electionId": this.election,
          "minName": this.minMcq,
          "maxName": this.maxMcq,
          "issue": this.issueMcq,
          "type": this.selectType,
          "answers": [...this.answerVal]
        }
      console.log(data);  
      const resData = await axios.post(this.baseUrl+"add-edit-political-spectrum",data);
      console.log(resData.data.data)
    }else if(this.selectType === "bard"){
      const data = {
        "token": this.token,
        "name" : this.spectrum,
        "electionId": this.election,
        "minName": this.min,
        "maxName": this.max,
        "issue": this.issue,
        "type": this.selectType,
      }
      console.log(data);
      const resData = await axios.post(this.baseUrl+"add-edit-political-spectrum",data);
      console.log(resData.data.data)
    }else if(this.selectType === "text"){
      const data = {
        "token": this.token,
        "name" : this.spectrumText,
        "electionId": this.election,
        "issue": this.issueText,
        "type": this.selectType,
      }
      console.log(data);
      const resData = await axios.post(this.baseUrl+"add-edit-political-spectrum",data);
      console.log(resData.data.data)
    }
    this.loading = false;
    this.dialog2 = false;
    const res = await axios.post(this.baseUrl+"get-political-spectrum-list",{
      token: this.token,
      electionId: this.election
    })
    let arr = []
    for(let el of res.data.data){
      if(el.answers){
        arr.push({
          id:el.id,
          spectrum:el.spectrum,
          issueName:el.issueName,
          lowText:el.lowText,
          highText:el.highText,
          type:el.type,
          answers:el.answers.join("|")
        })
      }else{
        arr.push({
          id:el.id,
          spectrum:el.spectrum,
          issueName:el.issueName,
          lowText:el.lowText,
          highText:el.highText,
          type:el.type,
          answers:el.answers
        })
      }        
    }
    console.log(arr);
    this.data = arr;
    this.election2 = this.election;
  }

  async editDataSave(){
    this.loading = true;    
    if(this.selectType === "mcq"){
      if(typeof(this.election) === "number"){
        const data = {                       
          "token": this.token,
          "name" : this.spectrumMcq,
          "electionId": this.election,
          "minName": this.minMcq,
          "maxName": this.maxMcq,
          "issue": this.issueMcq,
          "type": this.selectType,
          "id": this.editData.id,
          "answers": [...this.answerVal]
        }
        const resData = await axios.post(this.baseUrl+"add-edit-political-spectrum",data);
        const res = await axios.post(this.baseUrl+"get-political-spectrum-list",{
          token: this.token,
          electionId: this.election
        })
        let arr = []
        for(let el of res.data.data){
          if(el.answers){
            console.log(el.answers.join("|"))
            arr.push({
              id:el.id,
              spectrum:el.spectrum,
              issueName:el.issueName,
              lowText:el.lowText,
              highText:el.highText,
              type:el.type,
              answers:el.answers.join("|")
            })
          }else{
            arr.push({
              id:el.id,
              spectrum:el.spectrum,
              issueName:el.issueName,
              lowText:el.lowText,
              highText:el.highText,
              type:el.type,
              answers:el.answers
            })
          }
          console.log(el)
          
        }
        console.log(arr);
        this.data = arr;
        this.election2 = this.election;
      }else{
        const data = {                       
          "token": this.token,
          "name" : this.spectrumMcq,          
          // @ts-ignore
          "electionId": this.election.id,
          "minName": this.minMcq,
          "maxName": this.maxMcq,
          "issue": this.issueMcq,
          "type": this.selectType,
          "id": this.editData.id,
          "answers": [...this.answerVal]
        }
      const resData = await axios.post(this.baseUrl+"add-edit-political-spectrum",data);
      const res = await axios.post(this.baseUrl+"get-political-spectrum-list",{
        token: this.token,
        // @ts-ignore
        electionId: this.election.id
      })
      let arr = []
      for(let el of res.data.data){
        if(el.answers){
          arr.push({
            id:el.id,
            spectrum:el.spectrum,
            issueName:el.issueName,
            lowText:el.lowText,
            highText:el.highText,
            type:el.type,
            answers:el.answers.join("|")
          })
        }else{
          arr.push({
            id:el.id,
            spectrum:el.spectrum,
            issueName:el.issueName,
            lowText:el.lowText,
            highText:el.highText,
            type:el.type,
            answers:el.answers
          })
        }        
      }
      console.log(arr);
      this.data = arr;
       // @ts-ignore
      this.election2 = this.election.id;
      }
      
    }else if(this.selectType === "bard"){
      if(typeof(this.election) === "number"){
        const data = {
          "token": this.token,
          "name" : this.spectrum,
          "electionId": this.election,
          "minName": this.min,
          "maxName": this.max,
          "id": this.editData.id,
          "issue": this.issue,
          "type": this.selectType,
        }
        const resData = await axios.post(this.baseUrl+"add-edit-political-spectrum",data);
        const res = await axios.post(this.baseUrl+"get-political-spectrum-list",{
          token: this.token,
          electionId: this.election
        })
        let arr = []
        for(let el of res.data.data){
          if(el.answers){
            arr.push({
              id:el.id,
              spectrum:el.spectrum,
              issueName:el.issueName,
              lowText:el.lowText,
              highText:el.highText,
              type:el.type,
              answers:el.answers.join("|")
            })
          }else{
            arr.push({
              id:el.id,
              spectrum:el.spectrum,
              issueName:el.issueName,
              lowText:el.lowText,
              highText:el.highText,
              type:el.type,
              answers:el.answers
            })
          }        
        }
        console.log(arr);
        this.data = arr;
        this.election2 = this.election;
      }else{
        const data = {
          "token": this.token,
          "name" : this.spectrum,
          // @ts-ignore
          "electionId": this.election.id,
          "minName": this.min,
          "maxName": this.max,
          "id": this.editData.id,
          "issue": this.issue,
          "type": this.selectType,
        }
        const resData = await axios.post(this.baseUrl+"add-edit-political-spectrum",data);
        const res = await axios.post(this.baseUrl+"get-political-spectrum-list",{
          token: this.token,
          // @ts-ignore
          electionId: this.election.id
        })
        let arr = []
        for(let el of res.data.data){
          if(el.answers){
            arr.push({
              id:el.id,
              spectrum:el.spectrum,
              issueName:el.issueName,
              lowText:el.lowText,
              highText:el.highText,
              type:el.type,
              answers:el.answers.join("|")
            })
          }else{
            arr.push({
              id:el.id,
              spectrum:el.spectrum,
              issueName:el.issueName,
              lowText:el.lowText,
              highText:el.highText,
              type:el.type,
              answers:el.answers
            })
          }        
        }
        console.log(arr);
        this.data = arr;
         // @ts-ignore
        this.election2 = this.election.id;
      }
      
    }else if(this.selectType === "text"){
      if(typeof(this.election) === "number"){
        const data = {
          "token": this.token,
          "name" : this.spectrumText,
          "electionId": this.election,
          "id": this.editData.id,
          "issue": this.issueText,
          "type": this.selectType,
        }
        const resData = await axios.post(this.baseUrl+"add-edit-political-spectrum",data);
        const res = await axios.post(this.baseUrl+"get-political-spectrum-list",{
          token: this.token,
          // @ts-ignore
          electionId: this.election
        })
        let arr = []
        for(let el of res.data.data){
          if(el.answers){
            arr.push({
              id:el.id,
              spectrum:el.spectrum,
              issueName:el.issueName,
              lowText:el.lowText,
              highText:el.highText,
              type:el.type,
              answers:el.answers.join("|")
            })
          }else{
            arr.push({
              id:el.id,
              spectrum:el.spectrum,
              issueName:el.issueName,
              lowText:el.lowText,
              highText:el.highText,
              type:el.type,
              answers:el.answers
            })
          }        
        }
        console.log(arr);
        this.data = arr;
        this.election2 = this.election;
      }
      else{
        const data = {
          "token": this.token,
          "name" : this.spectrumText,
          // @ts-ignore
          "electionId": this.election.id,
          "id": this.editData.id,
          "issue": this.issueText,
          "type": this.selectType,
        }
        const resData = await axios.post(this.baseUrl+"add-edit-political-spectrum",data);
        const res = await axios.post(this.baseUrl+"get-political-spectrum-list",{
          token: this.token,
          // @ts-ignore
          electionId: this.election.id
        })
        let arr = []
        for(let el of res.data.data){
          if(el.answers){
            arr.push({
              id:el.id,
              spectrum:el.spectrum,
              issueName:el.issueName,
              lowText:el.lowText,
              highText:el.highText,
              type:el.type,
              answers:el.answers.join("|")
            })
          }else{
            arr.push({
              id:el.id,
              spectrum:el.spectrum,
              issueName:el.issueName,
              lowText:el.lowText,
              highText:el.highText,
              type:el.type,
              answers:el.answers
            })
          }        
        }
        console.log(arr);
        this.data = arr;
        // @ts-ignore
        this.election2 = this.election.id;
      }      
    }
    this.loading = false;
    this.dialog = false;

  }
  /* ===== choosing item for edit =====*/
  async editItem(item:any){
    this.selectType = item.type
    // @ts-ignore
    this.election = {name:"", id:this.election2}
    console.log(this.selectType)
    if(item.type === "bard"){
      this.bird = true;
      this.text = false;
      this.mcq = false;
      this.spectrum = item.spectrum;
      this.min = item.lowText;
      this.max = item.highText;
      this.issue = item.issueName;
    }
    else if(item.type  === "mcq"){
      this.answer = [];
      this.answerVal = [];
      this.bird = false;
      this.text = false;
      this.mcq = true;
      this.spectrumMcq = item.spectrum;
      this.issueMcq = item.issueName;
      this.minMcq = item.lowText;
      this.maxMcq = item.highText;
      let x = item.answers.split("|");
      this.answerVal = x;
      for(let i of x){
        this.answer.push("")
      }
    }
    else if(item.type  === "text"){
      this.bird = false;
      this.text = true;
      this.mcq = false;
      this.spectrumText = item.spectrum;
      this.issueText = item.issueName;
    }
    this.dialog = true;
    this.editData = item;
    console.log(this.editData);
  }

  newItem(){
    this.selectType = "mcq";    
    // this.editIndex = 0;   
    this.bird = false;
    this.text = false;
    this.mcq = true;
    // @ts-ignore
    this.$refs.form.reset();
    this.buttonSubmit = true;
  }

  async selectElection(item:any){
    console.log(item)
    const data = {
      token: this.token,
      electionId: item
    }
    console.log(data)
    const res = await axios.post(this.baseUrl+"get-political-spectrum-list",data)
    // this.data = res.data.data
    // console.log(res.data.data)
    // this.data = res.data.data
    let arr = []
    for(let el of res.data.data){
      if(el.answers){
        console.log(el.answers.join("|"))
        arr.push({
          id:el.id,
          spectrum:el.spectrum,
          issueName:el.issueName,
          lowText:el.lowText,
          highText:el.highText,
          type:el.type,
          answers:el.answers.join("|")
        })
      }else{
        arr.push({
          id:el.id,
          spectrum:el.spectrum,
          issueName:el.issueName,
          lowText:el.lowText,
          highText:el.highText,
          type:el.type,
          answers:el.answers
        })
      }
      console.log(el)
      
    }
    console.log(arr);
    this.data = arr;
    this.table = true;
  }

  // type checking
  itemChanged(data:any){
    console.log(data);
    this.buttonSubmit = true;
    if(data === "bard"){
      this.bird = true;
      this.text = false;
      this.mcq = false;
    }
    else if(data === "mcq"){
      this.bird = false;
      this.text = false;
      this.mcq = true;
    }
    else if(data === "text"){
      this.bird = false;
      this.text = true;
      this.mcq = false;
    }
  }
  
  optionSelect(data:any){
    // console.log(data);
    this.answer = [];
    this.answerVal = [];
    for(let i=1; i<=data; i++){
      console.log(i);
      this.answer.push("");
      this.answerVal.push("")
    }

  }
  // :rules="[v => !!v || 'Item is required']"
}