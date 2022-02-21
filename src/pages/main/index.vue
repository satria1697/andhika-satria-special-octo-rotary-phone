<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useProductStore} from "../../store/Product";
import {ProductSearchRequest} from "../../entities/request/product";
import MSlider from "../../components/MSlider.vue"

const productStore = useProductStore()

const isLoading = ref({
  init: true,
  product: false
})

const products = computed(() => productStore.products)
const categories = computed(() => productStore.categories)

const productPage = computed(() => productStore.productFilter.page)

const numberFormat = (number: number) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
}).format(number)

const calculateDiscount = (price: number, discount: number): string => {
  if (discount !== 0) {
    return numberFormat(price * ((100 - discount) / 100))
  }
  return numberFormat(price)
}

const handleSelectCategory = async (category: string) => {
  isLoading.value.product = true
  const payload: ProductSearchRequest = {
    page: 1,
    categoryName: category
  }
  await productStore.getProducts(payload)
  isLoading.value.product = false
}

const handleNavigate = async (state: 'next' | 'prev') => {
  isLoading.value.product = true
  if (state === 'next') {
    const payload: ProductSearchRequest = {
      page: productStore.productFilter.page + 1
    }
    await productStore.getProducts(payload)
  } else {
    const payload: ProductSearchRequest = {
      page: productStore.productFilter.page - 1
    }
    await productStore.getProducts(payload)
  }
  isLoading.value.product = false
}

onMounted(async () => {
  await productStore.getProducts()
  await productStore.getCategories()
  isLoading.value.init = false
})
</script>

<template>
  <div class="flex flex-col w-screen h-screen overflow-x-hidden">
    <div class="flex mb-4 shadow-2xl p-4">
      <span class="text-3xl font-semibold">Pasarwarga</span>
    </div>
    <div class="w-full h-full grid place-items-center" v-if="isLoading.init">
      <span class="animate-pulse">Loading Data</span>
    </div>
    <template v-else>
      <div class="px-4 flex justify-center mb-4">
        <div class="flex flex-1 overflow-x-auto w-full space-x-2">
          <div v-for="(cat, i) in categories" :key="i"
               class="group py-1 px-2 rounded-full text-white bg-blue-500 cursor-pointer hover:bg-blue-400 transition"
               @click="cat.child?.length ? '': handleSelectCategory(cat.slug)">
            <span>{{ cat.category_name }}</span>
            <div v-if="cat.child?.length" class="absolute z-20 invisible group-hover:visible">
              <div class="bg-white border rounded-md border-gray-700 shadow-md w-48 text-gray-800">
                <div v-for="(c, idx) in cat.child" :key="idx" class="hover:bg-gray-100 cursor-pointer px-2 py-1"
                     @click="handleSelectCategory(c.slug)">
                  <span>{{ c.category_name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-20 h-full">
        <div v-if="isLoading.product" class="w-full h-full grid place-items-center">
          <span class="animate-pulse">Is Loading</span>
        </div>
        <template v-else>
          <div v-if="!products.length" class="w-full h-full grid place-items-center">
            <span>Tidak ada data</span>
          </div>
          <div v-else class="grid grid-cols-4 gap-24">
            <div
                v-for="(opt, idx) in products"
                class="border border-gray-600 rounded-md flex flex-col justify-between itemscen"
                :key="idx"
            >
              <m-slider :images="opt.images" :product-name="opt.product_name" />
              <div class="p-4 flex flex-col">
                <span>{{ opt.product_name }}</span>
                <div class="flex justify-between">
                  <span :class="{'line-through': opt.discount !== 0}" class="stroke-2">{{
                      numberFormat(opt.price)
                    }}</span>
                  <span v-if="opt.discount !== 0">{{ calculateDiscount(opt.price, opt.discount) }}</span>
                </div>
                <div>
                  <span>{{ opt.city_name }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="products.length" class="flex w-full justify-end pb-10">
            <div class="flex space-x-4">
              <button @click="handleNavigate('prev')" :disabled="productPage === 1" class="btn">Previous</button>
              <button @click="handleNavigate('next')" class="btn">Next</button>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped>
.btn {
  @apply bg-green-400 text-white py-2 px-4 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed
}
</style>

