module.exports = (app, shared) => {
    /**
    * @memberof fg.components
    */
    const WizardStepMicPermission = {
        computed: Object.assign({
            stepValid: function() {
                return this.permission
            },
        }, app.helpers.sharedComputed()),
        methods: shared().methods,
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
