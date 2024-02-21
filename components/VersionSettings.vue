<script setup lang="ts">
import type { Version } from '@/services/models/Repository';
import type { VersionForm } from '@/services/models/Version';
import { ref, type Ref } from 'vue';
import rgbHex from 'rgb-hex'

const model = defineModel<VersionForm>('version', {required:true})
const intermediaryImage: Ref<File[]> = ref([])
if(model.value.image)
    intermediaryImage.value.push(model.value.image)
const intermediaryColor:Ref<string> = ref(model.value.color)
const emits = defineEmits<{
    submit:[value:Version]
}>()

function updateImage(data:File[]){
    if(data.length == 0)
        model.value.image = undefined
    else model.value.image = data[0]
}
function updateColor(data:any){
  console.log(data)
    model.value.color = data.slice(1,7)
}
</script>
<template>
  <v-text-field label="Name" v-model="model.name" :counter="15" required />
  <v-text-field label="Description" v-model="model.description" :counter="100" />
  <v-file-input
    label="Image"
    v-model="intermediaryImage"
    @update:model-value="updateImage($event)"
    accept="image/png, image/jpeg, image/bmp"
    prepend-icon="mdi-camera"
  >
  </v-file-input>
  <v-color-picker
    label="Node Color"
    v-model="intermediaryColor"
    hide-inputs
    show-swatches
    swatches-max-height="150px"
    @update:model-value="updateColor($event)"
  />
</template>
