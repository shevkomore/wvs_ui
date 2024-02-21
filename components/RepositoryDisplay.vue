<script setup lang="ts">
import type { Repository, Version } from '@/services/models/Repository';
import RepositoryDisplayDescriptionBubble from './parts/RepositoryDisplayDescriptionBubble.vue';
import { type Ref, ref } from 'vue';
import VersionNode from '@/components/parts/VersionNode.vue'
import LineAnchor from './parts/LineAnchor.vue';
import LeaderLine from 'leader-line-new';
import { repositoryKey } from '@/store/modules/repository';
import { useStore } from 'vuex';
import configuration from '@/configuration';
import { useRouter } from 'vue-router';

  const store = useStore(repositoryKey)

  const props = defineProps<{
    repository: Repository
  }>()
  if(props.repository)
    store.dispatch(configuration.storeActions.setRepository, props.repository)
  if(!props.repository.versions[""])
    useRouter().push({name:'createversion', params:{repoid:props.repository.id,parent:""}})

  const versionNodes:Ref<{[id:string]:HTMLElement}> = ref({})
  const lines: Ref<LeaderLine[]> = ref([])


  // after version nodes have been created.
  function onNodeMounted(version:Version, element:HTMLElement){
    versionNodes.value[version.id] = element;
    // Create an arrow from parent version to child version
    if(version.parent && version.parent != "")
      lines.value.push(new LeaderLine(
        versionNodes.value[version.parent],
        element,
        {
          startSocket:'bottom',
          endSocket:'top',
          color:'gray'
        })
    )
  }
</script>

<template>
  <!--Versions-->
  <LineAnchor v-model:lines="lines" />
  <div class="version-grid">
    <div class="version-row" v-for="(versionSet, key) in repository.versions">
      <VersionNode
        v-for="(_, index) in versionSet"
        v-model:version="repository.versions[key][index]"
        v-model:repositoryId="repository.id"
        @mounted="onNodeMounted(repository.versions[key][index], $event)"
      />
    </div>
  </div>
  <!--Title-->
  <RepositoryDisplayDescriptionBubble>
    <template #title>
      {{ props.repository.name }}
    </template>
    {{ props.repository.description }}
    <template #buttons>
      <v-icon
        color="secondary"
        style="cursor: pointer"
        icon="mdi-rename"
        @click="$router.push({ name: 'edit', params: { repoid: props.repository.id } })"
      ></v-icon>
    </template>
  </RepositoryDisplayDescriptionBubble>
</template>

<style scoped>
.version-grid {
  display: grid;
  grid: auto-flow / 1;
  row-gap: 6rem;
  padding-bottom: 20vh;
}
.version-row {
  display: flex;
  flex-flow: row-reverse wrap;
  justify-items: start;
  justify-content: start;
}
.version-row > * {
  margin-left: 10vw;
  margin-right: 10vw;
}
</style>
