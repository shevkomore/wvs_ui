<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps<{
    request: ()=>Promise<unknown>,
}>()

const data: Ref<unknown> = ref()
const isLoading = ref(true)


function runRequest(request: ()=>Promise<unknown>){
  isLoading.value = true
  request().then((result) => {
    data.value = result
    isLoading.value = false
  })
  .catch((reason) => {
    if(reason.id)
        router.replace({ name: 'error', params: reason})
    else router.replace(reason)
  })
}

runRequest(props.request)

defineExpose({runRequest})
</script>
<template>
  <v-overlay v-if="isLoading" contained class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="52" />
  </v-overlay>
  <slot v-else :result="data"></slot>
</template>
