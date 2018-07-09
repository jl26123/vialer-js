/**
* Base class that each AvailabilityProvider must inherit from.
*/
class AvailabilityAdapter {
    constructor(app) {
        this.app = app
    }
}

module.exports = AvailabilityAdapter
