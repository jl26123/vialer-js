module.exports = (app, shared) => {
    /**
    * @memberof fg.components
    */
    const WizardStepMicPermission = {
        beforeDestroy: function() {
            clearInterval(this.intervalId)
        },
        computed: app.helpers.sharedComputed(),
        methods: Object.assign({
            validateStep: function() {
                this.selected.ready = this.permission
            },
        }, shared().methods),
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
                    if (this.permission) clearInterval(this.intervalId)
                }
            }, 500)


            this.validateStep()
        },
        render: templates.wizard_step_mic_permission.r,
        staticRenderFns: templates.wizard_step_mic_permission.s,
        store: {
            app: 'app',
            options: 'settings.wizard.steps.options',
            permission: 'settings.webrtc.media.permission',
            selected: 'settings.wizard.steps.selected',
        },
        watch: {
            permission: function(granted) {
                this.validateStep()
            },
        },
    }

    return WizardStepMicPermission
}
