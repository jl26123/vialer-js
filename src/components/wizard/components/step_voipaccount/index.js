module.exports = (app, shared) => {
    /**
    * @memberof fg.components
    */
    const WizardStepVoipaccount = {
        computed: app.helpers.sharedComputed(),
        methods: Object.assign({
            chooseAccount: function() {
                const selected = this.account.selected
                app.setState({settings: {webrtc: {account: {selected}, enabled: true}}}, {persist: true})
                this.stepNext()
            },
            /**
            * This step is only valid when a valid account is selected.
            */
            validateStep: function() {
                const selectedAccountId = this.settings.webrtc.account.selected.id
                const accountsLoading = this.settings.webrtc.account.status === 'loading'

                if (this.validVoipSettings && selectedAccountId && !accountsLoading) {
                    this.selected.ready = true
                } else {
                    this.selected.ready = false
                }
            },
        }, shared().methods),
        mounted: function() {
            // Reset validation, so it may not be triggered when
            // the platform service retrieves account choices.
            this.$v.$reset()
            this.validateStep()
        },
        render: templates.wizard_step_voipaccount.r,
        staticRenderFns: templates.wizard_step_voipaccount.s,
        store: {
            account: 'settings.webrtc.account',
            app: 'app',
            options: 'settings.wizard.steps.options',
            selected: 'settings.wizard.steps.selected',
            settings: 'settings',
        },
        validations: function() {
            let validations = {
                settings: {
                    webrtc: {
                        account: app.helpers.sharedValidations.bind(this)().settings.webrtc.account,
                    },
                },
            }

            return validations
        },
        watch: {
            /**
            * Update the current selected account data after the account list
            * is refreshed from bg, to keep the validation up-to-date.
            */
            'settings.webrtc.account.options': function() {
                const selected = app.state.settings.webrtc.account.selected

                if (selected.id) {
                    const index = this.account.options.findIndex((i) => i.id === selected.id)
                    Object.assign(selected, this.account.options[index])
                }
                this.validateStep()
            },
            'settings.webrtc.account.selected.id': function() {
                this.validateStep()
            },
        },
    }

    return WizardStepVoipaccount
}
