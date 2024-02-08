import './css/styles.css'
import List from './model/List'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    const list = List.instance
    const template = ListTemplate.instance

    const itemForm = document.getElementById("itemEntryForm") as HTMLFormElement;

    // Adding new items.
    itemForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault()

        const input = document.getElementById("newItem") as HTMLInputElement
        const newEntryText: string = input.value.trim()

        if (!newEntryText) return

        const itemId: number = list.list.length ? parseInt(list.list[list.list.length - 1].id) + 1 : 1

        const newItem = new ListItem(itemId.toString(), newEntryText);

        list.addItem(newItem)

        template.render(list)
    })

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement

    // Deleting all items.
    clearItems.addEventListener("click", (): void => {
        list.clear()
        template.clear()
    })

    list.load()

    template.render(list)
}

document.addEventListener("DOMContentLoaded", initApp) 