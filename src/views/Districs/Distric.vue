<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-row style="padding:20px">
            <v-col cols="4">
               <v-select
                :items="items"
                v-model="state"
                label="Select State"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="distric"
                label="Add Distric"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <div class="my-2">
                <v-btn medium color="primary" @click="submit()">Submit</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" src = "./Distric.ts">
</script>

<style lang = "scss" scoped>

</style>