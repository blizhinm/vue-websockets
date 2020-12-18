/**
 * shitty logger class
 */
export default new class VueWebsocketsLogger {

    constructor() {
        this.debug = false;
        this.prefix = '%cVue-Websockets: ';
    }

    info(text, data = '') {

        if(this.debug) window.console.info(this.prefix+`%c${text}`, 'color: lightgreen;' , data);

    }

    error() {

        if(this.debug) window.console.error(this.prefix, ...arguments);

    }

    warn() {

        if(this.debug) window.console.warn(this.prefix, ...arguments);

    }

    event(text, data = ''){

        if(this.debug) window.console.info(this.prefix+`%c${text}`, 'color: lightgreen;' , data);

    }

}