type DeepRef<T> = {
    [K in keyof T]:  T[K] extends object ? DeepRef<T[K]> : Ref<T[K]>;
};
// eslint-disable-next-line @typescript-eslint/ban-types
export type Ref<T> =  T extends string | number | boolean | symbol ? { value: T } : T extends [] ? T : T extends object ? T : T extends () => Function ? T : never;
export type EventData<T> = { name: string, payload: T }
export type ReturnEventData<T> = {name: string, dispatch: () => void, event: CustomEvent<T> }
declare export function createEvent<T>(eventData: EventData<T>): ReturnEventData<T>
declare export function watch(dep, callback: () => void):void
declare export function onBeforeMount(callback: () => void):void
declare export function onMounted(callback: () => void):void
declare export function onUpdate(callback: () => void):void
declare export function onUnmount(callback: () => void):void
declare export function onEvent<T>(name: string, callback: (e:T) => void):void
declare export function ref<T>(state:T): T extends object ? DeepRef<T> : Ref<T>;

export default {
    ref,
    createEvent,
    onEvent,
    watch,
    onBeforeMount,
    onMounted,
    onUpdate,
    onUnmount,
}