<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-row style="padding:20px">
            <v-col cols="6">
               <v-select
                v-model="election"
                :items="items"
                label="Select Distric"
                outlined
              ></v-select>

              <v-text-field
                v-model="name"
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
              <div class="my-2">
                <v-btn medium color="primary" @click="submit()">Add</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" src = "./PoliticalSpectrum.ts">
</script>

<style lang = "scss" scoped>

</style>