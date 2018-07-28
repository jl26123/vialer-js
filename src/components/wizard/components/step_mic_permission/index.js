module.exports = (app, shared) => {
    /**
    * @memberof fg.components
    */
    const WizardStepMicPermission = {
        beforeDestroy: function() {
            clearInterval(this.intervalId)
        },
        computed: Object.assign({
            stepValid: function() {
                return this.permission
            },
        }, app.helpers.sharedComputed()),
        methods: shared().methods,
        mounted: function() {
            // Poll for the permission in case there is none, until
            // the user modified the browser permission in the navigation bar.
            this.intervalId = setInterval(async() => {
                try {
                    await app.__initMedia()
                } catch (err) {
                    // An exception means something else than a lack of permission.
                    clearInterval(this.intervalId)
                } finally {
                    if (this.permission) {
                        clearInterval(this.intervalId)
                        // Update the device list as soon we got permission.
                        app.emit('bg:devices:verify-sinks')
                    }
                }
            }, 500)
        },
        render: templates.wizard_step_mic_permission.r,
        staticRenderFns: templates.wizard_step_mic_permission.s,
        store: {
            app: 'app',
            options: 'settings.wizard.steps.options',
            permission: 'settings.webrtc.media.permission',
            selected: 'settings.wizard.steps.selected',
        },
    }

    return WizardStepMicPermission
}
