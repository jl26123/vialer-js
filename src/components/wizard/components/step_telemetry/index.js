module.exports = (app, shared) => {
    /**
    * @memberof fg.components
    */
    const WizardStepTelemetry = {
        computed: app.helpers.sharedComputed(),
        methods: Object.assign({
            toggleTelemetry: function(enabled) {
                app.setState({settings: {telemetry: {enabled}}}, {persist: true})
                this.stepNext()
            },
        }, shared().methods),
        render: templates.wizard_step_telemetry.r,
        staticRenderFns: templates.wizard_step_telemetry.s,
        store: {
            app: 'app',
            options: 'settings.wizard.steps.options',
            selected: 'settings.wizard.steps.selected',
            telemetry: 'settings.telemetry',
        },
    }

    return WizardStepTelemetry
}
