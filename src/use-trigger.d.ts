import { Trigger } from "./trigger";

export declare function useTrigger<
    Args extends any[] = any[]
>
(
    trigger : Trigger<Args>
) : [
    Trigger<Args>["sequence"],
    Args
];
