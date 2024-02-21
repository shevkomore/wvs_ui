<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  persistent?: boolean;
}>();
const alwaysOn = ref(true);
</script>
<template>
  <v-dialog
    v-model="alwaysOn"
    :persistent="props.persistent"
    :no-click-animation="props.persistent"
    width="500"
  >
    <v-responsive max-height="500" class="overflow-auto">
      <v-card text-align="center">
        <v-container>
          <slot></slot>
        </v-container>
      </v-card>
    </v-responsive>
  </v-dialog>
</template>
<style scoped></style>
