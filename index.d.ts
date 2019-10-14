type Class<T = unknown, Arguments extends any[] = any[]> = new(...arguments_: Arguments) => T;

export type ComponentObject = {
    [key:string]: Class | Function
}

export function compose<T extends Class>(parent: T, components: ComponentObject, ...extraParams: Array<any>): T

export default compose;
