<script setup lang="ts">
import { type Ref, ref, watch, onUnmounted } from 'vue';
import LeaderLine from 'leader-line-new'

const alignOuter:Ref<HTMLDivElement|undefined> = ref<HTMLDivElement>()
const alignInnerOffset:Ref<{x:number,y:number}> = ref({x:0,y:0})
const alignInner:Ref<HTMLDivElement|undefined> = ref<HTMLDivElement>()

const lines = defineModel<LeaderLine[]>('lines', {default: []})
function positionAll(){
    lines.value.forEach(o => {
        o.position()
    })
}
watch(lines, (update, old) => {
    document.querySelectorAll(".leader-line").forEach(line => alignInner.value!.appendChild(line))
    positionAll()
    var removed = old.filter(o => update.indexOf(o) < 0)
    removed.forEach(o => o.remove())
})
onresize = () => {alignInnerOffset.value = {
  x: (((alignOuter.value?.getBoundingClientRect().left??0) + window.scrollX)*-1),
  y: (((alignOuter.value?.getBoundingClientRect().top??0) + window.scrollY)*-1)};
  document.querySelectorAll(".leader-line").forEach(line => alignInner.value!.appendChild(line))
  positionAll()
  }
onUnmounted(() => {
  lines.value.forEach(o => o.remove())
})
</script>

<template>
  <div ref="alignOuter">
    <div
      :style="{
        position: 'relative',
        transform: 'translate(' + alignInnerOffset.x + 'px,' + alignInnerOffset.y + 'px)',
      }"
      ref="alignInner"
    ></div>
  </div>
</template>
