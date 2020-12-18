import Mixin from './mixin';
import Logger from './logger';
import Listener from './listener';
import Emitter from './emitter';
import WebsocketWrapper from './ws-wrapper';

export default class VueWebsockets {

    /**
     * lets take all resource
     * @param vuex
     * @param debug
     */
    constructor({connectionUrl, vuex, debug}){

        Logger.debug = debug;
        this.emitter = new Emitter(vuex);
        this.wsWrapper = new WebsocketWrapper(connectionUrl);
        this.listener = new Listener(this.wsWrapper, this.emitter);

    }

    /**
     * Vue.js entry point
     * @param Vue
     */
    install(Vue){

        Vue.prototype.$socket = this.wsWrapper;
        Vue.prototype.$vueWebsockets = this;
        Vue.mixin(Mixin);

        Logger.info('Vue-Websockets plugin enabled');

    }

}
