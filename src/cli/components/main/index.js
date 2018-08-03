module.exports = function(app) {
    return Vue.component('Main', {
        data: function() {
            let data = Object.assign({
                options: [
                    'develop',
                    'help',
                ],
                title: 'Bologna',
            }, require('./style')(app))
            return data
        },
        methods: {
            // Opens the selected list item in a browser.
            handleListSelect(event) {
                // const feedIndex = this.feedTitles.indexOf(event.content)
                // const feedItem = this.feed.items[feedIndex]
            },
        },
        mounted() {
            // Close the program when CTRL+C is pressed.
            this.$refs.screen.key(['C-c'], () => {
                process.exit(0)
            })
        },
        template: require('./main.vue'),
    })
}
