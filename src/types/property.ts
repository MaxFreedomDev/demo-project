
type Properties = {
    id: number,
    name: string,
    type: string
}
export interface InitialStatePropertyType {
    properties: Array<Properties>,
    loading: boolean
}
export enum PropertyTypeActions {
    GET_PROPERTIES_LIST = "GET_PROPERTIES_LIST",
    LOADING_PROPERTY = "LOADING_PROPERTY"
}
interface GetPropertyListAction {
    type: PropertyTypeActions.GET_PROPERTIES_LIST,
    payload: Array<Properties>
}
interface LoadingPropertyAction {
    type: PropertyTypeActions.LOADING_PROPERTY
}
export type PropertyAction = GetPropertyListAction | LoadingPropertyAction
