import {defineStore} from "pinia";
import {Product} from "../entities/Product";
import {getCategories, getProducts} from "../repository/product";
import {Category, CategoryMap} from "../entities/Category";
import _ from "lodash";
import {ProductSearchRequest} from "../entities/request/product";

interface state {
    products: Array<Product>
    categories: Array<CategoryMap>
    productFilter: {
        page: number
        category: string
    }
}

export const useProductStore = defineStore('product', {
    state: (): state => ({
        products: [],
        categories: [],
        productFilter: {
            page: 1,
            category: ''
        }
    }),
    actions: {
        async getProducts(payload?: ProductSearchRequest) {
            this.productFilter.page = payload?.page ?? 1
            let res: Array<Product> = []
            try {
                let result = await getProducts(payload)
                res = result.data.data
            } catch (e) {
                console.log(e)
            }
            this.products = res
        },
        async getCategories() {
            let res: Array<Category> = []
            try {
                let result = await getCategories()
                res = result.data.data
            } catch (e) {
                console.log(e)
            }
            if (res.length) {
                const groupBy = _.chain<Category>(res).filter((value: Category) => !!value.status).groupBy('parent_id').value()
                const parent: [Category, ...Category[]] = groupBy["0"];
                this.categories = parent.map<CategoryMap>((value: Category) => ({
                    ...value,
                    child: groupBy[value.id]
                }))
            }
        },
        async getRecommendProduct(){
            const payload: ProductSearchRequest = {
                page: 20,
                perPage: 2
            }
            let res: Array<Product> = []
            try {
                let result = await getProducts(payload)
                res = result.data.data
            } catch (e) {
                console.log(e)
            }
            return res
        }
    }
})
