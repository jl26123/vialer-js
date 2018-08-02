/**
* Setup options to run a bg instance of Vialer-js can be a bit
* verbose, that's why this is handled from one place for both
* Node and Browsers.
*/
module.exports = (function() {
    const env = require('../../lib/env')({role: 'bg'})

    let options = {
        env,
        modules: {
            builtin: [
                {module: require('../modules/activity'), name: 'activity'},
                {module: require('../modules/app'), name: 'app'},
                {
                    addons: null,
                    module: require('../modules/availability'),
                    name: 'availability',
                },
                {module: require('../modules/calls'), name: 'calls'},
                {
                    i18n: null,
                    module: require('../modules/contacts'),
                    name: 'contacts',
                    providers: null,
                },
                {module: require('../modules/settings'), name: 'settings'},
                {module: require('../modules/ui'), name: 'ui'},
                {
                    adapter: null,
                    i18n: null,
                    module: require('../modules/user'),
                    name: 'user',
                },
            ],
            custom: null,
        },
    }

    let availabilityModule = options.modules.builtin.find((i) => i.name === 'availability')
    let contactModule = options.modules.builtin.find((i) => i.name === 'contacts')
    let userModule = options.modules.builtin.find((i) => i.name === 'user')

    // Load modules from settings.
    if (env.isNode) {
        const rc = require('rc')
        let settings = {}
        rc('vialer-js', settings)
        const brand = settings.brands[process.env.BRAND]
        availabilityModule.addons = brand.modules.builtin.availability.addons
        contactModule.providers = brand.modules.builtin.contacts.providers
        contactModule.i18n = brand.modules.builtin.contacts.i18n
        userModule.adapter = brand.modules.builtin.user.adapter
        userModule.i18n = brand.modules.builtin.user.i18n
        options.modules.custom = brand.modules.custom
    } else {
        // Load modules through envify replacement.
        availabilityModule.addons = process.env.BUILTIN_AVAILABILITY_ADDONS
        contactModule.providers = process.env.BUILTIN_CONTACTS_PROVIDERS
        contactModule.i18n = process.env.BUILTIN_USER_I18N
        userModule.adapter = process.env.BUILTIN_USER_ADAPTER
        userModule.i18n = process.env.BUILTIN_USER_I18N
        options.modules.custom = process.env.CUSTOM_MOD

        // Add an extra extension-specific module.
        if (env.isExtension) {
            options.modules.builtin.push({module: require('../modules/extension'), name: 'extension'})
        }
    }

    return options
})()
