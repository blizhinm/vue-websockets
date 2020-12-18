export default {

    /**
     *  Assign runtime callbacks
     */
    beforeCreate(){

        if(!this.sockets) this.sockets = {};

        this.sockets.subscribe = (event, callback) => {
            this.$vueWebsockets.emitter.addListener(event, callback, this);
        };

        this.sockets.unsubscribe = (event) => {
            this.$vueWebsockets.emitter.removeListener(event, this);
        };

    },

    /**
     * Register all socket events
     */
    mounted(){

        if(this.$options.sockets){

            Object.keys(this.$options.sockets).forEach(event => {

                if(event !== 'subscribe' && event !== 'unsubscribe') {
                    this.$vueWebsockets.emitter.addListener(event, this.$options.sockets[event], this);
                }

            });

        }

    },

    /**
     * unsubscribe when component unmounting
     */
    beforeDestroy(){

        if(this.$options.sockets){

            Object.keys(this.$options.sockets).forEach(event => {

                this.$vueWebsockets.emitter.removeListener(event, this);

            });

        }

    }

}