
type Items = {
    date: string,
    description: string,
    id: number | string,
    name: string,
    picture: string,
    price: string
}
export interface InitialStateProductType {
    items: Array<Items>,
    item: Items,
    url: string | null,
    loading: boolean,
    loadingFile: boolean,
    openDialogEvent: boolean,
}
export enum ProductActionTypes {
    GET_PRODUCTS_LIST = "GET_PRODUCTS_LIST",
    GET_PRODUCT_DATA = "GET_PRODUCT_DATA",
    LOADING_PRODUCTS = "LOADING_PRODUCTS",
    GET_PRODUCT_PHOTO_URL = "GET_PRODUCT_PHOTO_URL",
    FILE_LOADED = "FILE_LOADED",
    CREATE_EVENT = "CREATE_EVENT"
}
interface GetProductListAction {
    type: ProductActionTypes.GET_PRODUCTS_LIST,
    payload: Array<Items>
}
interface GetProductDataAction {
    type: ProductActionTypes.GET_PRODUCT_DATA,
    payload: Items
}
interface LoadingProductsAction {
    type: ProductActionTypes.LOADING_PRODUCTS
}
interface GetProductPhotoUrlAction {
    type: ProductActionTypes.GET_PRODUCT_PHOTO_URL,
    payload: string
}
interface FileLoadedAction {
    type: ProductActionTypes.FILE_LOADED
}
interface CreateEventAction {
    type: ProductActionTypes.CREATE_EVENT,
    payload: boolean
}
export type ProductAction =
    GetProductListAction |
    GetProductDataAction |
    LoadingProductsAction |
    GetProductPhotoUrlAction |
    FileLoadedAction |
    CreateEventAction
