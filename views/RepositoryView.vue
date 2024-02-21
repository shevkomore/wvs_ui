<script setup lang="ts">
import RepositoryDataService from '@/services/RepositoryDataService';
import type { Repository } from '@/services/models/Repository';
import { ref, watch, type Ref } from 'vue';
import RepositoryDisplay from '@/components/RepositoryDisplay.vue';
import Loader from '@/components/Loader.vue';

    const props = defineProps<{
        repoid: string
    }>()
    const loader: Ref<InstanceType<typeof Loader>|undefined> = ref()


    const getRepository = () => new Promise((resolve, reject) => {
        RepositoryDataService.details(props.repoid)
        .then(res => resolve(res.data as Repository))
        .catch(err => reject(err.response??'500'))
    })

    watch(props,() =>
            loader.value?.runRequest(getRepository)
        )
</script>

<template>
  <Loader ref="loader" :request="getRepository" v-slot="loaded">
    <RepositoryDisplay :repository="(loaded.result as Repository)" />
  </Loader>
  <slot></slot>
</template>
