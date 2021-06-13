/**
 * Created by charnjeetelectrovese@gmail.com on 11/13/2019.
 */
const EventEmitter = {
    events: {},
    THROW_ERROR: 'THROW_ERROR',
    TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
    dispatch: function (event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(data));
    },
    unsubscribe(event) { // remove listeners
        delete this.events[event]
    },
    subscribe: function (event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback)
    }
}

export default EventEmitter;
