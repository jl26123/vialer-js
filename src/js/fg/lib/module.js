/**
* Generic base class for an AppForeground module.
*/
class Module extends EventEmitter {
    /**
    * Base Module constructor.
    * @param {AppBackground} app - The background application.
    */
    constructor(app) {
        super(app)
        this.app = app
    }
}

module.exports = Module
