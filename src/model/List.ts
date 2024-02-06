import ListItem from "./ListItem";

interface ListItems {
    list: ListItem[],
    load(): void,
    save(): void,
    clear(): void,
    addItem(item: ListItem): void,
    deleteItem(id: string): void,
}

export default class List implements ListItems {
    static instance: List = new List();

    private constructor(
        private _list: ListItem[] = [],
    ) {
        //
    }

    get list(): ListItem[] {
        return this._list;
    }

    load(): void {
        const sessionList = localStorage.getItem("itemsList");

        if(typeof sessionList !== 'string') return;

        const parsedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(sessionList);

        parsedList.forEach(item => {
            let listItem = new ListItem;

            listItem.id = item._id;
            listItem.item = item._item;
            listItem.checked = item._checked;

            List.instance.addItem(listItem);
        });
    }

    save(): void {
        localStorage.setItem("itemsList", JSON.stringify(this._list));
    }

    clear(): void {
        this._list = []
        this.save()
    }

    addItem(item: ListItem): void {
        this._list.push(item)
        this.save()
    }

    deleteItem(id: string): void {
        this._list = this._list.filter((item) => item.id !== id)
        this.save()
    }
}