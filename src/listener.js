
export default class VueWebsocketsListener {

    /**
     * WebSocket event keywords
     * @type {string[]}
     */
    static staticEvents = [
        'open',
        'message',
        'error',
        'close',
    ];

    constructor(wsWrapper, emitter){
        this.wsWrapper = wsWrapper;
        this.emitter = emitter;
        this.register();
    }

    /**
     * Listening all websocket events
     */
    register(){
        VueWebsocketsListener.staticEvents.forEach(
            event => this.wsWrapper.ws[`on${event}`] = (event) => {
                const { type, data } = event;
                const parsedData = data && JSON.parse(data) || null;

                if (type === 'open') {
                    this.wsWrapper.executeTaskBuffer();
                }

                if (type === 'close') {
                    this.wsWrapper.reconnect(() => {
                        this.register();
                        this.emitter.emit('RECONNECT');
                    });
                }

                // staticEvents
                this.onEvent(type, parsedData);

                // Если событие onmessage, то нам в нем приходит data, где содержится type:
                // type - название метода (get_chats, get_messages и т.д.),
                // поэтому его нужно тоже передать во vuejs.
                //
                // onmessage event contains data in which we recieve type:
                // type - name of a method (get_chats, get_messages, etc.)
                // and should also be broadcasted to vuejs environment.
                if (parsedData && parsedData.type) {
                    this.onEvent(parsedData.type, parsedData.data);
                }
            }
        );
    }

    /**
     * Broadcast all events to vuejs environment
     */
    onEvent(eventType, data){
        this.emitter.emit(eventType.toUpperCase(), data);
    }
}
