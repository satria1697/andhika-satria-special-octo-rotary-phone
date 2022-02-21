import {invoke} from "../service/ApiService";
import {Category} from "../entities/Category";
import {Product} from "../entities/Product";
import {ProductSearchRequest} from "../entities/request/product";

export const getProducts = async (payload?: ProductSearchRequest) => {
    const request = {
        page: payload?.page ?? 1,
        'per_page': payload?.perPage ?? 5,
        'category_name': payload?.categoryName ?? ''
    }
    return await invoke<Array<Product>>('product/search', request)
}

export const getCategories = async () => {
    return invoke<Array<Category>>('category-product/list')
}
