<script setup lang="ts">
  const isSelected = defineModel<boolean>('selected',{default:false})
  const emit = defineEmits<{
    click: [isSelected:boolean]
  }>()
  
  function switchActive(){
    //isSelected.value = !isSelected.value
    emit('click',isSelected.value);
  }
</script>

<template>
  <v-btn 
    block 
    density="compact" 
    rounded="0"
    :variant="isSelected?'tonal':undefined"
    @click="switchActive()">
    <slot></slot>
  </v-btn>
</template>