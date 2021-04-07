var React = require("react");
var useEffect = React.useEffect;
var useRef = React.useRef;
var useState = React.useState;
var useMemo = React.useMemo;

module.exports = (function ()
{
    var _emptyArgs = [];

    /**
     *  @template Args
     *  @typedef {import("./trigger").Trigger<Args>} Trigger
     */
    /**
     *  @template Args
     *  @typedef {import("./trigger").TriggerSubscriber<Args>} TriggerSubscriber
     */

    /**
     *  @template {any[]} Args
     *  @param {Trigger<Args>} trigger
     */
    function useTrigger(trigger)
    {
        if(!trigger)
        {
            throw new TypeError("'trigger' must be an instance of 'Trigger'.");
        }

        var seqState = useState(trigger.sequence);
        var setSeq = seqState[1];
        var argsState = useState(/** @type {Args} */(_emptyArgs));
        var setArgs = argsState[1];
        var ctxRef = useRef(/** @type {{
            callback : TriggerSubscriber<Args> | null;

            trigger : Trigger<Args> | null;
        } | null} */(null));

        useEffect(
            function ()
            {
                var ctx = ctxRef.current;
                if(!ctx)
                {
                    ctx = {
                        callback : null,
                        trigger : null
                    };
                    ctxRef.current = ctx;
                }

                var prevTrigger = ctx.trigger;
                if(prevTrigger)
                {
                    prevTrigger.unsubscribe(ctx.callback);
                }

                ctx.trigger = trigger;
                if(trigger)
                {
                    ctx.callback = /** @type {TriggerSubscriber<Args> */(function (e)
                    {
                        var args = e.args;
                        setSeq(e.source.sequence);
                        setArgs((args.length < 1 ? _emptyArgs : args));
                    });
                    trigger.subscribe(ctx.callback);
                }

                return function ()
                {
                    var ctx = ctxRef.current;
                    if(ctx)
                    {
                        var trigger = ctx.trigger;
                        if(trigger)
                        {
                            ctx.trigger.unsubscribe(ctx.callback);
                        }
                    }
                };
            },
            [
                trigger
            ]
        );

        var sequence = seqState[0];
        var args = argsState[0];

        return useMemo(
            function ()
            {
                return [
                    sequence,
                    args
                ];
            },
            [
                sequence,
                args
            ]
        );
    }

    return {
        useTrigger : useTrigger
    };
})();
