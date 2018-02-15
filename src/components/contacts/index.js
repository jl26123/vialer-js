module.exports = (app) => {

    return {
        computed: Object.assign({
            filteredContacts: function() {
                let searchQuery = this.search.input.toLowerCase()
                let _contacts = {}
                for (const id of Object.keys(this.contacts)) {
                    const contact = this.contacts[id]
                    const name = contact.name.toLowerCase()
                    const description = contact.name.toLowerCase()
                    const number = String(contact.number)

                    if (name.includes(searchQuery) ||
                        description.includes(searchQuery) ||
                        number.includes(searchQuery)) {
                        _contacts[id] = contact
                    }
                }

                return _contacts
            },
        }, app.helpers.sharedComputed()),
        methods: app.helpers.sharedMethods(),
        render: templates.contacts.r,
        staticRenderFns: templates.contacts.s,
        store: {
            calls: 'calls.calls',
            contacts: 'contacts.contacts',
            search: 'contacts.search',
            state: 'contacts.state',
        },
    }
}
