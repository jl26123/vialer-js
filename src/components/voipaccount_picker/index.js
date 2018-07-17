module.exports = (app) => {

    const emptyAccount = {id: null, name: null, password: null, username: null}
    /**
    * @memberof fg.components
    */
    const VoipaccountPicker = {
        computed: Object.assign({
            validationField: function() {
                if (this.status === 'loading') return null
                return this.v.settings.webrtc.account.selected.id
            },
        }, app.helpers.sharedComputed()),
        methods: Object.assign({
            refreshVoipaccounts: function() {
                // Call the API endpoint that is responsible for updating
                // the user's voipaccount list.
                app.emit('bg:availability:platform_data')
            },
        }, app.helpers.sharedMethods()),
        props: {
            info: {default: true},
            label: {default: ''},
            v: {default: null}, // Optionally pass a Vuelidate validator.
        },
        render: templates.voipaccount_picker.r,
        staticRenderFns: templates.voipaccount_picker.s,
        store: {
            app: 'app',
            selected: 'settings.webrtc.account.selected',
            settings: 'settings',
            status: 'settings.webrtc.account.status',
            user: 'user',
            vendor: 'app.vendor',
            voip: 'availability.voip',
        },
        watch: {
            /**
            * Respond to updates of the account list. There may be
            * validation errors caused by an account's settings.
            * Refreshing the list triggers validation with
            * validation rules for the refreshed account list.
            * @param {Array} options - Reactive array with VoIP account options.
            */
            'settings.webrtc.account.options': function(options) {
                const account = this.settings.webrtc.account.selected
                if (account.id && options.length) {
                    // Always update the selected option from the updated
                    // option list, because a setting may have changes.
                    // Select the first option if it isn't.
                    const match = options.find((i) => i.id === account.id)
                    if (match) {
                        Object.assign(app.state.settings.webrtc.account.selected, match)
                    }
                } else if (options.length) {
                    // Nothing selected; but there are available options. Select the first option.
                    const selected = app.utils.copyObject(this.settings.webrtc.account.options[0])
                    Object.assign(app.state.settings.webrtc.account.selected, selected)
                }

                if (this.v) this.v.$touch()
            },
            /**
            * Respond to WebRTC enabled switch by (un)setting the foreground
            * account state, so that the connection will update when the
            * whole settings object is pushed to the background.
            * @param {Object} enabled - New checkbox/switch value.
            */
            'settings.webrtc.enabled': function(enabled) {
                if (enabled) {
                    const selected = app.utils.copyObject(this.settings.webrtc.account.options[0])
                    Object.assign(app.state.settings.webrtc.account.selected, selected)
                } else {
                    Object.assign(app.state.settings.webrtc.account.selected, emptyAccount)
                }

                if (this.v) this.v.$touch()
            },
        },
    }

    return VoipaccountPicker
}
