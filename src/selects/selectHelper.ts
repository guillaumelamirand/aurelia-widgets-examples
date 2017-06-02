
export class SelectHelper {
    
    public element: Element;
    public idDropDownBtn: string;
    public idDropDownMenu: string;
    public dropDownMenuVisible: boolean;

    constructor() {
        this.idDropDownBtn = "idDropDownBtn-" + Math.floor(Math.random() * 10000000)
        this.idDropDownMenu = "idDropDownMenu-" + Math.floor(Math.random() * 10000000)
    }

    public changeDropDownMenuVisibility() {
        this.dropDownMenuVisible = !this.dropDownMenuVisible;
    }

    public hideDropDownMenu(event: MouseEvent) {
        let from = event.fromElement;
        let to = event.toElement;

        if ((this._isSelectFilterAction(from) || this._isSelectFilterChild(from))
            && (!this._isSelectFilterChild(to) && !this._isSelectFilterAction(to))
        ) {
            this.dropDownMenuVisible = false;
        }
        else {
            event.stopPropagation();
        }
    }

    private _isSelectFilterAction(element: Element): boolean {
        return element && (element.id === this.idDropDownBtn || element.id === this.idDropDownMenu);
    }
    private _isSelectFilterChild(element: Element): boolean {

        return element && this._isChildOf(this.element, element);
    }

    private _isChildOf(parent: Node, searchNode: Node): boolean {

        let children = parent.childNodes,
            found = false;
        for (let i = 0; i < children.length; i++) {
            let currentChild = children[i];
            if (currentChild === searchNode) {
                found = true;
            } else {
                found = this._isChildOf(currentChild, searchNode);
            }
            if (found)
                break;
        }
        return found;
    }
}