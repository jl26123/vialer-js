module.exports = (function() {
    const env = require('../../lib/env')({role: 'fg'})

    let options = {
        env,
        modules: {
            builtin: [
                {
                    addons: null,
                    module: require('../modules/availability'),
                    name: 'availability',
                },
            ],
            custom: null,
        },
    }

    let availabilityModule = options.modules.builtin.find((i) => i.name === 'availability')

    if (env.isNode) {
        const rc = require('rc')
        let settings = {}
        rc('vialer-js', settings)
        const BRAND = process.env.BRAND ? process.env.BRAND : 'bologna'
        const brand = settings.brands[BRAND]
        availabilityModule.addons = brand.modules.builtin.availability.addons
    } else {
        // Load modules through envify replacement.
        availabilityModule.addons = process.env.BUILTIN_AVAILABILITY_ADDONS
        options.modules.custom = process.env.CUSTOM_MOD
    }

    return options
})()
