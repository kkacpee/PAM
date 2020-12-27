export type ActionResult<T = void> = {
    isSuccess : boolean;
    errorMessage : string | undefined;
    value : T | undefined;
}