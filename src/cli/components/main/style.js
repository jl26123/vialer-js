module.exports = function(app) {
    console.log(app.settings)
    const COLORS = app.settings.colors
    return {
        styles: {
            boxHeader: {
                bg: COLORS['brand-accent-color'],
                border: {
                    bg: 'black',
                    fg: '#3FA767',
                },
                fg: '#3FA767',
                selected: {
                    bg: '#444',
                    fg: COLORS['brand-accent-color'],
                },
            },
            listContent: {
                bg: COLORS['brand-color'],
                border: {
                    bg: COLORS['brand-color'],
                    fg: '#3FA767',
                },
                fg: '#3FA767',
                selected: {
                    bg: '#444',
                    fg: COLORS['brand-accent-color'],
                },
            },
            textHeader: {
                bg: COLORS['brand-color'],
                fg: COLORS['grey-color'],
            },
        },
    }
}
