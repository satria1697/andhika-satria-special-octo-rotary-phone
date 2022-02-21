<script setup lang="ts">
import {PropType, ref} from "vue";
import {Icon} from "@iconify/vue"

const position = ref(0)

const props = defineProps({
  images: {
    type: Array as PropType<Array<string>>,
    required: true
  },
  productName: {
    type: String as PropType<string>,
    required: true
  }
})

const handlePosition = (state: 'next' | 'prev') => {
  if (state === 'next') {
    if (position.value + 1 > props.images.length) {
      position.value = 0
    } else {
      position.value += 1
    }
  } else {
    if (position.value - 1 < 0) {
      position.value = props.images.length
    } else {
      position.value -= 1
    }
  }
}
</script>

<template>
  <div class="flex justify-center items-center h-full relative group">
    <div v-if="images.length" @click="handlePosition('prev')" class="left-2 chev">
      <icon class="text-4xl" icon="fa6-solid:circle-chevron-left" />
    </div>
    <img :alt="productName" class="rounded-md max-w-full" :src="images[position]"/>
    <div v-if="images.length" @click="handlePosition('next')" class="right-2 chev">
      <icon class="text-4xl" icon="fa6-solid:circle-chevron-right" />
    </div>
  </div>
</template>

<style>
.chev {
  @apply cursor-pointer hover:text-gray-200 transition invisible group-hover:visible transition absolute
}
</style>
