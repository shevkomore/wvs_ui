<script setup lang="ts">
import { ref, type Ref } from 'vue';
import VersionDataService from '@/services/VersionDataService';
import type { Version } from '@/services/models/Repository';
import { repositoryKey } from '@/store/modules/repository';
import { useStore } from 'vuex';
import Loader from '@/components/Loader.vue';
import VersionSettings from '@/components/VersionSettings.vue';
import RequestPanel from '@/components/RequestPanel.vue';
import { viewFromVersion, type VersionForm } from '@/services/models/Version';
import { useRouter } from 'vue-router';
import { defaultNodeColor } from '@/configuration';


const props = defineProps<{
    repoid:string,
    versionid:string
}>()
const store = useStore(repositoryKey)
const router = useRouter()
console.log("edit inputs:",props)
const imgFile: Ref<File|undefined> = ref()
const version: Ref<VersionForm> = ref({
    repositoryId:props.repoid,
    color: defaultNodeColor,
    name: ""
})
const isResolvingUpdate = ref(false)

const getVersion = () => new Promise((resolve,reject)=>{
    async function loadImage(data:Version){
        if(!data.imageLocation) return
        let res = await VersionDataService.image(props.repoid,data.imageLocation)
        imgFile.value = new File(
                [res.data],
                data.imageLocation+".png",
                {
                    type: res.headers['Content-Type']?.toString()??"image/png",
                    lastModified: Date.now()
                })
    }
    if(store.state?.id == props.repoid)
        try{
            let res = ([] as Version[])
                .concat(...Object.values(store.state?.versions))
                .find((o => o.id == props.versionid))
            console.log("res:", res)
            if(res) {
                loadImage(res).then().catch().finally(() => {
                    console.log("afterLoadImage")
                    version.value = viewFromVersion(
                    res!,
                    props.repoid,
                    imgFile.value
                    )
                    resolve(version.value);
                })
                return
            }
        }catch(ex){} //if error or not found - just use next approach

    VersionDataService.details(props.repoid,props.versionid)
        .then(res => {
            loadImage(res.data).then().catch().finally(() => {
                version.value = viewFromVersion(
                    res.data,
                    props.repoid,
                    imgFile.value
                )
                resolve(version.value);
            })
        })
        .catch(() => reject(
            {
                id:"404",
                title:"Not Found",
                description:"The version you're looking for does not exist in given repository."
            }
        )
    )
})

function resolveUpdate(){
    isResolvingUpdate.value = true
    VersionDataService.edit(version.value!, props.repoid)
    .then(() => {
        router.push({name:"view", params:{repoid:props.repoid}})
    })
    .catch((ex) => {
        router.push({name:"error", params:{id:ex.response.status}})
    })
}
</script>

<template>
  <RequestPanel persistent>
    <Loader :request="getVersion" v-slot="loaded">
      <v-form @submit.prevent="resolveUpdate()">
        <VersionSettings v-model:version="version" />
        <br />
        <v-btn type="submit" :loading="isResolvingUpdate"> Save Changes </v-btn>
      </v-form>
    </Loader>
  </RequestPanel>
</template>
