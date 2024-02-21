<script setup lang="ts">
import { ref, type Ref } from 'vue';
import RepositoryDataService from '@/services/RepositoryDataService';
import { AccessLevel, type AccessSettings } from '@/services/models/AccessLevel';
import type { RepositoryInfo } from '@/services/models/Repository';
import { authorizationData } from '@/services/LocalStorageService';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { default as sbtn } from '@/components/parts/AccessLevelSelectorButton.vue'
import { useStore } from 'vuex';

const route = useRoute()

const drawer = ref(true)
const listedRepos:Ref<RepositoryInfo[]> = ref([])
const loadingRepos:Ref<boolean> = ref(false)
const accessLevel:Ref<AccessSettings> = ref({canView:true})

const searchDelay:Ref<ReturnType<typeof setTimeout>|null> = ref(null)
function setAccessLevel(level:AccessLevel){
  let current = accessLevel.value
  switch(level){
    case AccessLevel.AUTHOR:
      current.isAuthor = !current.isAuthor
      current.canAdd
      = current.canRemove
      = current.canEdit
        = current.isAuthor
      break;
    case AccessLevel.EDIT:
      current.canEdit = !current.canEdit
      current.isAuthor &&= current.canEdit
      break;
    case AccessLevel.ADD:
      current.canAdd = !current.canAdd
      current.isAuthor &&= current.canAdd
      break;
    case AccessLevel.REMOVE:
      current.canRemove = !current.canRemove
      current.isAuthor &&= current.canRemove
      break;
  }

  //i.e. await till selection is done
  if(searchDelay.value)
    clearTimeout(searchDelay.value)
  searchDelay.value = setTimeout(searchWithLevel,400)
  loadingRepos.value = true
}
function searchWithLevel(){
  if(!authorizationData.isAuthorized())
    return
  loadingRepos.value = true
  RepositoryDataService.list(accessLevel.value)
  .then(res => {
    listedRepos.value = res.data
  })
  .catch(error => {
    console.log(error)
  })
  .finally(() => {
    loadingRepos.value = false
  })
}

function onMounted(){
  if(authorizationData.isAuthorized())
    searchWithLevel()
}
watch(authorizationData.isAuthorized,() =>{
  if(authorizationData.isAuthorized())
    searchWithLevel()
})
watch(() => route.params,
 () => {
  if(authorizationData.isAuthorized() && listedRepos.value.length == 0)
    searchWithLevel()
})
</script>

<template>
  <v-navigation-drawer location="left" scrim="false" v-model="drawer"
    ><v-btn
      v-slot:append
      variant="plain"
      icon="mdi-chevron-left"
      style="align-self: right; position: absolute; z-index: 1000"
      float="right"
      @click="drawer = false"
    ></v-btn>
    <v-list-item align="center">
      <h3 class="text-overline text-disabled">Access level</h3>
      <div class="access-level-selector elevation-4">
        <sbtn
          v-model:selected="accessLevel.isAuthor"
          @click="setAccessLevel(AccessLevel.AUTHOR)"
        >
          <v-icon color="disabled" icon="mdi-circle" size="smaller" />
          Author
          <v-icon color="disabled" icon="mdi-circle" size="smaller" />
        </sbtn>
        <sbtn
          v-model:selected="accessLevel.canEdit"
          @click="setAccessLevel(AccessLevel.EDIT)"
        >
          Edit
        </sbtn>
        <sbtn
          v-model:selected="accessLevel.canAdd"
          @click="setAccessLevel(AccessLevel.ADD)"
        >
          Add
        </sbtn>
        <sbtn
          v-model:selected="accessLevel.canRemove"
          @click="setAccessLevel(AccessLevel.REMOVE)"
        >
          Remove
        </sbtn>
      </div>
    </v-list-item>

    <v-divider></v-divider>

    <v-progress-linear indeterminate v-show="loadingRepos" />
    <v-list-item
      v-for="item of listedRepos"
      :title="item.name"
      :subtitle="'by ' + item.author"
      :to="'/' + item.repositoryId"
    />
    <v-divider></v-divider>
    <v-btn @click="$router.push({ name: 'createrepository' })">Create Repository</v-btn>
  </v-navigation-drawer>

  <v-btn
    block
    v-show="!drawer"
    icon="mdi-menu"
    @click="drawer = true"
    class="ma-2"
  ></v-btn>
</template>

<style scoped>
.access-level-selector {
  overflow: hidden;
  border-radius: 3rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 85%;
}
</style>
