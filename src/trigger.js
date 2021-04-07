module.exports = (function ()
{
    /**
     *  @constructor
     */
    function Trigger()
    {
        this.sequence = 0;
        this._subs = [];
    }

    Trigger.prototype = {
        constructor : Trigger,

        sequence : 0,

        subscribe : function subscribe(subscriber)
        {
            var index = this._subs.indexOf(subscriber);
            if(index < 0)
            {
                this._subs.push(subscriber);
            }

            return this;
        },

        unsubscribe : function unsubscribe(subscriber)
        {
            var index = this._subs.indexOf(subscriber);
            if(index >= 0)
            {
                this._subs.splice(index, 1);
            }

            return this;
        },

        emit : function emit()
        {
            var args = Array.prototype.slice.call(arguments);

            ++this.sequence;
            if(this.sequence >= Number.MAX_SAFE_INTEGER)
            {
                this.sequence = 0;
            }

            this._subs.forEach((/** @this {Trigger} */function (subscriber)
            {
                subscriber({
                    source : this,
                    args : args
                });
            }), this);
        }
    };

    return {
        Trigger : Trigger
    };
})();
