module.exports = (app) => {
    /**
    * @memberof fg.components
    */
    const MicPermission = {
        beforeDestroy: function() {
            clearInterval(this.intervalId)
        },
        computed: app.helpers.sharedComputed(),
        methods: Object.assign({}, app.helpers.sharedMethods()),
        mounted: function() {
            // Keep an eye on the media permission while being mounted.
            this.intervalId = setInterval(async() => {
                try {
                    await app.__initMedia()
                } catch (err) {
                    // An exception means something else than a lack of permission.
                    clearInterval(this.intervalId)
                }
            }, 50)
        },
        props: {
            soundmeter: {default: true},
        },
        render: templates.mic_permission.r,
        staticRenderFns: templates.mic_permission.s,
        store: {
            app: 'app',
            devices: 'settings.webrtc.devices',
            env: 'env',
            permission: 'settings.webrtc.media.permission',
            settings: 'settings',
        },
    }

    return MicPermission
}
