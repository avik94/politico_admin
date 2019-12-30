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
      <v-col cols="12">
        <v-data-table :headers="headers" :items="data" class="elevation-1" >

        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on" @click="newItem()">New Item</v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-form  v-model="valid" ref="form">
                          <v-select
                            :items="items"
                            :rules="[v => !!v || 'Item is required']"
                            v-model="state"
                            item-text="name"
                            item-value="id"
                            label="Select State"
                            outlined
                          ></v-select>
                         <v-text-field
                          v-model="distric"
                          :rules="[v => !!v || 'Item is required']"
                          label="Distric Name"
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


<script lang="ts" src = './DistricList.ts'>
</script>

<style lang="scss" scoped>

</style>


