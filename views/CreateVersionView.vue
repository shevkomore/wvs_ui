<script setup lang="ts">
import { ref, type Ref } from 'vue';
import VersionDataService from '@/services/VersionDataService';
import type { Version } from '@/services/models/Repository';
import { repositoryKey } from '@/store/modules/repository';
import { useStore } from 'vuex';
import { ZipArchive } from "@shortercode/webzip";
import Loader from '@/components/Loader.vue';
import VersionSettings from '@/components/VersionSettings.vue';
import RequestPanel from '@/components/RequestPanel.vue';
import { viewFromVersion, type VersionForm } from '@/services/models/Version';
import { useRouter } from 'vue-router';
import { defaultNodeColor } from '@/configuration';

const fileRules = [
    (value:File[]) => {
        let sum = 0
        for(let file of value) sum += file.size
        if(sum>=20000000)
            return 'File size must be below 20 MB!'
        return true
    }
]

const props = defineProps<{
    repoid:string,
    parent?:string
}>()
const store = useStore(repositoryKey)
const router = useRouter()

const data: Ref<File[]> = ref([])
const imgFile: Ref<File|undefined> = ref()
const version: Ref<VersionForm> = ref({
    repositoryId:props.repoid,
    parent: props.parent??"",
    color: defaultNodeColor,
    name: "New Node"
})
const isResolvingUpdate = ref(false)

function resolveCreate(){
    isResolvingUpdate.value = true
    VersionDataService.create(version.value!, props.repoid)
    .then(() => {
        router.push({name:"view", params:{id:props.repoid}})
    })
    .catch((ex) => {
        try{router.push({name:"error", params:{id:ex.response.status}})}
        catch{console.log(ex)}
    })
}
</script>

<template>
  <RequestPanel persistent>
    <h2 v-if="!props.parent">Create the first version:</h2>
    <v-form @submit.prevent="resolveCreate()">
      <v-file-input
        label="Version Data"
        v-model="data"
        chips
        :rules="fileRules"
        @update:model-value="version.data = data[0] ?? undefined"
      ></v-file-input>
      <template v-if="version.data">
        <VersionSettings v-model:version="version" />
        <br />
        <v-btn type="submit" :loading="isResolvingUpdate"> Create Version </v-btn>
      </template>
    </v-form>
  </RequestPanel>
</template>
