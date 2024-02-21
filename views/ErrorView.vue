<script setup lang="ts">
import errorPages from "@/errorPages";
import { navigationKey } from "@/store/modules/navigation";
import { ref } from "vue";
import { useStore } from "vuex";

const navBack = useStore(navigationKey);
const props = defineProps<{
  id: string;
  title?: string;
  description?: string;
}>();
const title = ref(props.title);
const description = ref(props.description);
if (!props.title || props.title.trim() == "") title.value = errorPages[props.id]?.title;
if (!props.description || props.description.trim() == "")
  description.value = errorPages[props.id]?.description;
</script>
<template>
  <v-container fill-width class="d-flex align-center flex-column">
    <v-sheet width="600" height="400" color="error" class="error-text" rounded="xl">
      {{ id }}
    </v-sheet>
    <br />
    <h1>{{ title }}</h1>
    <br />
    {{ description }}
    <br />
    <div>
      <v-btn @click="$router.push(navBack.state)" style="margin-right: 20px"
        >Return</v-btn
      >
      <v-btn link to="/Login">Log into your account</v-btn>
    </div>
  </v-container>
</template>
<style>
.error-text {
  font-size: 300px;
}
</style>
