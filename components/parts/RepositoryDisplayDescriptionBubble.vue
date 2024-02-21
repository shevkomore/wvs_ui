<template>
  <div class="position">
    <div class="title-container">
      <div class="text title text-h5 text-lg-h4">
        <slot name="title"></slot>
      </div>
      <div class="transition-corner"></div>
      <div style="padding: 5px"><slot name="buttons"></slot></div>
    </div>
    <div class="text description text-subtitle-2"><slot></slot></div>
  </div>
</template>

<style scoped>
.position {
  position: fixed;
  bottom: 30px;
  margin-left: auto;
  margin-right: auto;
}
.text {
  background-color: rgb(var(--v-theme-surface-light));
  width: fit-content;
  padding: 10px;
  border-radius: 10px;
}
.title-container {
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-end;
}
.title {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  position: relative;
  bottom: -2px;
  max-width: 75vw;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
.description {
  min-width: 100%;
  max-width: 90vw;
  overflow-wrap: break-word;
  border-top-left-radius: 0;
}

.transition-corner {
  position: relative;
  width: 18px;
  height: 18px;
  bottom: 0; /* SET LATER */
  border-bottom: 8px solid rgb(var(--v-theme-surface-light));
  border-left: 8px solid rgb(var(--v-theme-surface-light));
  border-bottom-left-radius: 18px;
  left: -8px;
  bottom: -8px;
}
</style>
