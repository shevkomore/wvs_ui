<script setup lang="ts">
import RepositoryDataService from '@/services/RepositoryDataService';
import type { RepositoryParams } from '@/services/models/Repository';
import { type Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import RequestPanel from '@/components/RequestPanel.vue';

const router = useRouter()

const repo: Ref<RepositoryParams> = ref({
    Name: "New Repository",
    Description: ""
})
const isResolving = ref(false)

function resolveCreate(){
    isResolving.value = true
    RepositoryDataService.create(repo.value)
    .then((res) => {
        router.push({name:"view", params:{id:res.data}})
    })
    .catch((ex) => {
        router.push({name:"error", params:{id:ex.responce.status}})
    })
}
</script>

<template>
  <RequestPanel persistent>
    <v-form @submit.prevent="resolveCreate()">
      <v-text-field title="Name" :counter="20" v-model="repo.Name"> </v-text-field>
      <v-text-field title="Description" :counter="100" v-model="repo.Description">
      </v-text-field>
      <v-btn block :loading="isResolving" @click="resolveCreate()">
        Create Repository
      </v-btn>
    </v-form>
  </RequestPanel>
</template>
