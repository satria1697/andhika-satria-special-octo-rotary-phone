<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useProductStore} from "../../store/Product";
import {ProductSearchRequest} from "../../entities/request/product";
import Card from "./components/card.vue";
import {Product} from "../../entities/Product";

const productStore = useProductStore()

const isLoading = ref({
  init: true,
  product: false
})

const products = computed(() => productStore.products)
const categories = computed(() => productStore.categories)

const productPage = computed(() => productStore.productFilter.page)

let recommendProduct = ref<Product[]>([])

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
  recommendProduct.value = await productStore.getRecommendProduct()
  isLoading.value.init = false
})
</script>

<template>
  <div class="flex flex-col w-screen h-screen overflow-x-hidden">
    <div class="flex mb-2 border-b-2 p-4">
      <span class="text-3xl font-semibold">Pasarwarga</span>
    </div>
    <div
      v-if="isLoading.init"
      class="w-full h-full grid place-items-center"
    >
      <span class="animate-pulse">Loading Data</span>
    </div>
    <template v-else>
      <div class="px-4 mb-2s flex justify-center mb-2 shadow-md">
        <div class="flex flex-1 overflow-x-auto w-full space-x-2 mb-2">
          <div
            v-for="(cat, i) in categories"
            :key="i"
            class="group py-1 px-2 transition cursor-pointer hover:bg-gray-200"
            @click="cat.child?.length ? '': handleSelectCategory(cat.slug)"
          >
            <span>{{ cat.category_name }}</span>
            <div
              v-if="cat.child?.length"
              class="absolute z-20 invisible group-hover:visible"
            >
              <div class="bg-white border rounded-md border-gray-700 shadow-md w-48 text-gray-800">
                <div
                  v-for="(c, idx) in cat.child"
                  :key="idx"
                  class="hover:bg-gray-100 cursor-pointer px-2 py-1"
                  @click="handleSelectCategory(c.slug)"
                >
                  <span>{{ c.category_name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-20 h-full mt-4">
        <div
          v-if="isLoading.product"
          class="w-full h-full grid place-items-center"
        >
          <span class="animate-pulse">Is Loading</span>
        </div>
        <template v-else>
          <div class="flex flex-col pb-6 space-y-2">
            <span class="title">Product Recommendation</span>
            <div class="grid grid-cols-4 gap-24">
              <card
                v-for="(opt, idx) in recommendProduct"
                :key="idx"
                :product="opt"
              />
            </div>
          </div>
          <div
            v-if="!products.length"
            class="w-full h-full grid place-items-center"
          >
            <span>Tidak ada data</span>
          </div>
          <div
            v-else
            class="flex flex-col space-y-2"
          >
            <span class="title">Produk Lainnya</span>
            <div class="grid grid-cols-4 gap-24">
              <card
                v-for="(opt, idx) in products"
                :key="idx"
                :product="opt"
              />
            </div>
          </div>
          <div
            v-if="products.length"
            class="flex w-full justify-end pb-10"
          >
            <div class="flex space-x-4">
              <button
                :disabled="productPage === 1"
                class="btn"
                @click="handleNavigate('prev')"
              >
                Previous
              </button>
              <button
                class="btn"
                @click="handleNavigate('next')"
              >
                Next
              </button>
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

.title {
  @apply text-3xl font-bold
}
</style>

