<template>
  <v-container fluid>
    <v-card class="text-center" v-if="componentLoader" style="height:85vh;padding-top:32.5vh">
      <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      ></v-progress-circular>
    </v-card>
    <v-row v-if="mainComponent">
      <v-col cols="6">
        <v-select
          v-model="election2"
          :items="items2"
          item-text="name"
          item-value="id"
          label="Select Election"
          outlined
          @input = "selectElection(election2);"
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-dialog v-model="dialog2" width="500" >
          <template v-slot:activator="{ on }">
            <v-btn color="red lighten-2" dark v-on="on" @click="newItem()">
              Add New
            </v-btn>
          </template>

          <v-card style="padding:20px">
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="selectType"
                  :items="selectTypeItem"
                  @input="itemChanged"
                  label="Select Type"
                  :rules="[v => !!v || 'Item is required']"
                  outlined
                ></v-select>
                <v-form  v-model="valid" ref="form">                  
                  <div v-if="bird">
                    <v-select
                      v-model="election"
                      :items="items"
                      item-text="name"
                      item-value="id"
                      label="Select Election"
                      outlined
                    ></v-select>

                    <v-text-field
                      v-model="spectrum"
                      label="Spectrum Name"
                      outlined
                    ></v-text-field>

                    <v-text-field
                      v-model="min"
                      label="Min Limit"
                      outlined
                    ></v-text-field>

                    <v-text-field
                      v-model="max"
                      label="Max Limit"
                      outlined
                    ></v-text-field>

                    <v-text-field
                      v-model="issue"
                      label="Issue"
                      outlined
                    ></v-text-field>
                  </div>

                  <div v-if="text">
                    <v-select
                      v-model="election"
                      :items="items"
                      item-text="name"
                      item-value="id"
                      label="Select Election"
                      outlined
                    ></v-select>

                    <v-text-field
                      v-model="spectrumText"
                      label="Spectrum Name"
                      outlined
                    ></v-text-field>

                    <v-text-field
                      v-model="issueText"
                      label="Issue"
                      outlined
                    ></v-text-field>
                  </div>
                  <div v-if="mcq">
                    <v-select
                      v-model="election"
                      :items="items"
                      item-text="name"
                      item-value="id"
                      label="Select Election"
                      outlined
                    ></v-select>

                    <v-text-field
                      v-model="spectrumMcq"
                      label="Spectrum Name"
                      outlined
                    ></v-text-field>

                    <v-text-field
                      v-model="issueMcq"
                      label="Issue"
                      outlined
                    ></v-text-field>

                    <v-select
                      v-model="election"
                      :items="chooseOption"
                      label="Choose Number of Answer"
                      outlined
                    ></v-select>

                    <v-text-field
                      v-model="answerMcq"
                      label="Answer"
                      outlined
                    ></v-text-field>

                  </div>
                </v-form>
                <v-btn v-if = "buttonSubmit" color="blue darken-1" dark @click="submit()" :disabled="!valid" :loading="loading">Save</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-col>  
    
      <v-col cols="12" v-if="table">
        <v-data-table :headers="headers" :items="data" class="elevation-1" >

        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-dialog v-model="dialog" max-width="500px">
              <!-- <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on" @click="newItem()">New Item</v-btn>
              </template> -->
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-form  v-model="valid" ref="form">
                          <v-select
                            v-model="election"
                            :items="items"
                            item-text="name"
                            item-value="id"
                            label="Select Election"
                            :rules="[v => !!v || 'Item is required']"
                            outlined
                          ></v-select>

                          <v-text-field
                            v-model="spectrum"
                            label="Spectrum Name"
                            :rules="[v => !!v || 'Item is required']"
                            outlined
                          ></v-text-field>

                          <v-text-field
                            v-model="min"
                            label="Min Limit"
                            :rules="[v => !!v || 'Item is required']"
                            outlined
                          ></v-text-field>

                          <v-text-field
                            v-model="max"
                            label="Max Limit"
                            :rules="[v => !!v || 'Item is required']"
                            outlined
                          ></v-text-field>

                          <v-text-field
                            v-model="issue"
                            label="Issue"
                            :rules="[v => !!v || 'Item is required']"
                            outlined
                          ></v-text-field>
                        </v-form>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- <v-btn color="blue darken-1" text @click="close">Cancel</v-btn> -->
                  <v-btn color="blue darken-1" dark @click="submit()" :disabled="!valid" :loading="loading">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <!-- <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon> -->
        </template>

        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts" src = './PoliticalSpectrumList.ts'>
</script>

<style lang="scss" scoped>

</style>


