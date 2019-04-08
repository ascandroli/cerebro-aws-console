import { search } from 'cerebro-tools';
import { data } from 'awsc-mezz-data.parsed'
import icon from './icon.png'

export const fn = ({term, actions, display}) => {

    var goto = (searchTerm) => {
        actions.open(`https://console.aws.amazon.com${searchTerm}`)
        actions.hideWindow()
    }

    const match = term.match(/^\aws\s*(.*)/)
    if (match) {
        const texttofind = match[1]
        if (texttofind.length > 1) {
            const commands = search(data.items, texttofind, (el) => el.match)
            if (commands.length > 0) {
                const result = commands.map((cmd) => ({
                    title: cmd.title,
                    subtitle: cmd.subtitle,
                    term: cmd.autocomplete,
                    icon: cmd.icon.path,
                    onSelect: () => goto(cmd.arg)
                }))
                display(result)
            }
        }
    }
}