const Module = require('./lib/module')


/**
* @module User
*/
class UserModule extends Module {

    constructor(...args) {
        super(...args)

        this.app.on('bg:user:login', ({username, password}) => this.login(username, password))
        this.app.on('bg:user:logout', this.logout.bind(this))
    }


    _initialState() {
        return {
            authenticated: false,
            developer: false, // Unlocks experimental developer-only features.
            password: '',
            platform: {
                tokens: {
                    portal: null,
                    sip: null,
                },
            },
            username: null,
        }
    }


    async _platformData() {
        const res = await this.app.api.client.get('api/autologin/token/')
        this.app.setState({user: {platform: {tokens: {portal: res.data.token}}}})
    }


    /**
    * Make an api call with the current basic authentication to retrieve
    * profile information with. Save the credentials in storage when the call
    * is succesful, otherwise remove the credentials from the store.
    * @param {String} username - Email address to login with.
    * @param {String} password - Password to login with.
    */
    async login(username, password) {
        this.app.setState({user: {password, username}})
        this.app.api.setupClient(username, password)
        const res = await this.app.api.client.get('api/permission/systemuser/profile/')

        if (this.app.api.NOTOK_STATUS.includes(res.status)) {
            this.app.emit('fg:notify', {icon: 'warning', message: this.app.$t('Invalid credentials'), type: 'warning'})
            // Remove credentials from the store.
            Object.assign(this.app.state.user, {authenticated: false, password: ''})
            return
        }

        let user = res.data
        let realName = [user.first_name, user.preposition, user.last_name].filter((i) => i !== '').join(' ')

        // Only platform client users cannot use platform telephony features.
        if (!user.client) {
            this.logout()
            return
        }

        let startLayer
        if (this.app.state.ui.installed) {
            startLayer = 'settings'
            this.app.emit('fg:notify', {icon: 'cog', message: this.app.$t('Review your softphone and audio settings.'), timeout: 0, type: 'warning'})
        } else {
            startLayer = 'contacts'
            this.app.emit('fg:notify', {icon: 'user', message: this.app.$t('Welcome back, {user}', {user: realName}), type: 'success'})
        }

        this.app.setState({
            ui: {
                installed: false, // The `installed` flag is a onetime thing disabled after login.
                layer: startLayer, // On install, go to the settings page.
                menubar: {default: 'active'},
                updated: false, // Same for the `updated` flag.
            },
            user: {
                authenticated: true,
                client_id: user.client.replace(/[^\d.]/g, ''),
                id: user.id,
                password: password,
                platform: {
                    tokens: {
                        sip: user.token,
                    },
                },
                username: username,
            },
        }, {persist: true})

        this.app._platformData()
        // Connect to the sip service on succesful login.
        this.app.modules.calls.connect()
    }


    logout() {
        this.app.logger.info(`${this}logging out and cleaning up state`)
        let newState = this.app._resetState()
        // Keep the username.
        newState.user.username = this.app.state.user.username
        this.app.setState(newState, {persist: true})
        // Remove credentials for basic auth.
        this.app.api.setupClient()
        // Disconnect without reconnect attempt.
        this.app.modules.calls.disconnect(false)
        this.app.emit('fg:notify', {icon: 'user', message: this.app.$t('You are logged out'), type: 'success'})
        this.app.setState({ui: {menubar: {default: 'inactive'}}})
    }


    toString() {
        return `${this.app}[user] `
    }
}

module.exports = UserModule
