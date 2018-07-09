/**
* Base class that each UserProvider must inherit from.
*/
class UserAdapter {
    constructor(app) {
        this.app = app
    }


    /**
    * Some default actions that are done, no matter
    * what login provider is being used.
    * @param {Object} options - Options to pass.
    * @param {String} options.password - The password that is used to unlock a session.
    * @param {String} options.userFields - The fields that the particular user requires.
    * @param {String} options.username - The username the user is identified with.
    */
    async login({password, userFields, username}) {
        await this.app.__unlockSession({password, username})

        this.app.setState({
            // The `installed` and `updated` flag are toggled off after login.
            app: {installed: false, updated: false},
            ui: {layer: 'settings'},
            user: {username},
        }, {encrypt: false, persist: true})

        this.app.setState({user: userFields}, {persist: true})
        this.app.setState({user: {status: null}})
    }


    /**
    * Remove any stored session key, but don't delete the salt.
    * This will render the cached and stored state useless.
    */
    logout() {
        this.app.logger.info(`${this}logging out and cleaning up state`)
        this.app.setState({
            app: {vault: {key: null, unlocked: false}},
            user: {authenticated: false},
        }, {encrypt: false, persist: true})
        // Remove credentials from basic auth.
        this.app.api.setupClient()
        // Disconnect without reconnect attempt.
        this.app.modules.calls.disconnect(false)
        this.app.emit('bg:user:logged_out', {}, true)
        this.app.setSession('new')
        this.app.notify({icon: 'user', message: this.app.$t('goodbye!'), type: 'info'})

        // Fallback to the browser language or to english.
        const languages = this.app.state.settings.language.options.map(i => i.id)
        if (this.app.env.isBrowser && languages.includes(navigator.language)) {
            this.app.logger.info(`${this}switching back to browser language: ${navigator.language}`)
            Vue.i18n.set(navigator.language)
        }
    }


    async unlock({username, password}) {
        this.app.setSession(username)
        this.app.setState({user: {status: 'loading'}})

        try {
            await this.app.__unlockSession({password, username})
            this.app.api.setupClient(username, this.app.state.user.token)
            this.app.setState({ui: {layer: 'calls'}}, {encrypt: false, persist: true})
            this.app.notify({icon: 'user', message: this.app.$t('welcome back!'), type: 'info'})
        } catch (err) {
            this.app.setState({
                ui: {layer: 'login'},
                user: {authenticated: false},
            }, {encrypt: false, persist: true})
            const message = this.app.$t('failed to unlock session; check your password.')
            this.app.notify({icon: 'warning', message, type: 'danger'})
        } finally {
            this.app.setState({user: {status: null}})
        }

        this.app.__initServices()
    }
}

module.exports = UserAdapter
