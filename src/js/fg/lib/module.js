/**
* Generic base class for an AppForeground module.
*/
class Module extends EventEmitter {
    /**
    * Foreground Module constructor.
    * @param {AppForeground} app - The foreground application.
    */
    constructor(app) {
        super(app)
        this.app = app
    }
}

module.exports = Module
