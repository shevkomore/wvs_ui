<script setup lang="ts">
import RepositoryDataService from '@/services/RepositoryDataService';
import type { RepositoryParams } from '@/services/models/Repository';
import { type Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import RequestPanel from '@/components/RequestPanel.vue';
import Loader from '@/components/Loader.vue';

const router = useRouter()
const props = defineProps<{
    repoid:string
}>()

const repo: Ref<RepositoryParams> = ref({
    Name: "",
    Description: ""
})
const isResolving = ref(false)

const loadRepo = () => new Promise((resolve,reject) => {
    RepositoryDataService.details(props.repoid)
    .then(res => {
        repo.value.Name = res.data.name
        repo.value.Description = res.data.description
        resolve(repo.value)
    })
    .catch(err => reject({id:err.responce.status}))
})

function resolveCreate(){
    isResolving.value = true
    RepositoryDataService.edit(props.repoid, repo.value)
    .then((res) => {
        router.push({name:"view", params:{id:res.data}})
    })
    .catch((ex) => {
        router.push({name:"error", params:{id:ex.response.status}})
    })
}
</script>

<template>
  <RequestPanel persistent>
    <Loader :request="loadRepo">
      <v-form @submit.prevent="resolveCreate()">
        <v-text-field title="Name" :counter="20" v-model="repo.Name"> </v-text-field>
        <v-text-field title="Description" :counter="100" v-model="repo.Description">
        </v-text-field>
        <v-btn block :loading="isResolving" @click="resolveCreate()">
          Save Changes
        </v-btn>
      </v-form>
    </Loader>
  </RequestPanel>
</template>
