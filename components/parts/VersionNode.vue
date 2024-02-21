<script setup lang="ts">
import VersionDataService from '@/services/VersionDataService';
import type { Version } from '@/services/models/Repository';
import type { StyleValue } from 'vue';
import { type Ref, ref, onMounted } from 'vue';
import Loader from '../Loader.vue';

    //  Models
    const version = defineModel<Version>('version',{required: true})
    const repositoryId = defineModel<string>('repositoryId',{required: true})
    //  Emits
    const emit = defineEmits<{
        mounted:[element:HTMLElement]
    }>()
    //  Local variables
    const div:Ref<HTMLDivElement|undefined> = ref()
    const styleObj:Ref<StyleValue> = ref({
        backgroundColor: '#'+version.value.color,
    })
    //  Component switches
    const expandNode = ref(false)
    const imageLoader: Ref<InstanceType<typeof Loader>|undefined> = ref()


    const loadImage = () => new Promise((resolve,reject) => {
       VersionDataService.image(
        repositoryId.value,
        version.value.imageLocation!)
        .then((res) => {
          var image = new Blob(
            [res.data],
            {type: res.headers['Content-Type']?.toString()??"image/png"}
          )
          resolve(URL.createObjectURL(image))
        })
        .catch(err => reject(err.response??'500'))
    })


    onMounted(() => {
        if(!div.value) return
        emit('mounted',div.value)
    })
</script>

<template>
  <div ref="div">
    <v-sheet
      @click="expandNode = !expandNode"
      :style="styleObj"
      rounded="xl"
      width="200"
      height="180"
      class="d-flex flex-column align-center flex-nowrap version justify-space-between"
      transition="slide-x-transition"
      overflow-y="scroll"
    >
      <div v-show="!expandNode" class="text-h6 font-weight-black node-title">
        {{ version.name }}
      </div>
      <Loader
        v-if="version.imageLocation"
        ref="imageLoader"
        :request="loadImage"
        v-slot="{ result }"
      >
        <img class="node-image" v-show="!expandNode" :src="(result as string)" />
      </Loader>
      <div v-show="expandNode" class="node-title align-right">
        <v-icon
          class="node-icon"
          icon="mdi-rename"
          @click="
            $router.push({
              name: 'editversion',
              params: {
                repoid: repositoryId,
                versionid: version.id,
              },
            })
          "
        >
          <v-tooltip activator="parent" location="start"> Edit Version </v-tooltip>
        </v-icon>
      </div>
      <div v-show="expandNode" class="node-title">
        {{ version.description ?? "No description" }}
      </div>
      <v-icon
        class="node-title flex-end"
        icon="mdi-plus-circle-outline"
        @click="
          $router.push({
            name: 'createversion',
            params: {
              repoid: repositoryId,
              parent: version.id,
            },
          })
        "
      >
        <v-tooltip text="Create new version" />
      </v-icon>
    </v-sheet>
  </div>
</template>

<style>
.version-old {
  width: 200px;
  aspect-ratio: 1.3/1;
  clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 10%, 90% 0);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-around;
  padding: 1%;
  box-shadow: #00000050 0.3em 0.3em inset;
  color: azure;
  text-shadow: #00000050 -1px 1px;
  cursor: pointer;
}

.version {
  padding: 8px;
  box-shadow: #ffffff71 1em 0.5em 2em inset, #00000021 -1em -0.5em 2em inset !important;
  cursor: pointer;
}
.version-title {
  display: flex;
  flex-flow: row nowrap;
}
.node-title {
  background: inherit;
  color: transparent !important;
  background-clip: text !important;
  filter: invert(1) hue-rotate(160deg) !important;
}
.node-icon {
  background: inherit;
  color: transparent !important;
  background-clip: text !important;
  filter: invert(0.5) hue-rotate(160deg) !important;
}
.align-right {
  align-self: flex-end;
}
.node-image {
  max-width: 80%;
  max-height: 80%;
}
</style>
