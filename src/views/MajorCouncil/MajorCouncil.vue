<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-row style="padding:20px">
            <v-col cols="4">
               <v-select
                v-model="localCouncil"
                :items="items"
                label="Select Local Council"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="majorCouncil"
                label="Major Council"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="4">
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

<style lang = "scss" scoped>
</style>

<script lang="ts"  src = "./MajorCouncil.ts">

</script>

