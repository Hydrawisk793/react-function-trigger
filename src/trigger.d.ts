export declare class Trigger<
    Args extends any[] = any[]
>
{
    public constructor();

    public readonly sequence : number;

    public subscribe(
        subscriber : TriggerSubscriber<Args>
    ) : this;

    public unsubscribe(
        subscriber : TriggerSubscriber<Args>
    ) : this;

    public emit(
        ...args : Args
    ) : void;
}

export declare interface TriggerEvent<
    Args extends any[] = any[]
>
{
    source : Trigger<Args>;

    args : Args;
}

export declare type TriggerSubscriber<
    Args extends any[] = any[]
> = (
    e : TriggerEvent<Args>
) => void;

export declare type AnyTrigger = Trigger<any[]>;
