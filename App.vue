<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from "vue-router";
import RepositoryNavigation from "@/components/RepositoryNavigation.vue";
import { authorizationData } from "@/services/LocalStorageService";
import { ref } from "vue";

const refIsAuthorized = ref(authorizationData.isAuthorized());

authorizationData.watch((isAuth) => {
  refIsAuthorized.value = authorizationData.isAuthorized();
  console.log("OnStorage:", isAuth);
  if (!isAuth) useRouter().push("/Login");
});

if (!refIsAuthorized.value) useRouter().push("/Login");
</script>

<template>
  <v-app id="app">
    <RepositoryNavigation v-if="refIsAuthorized" />
    <v-main app>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
body {
  background-color: rgb(var(--v-theme-surface-light));
}
</style>
