module.exports = (app) => {
    // Initialize sub-components for the wizard.
    // TODO: Allow dynamic loading from modules.
    const shared = function() {
        return {
            methods: {
                finishWizard: function() {
                    app.setState({settings: {wizard: {completed: true}}}, {persist: true})
                    app.notify({icon: 'settings', message: this.$t('all set! We hope you enjoy the {name}.', {name: this.app.name}), type: 'info'})
                },
                stepBack: function() {
                    const stepIndex = this.options.findIndex((option) => option.name === this.selected.name)
                    app.setState({settings: {wizard: {steps: {selected: this.options[stepIndex - 1]}}}}, {persist: true})
                },
                stepNext: function() {
                    const stepIndex = this.options.findIndex((option) => option.name === this.selected.name)
                    app.setState({settings: {wizard: {steps: {selected: this.options[stepIndex + 1]}}}}, {persist: true})
                },
            },
        }
    }

    app.components.WizardStepDevices = Vue.component('WizardStepDevices', require('./components/step_devices')(app, shared))
    app.components.WizardStepMicPermission = Vue.component('WizardStepMicPermission', require('./components/step_mic_permission')(app, shared))
    app.components.WizardStepTelemetry = Vue.component('WizardStepTelemetry', require('./components/step_telemetry')(app, shared))
    app.components.WizardStepVoipaccount = Vue.component('WizardStepVoipaccount', require('./components/step_voipaccount')(app, shared))
    app.components.WizardStepWelcome = Vue.component('WizardStepWelcome', require('./components/step_welcome')(app, shared))
    /**
    * @memberof fg.components
    */
    const Wizard = {
        computed: app.helpers.sharedComputed(),
        created: function() {
            if (app.state.availability.voip.selection) {
                const accountStep = this.steps.options.find((step) => step.name !== 'voipaccount')
                if (accountStep) {
                    app.setState({settings: {wizard: {steps: {options: this.steps.options.filter((step) => step.name !== 'voipaccount')}}}}, {persist: true})
                }
            }
        },
        data: function() {
            let data = {
                account: {
                    selection: app.state.availability.voip.selection,
                },
            }
            return data
        },
        methods: Object.assign({
            validateStep: function(type) {
                if (type === 'microphone') {
                    if (this.settings.webrtc.media.permission) {
                        this.steps.options.find((i) => i.name === 'microphone').ready = true
                    }
                } else if (type === 'voipaccount') {
                    const selectedVoipaccountId = this.settings.webrtc.account.selected.id
                    const accountsLoading = this.settings.webrtc.account.status === 'loading'
                    const step = this.steps.options.find((i) => i.name === 'voipaccount')

                    if (this.validVoipSettings && selectedVoipaccountId && !accountsLoading) {
                        step.ready = true
                    } else {
                        step.ready = false
                    }
                }
            },
        }, app.helpers.sharedMethods()),
        /**
        * Adjusting the wizard steps is done when the component
        * mounts, and when data changes. That is being tracked
        * in appropriate watchers.
        */
        mounted: function() {
            // The microphone step is ready when the permission
            // is already there.
            // this.validateStep('microphone')
            if (this.account.selection) {
                // this.validateStep('voipaccount')
            }
        },
        render: templates.wizard.r,
        staticRenderFns: templates.wizard.s,
        store: {
            app: 'app',
            settings: 'settings',
            steps: 'settings.wizard.steps',
        },
    }

    return Wizard
}
