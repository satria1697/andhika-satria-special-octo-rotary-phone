<script setup lang="ts">
import {PropType} from "vue";
import {Product} from "../../../entities/Product";
import MSlider from "../../../components/MSlider.vue"
import {numberFormat} from "../../../utils/Formatter";
import {Icon} from '@iconify/vue'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})

const calculateDiscount = (price: number, discount: number): string => {
  if (discount !== 0) {
    return numberFormat(price * ((100 - discount) / 100))
  }
  return numberFormat(price)
}
</script>

<template>
  <div class="border border-gray-600 rounded-md flex flex-col justify-between">
    <m-slider :images="product.images" :product-name="product.product_name"/>
    <div class="p-4 flex flex-col border-t space-y-1">
      <span>{{ product.product_name }}</span>
      <div v-if="product.discount !== 0" class="flex space-x-2">
        <span class="bg-[#F96E24] text-white px-3 rounded-full">{{ product.discount }}%</span>
        <span :class="{'line-through': product.discount !== 0}">{{ numberFormat(product.price) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="price" v-if="product.discount !== 0">{{
            calculateDiscount(product.price, product.discount)
          }}</span>
        <span class="price" v-else>{{ numberFormat(product.price) }}</span>
      </div>
      <div class="flex" v-if="product.rating">
        <icon class="text-amber-300" v-for="i in product.rating" :key="i" icon="fa6-solid:star"/>
      </div>
      <div class="flex space-x-2 items-center">
        <icon v-if="product.is_priority_store" icon="fa6-solid:circle-check"/>
        <span>{{ product.city_name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price {
  @apply text-2xl font-bold
}
</style>
