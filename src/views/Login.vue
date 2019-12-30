<template>
  <v-container fluid style="background:grey;height:100vh">
    <v-row style="padding-top:70px;">
    <v-col cols="4"></v-col>
      <v-col cols="4" class="text-center">
        <v-img style="width:70%;margin:auto;" src="https://www.zreyastechnology.com/assets/images/Zreyas-Logo.png"></v-img>
        <v-card style="margin-top:10px">
          <v-row style="padding:20px">
            <v-col cols="12">
                <v-form ref="form">
                    <v-text-field
                        v-model="email"
                        label="Email"
                        outlined
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        outlined
                    ></v-text-field>
                </v-form>              
              <div class="my-2">
                <v-btn medium style="color:#f2f2f2;background-color: #0b5ea5;" @click="submit()">Login</v-btn>
              </div>
            </v-col>
            <v-alert v-if="warning" style="width:100%" :value="alert" color="pink" dark border="top" icon="mdi-alert-box" transition="scale-transition">
              Please Check Email Or Password
            </v-alert>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4"></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import axios from 'axios';

@Component
export default class Login extends Vue {
    email = "";
    password = "";
    warning = false;

    async submit(){
        const data = {
            "email": this.email,
            "password": this.password
        }
        const res = await axios.post('https://xuntasb2dc.execute-api.us-east-1.amazonaws.com/api/login',data)
        if(res.data.error === true){
            this.warning = true;
            setTimeout(()=>{
              this.warning = false;
            },1500)
        }else{
            this.$store.commit('storeToken',res.data.data.token);
            this.$router.push({ path: 'state-list' });
        }

    }
}
</script>