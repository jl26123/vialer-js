module.exports = (app, shared) => {
    /**
    * @memberof fg.components
    */
    const WizardStepDevices = {
        computed: app.helpers.sharedComputed(),
        methods: Object.assign({
            validateStep: function() {
                this.selected.ready = this.permission
            },
        }, shared().methods),
        mounted: function() {
            this.validateStep()
        },
        render: templates.wizard_step_devices.r,
        staticRenderFns: templates.wizard_step_devices.s,
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

    return WizardStepDevices
}
