module.exports = (app, shared) => {
    /**
    * @memberof fg.components
    */
    const WizardStepWelcome = {
        computed: app.helpers.sharedComputed(),
        methods: Object.assign({

        }, shared().methods),
        render: templates.wizard_step_welcome.r,
        staticRenderFns: templates.wizard_step_welcome.s,
        store: {
            app: 'app',
            options: 'settings.wizard.steps.options',
            selected: 'settings.wizard.steps.selected',
        },
    }

    return WizardStepWelcome
}
