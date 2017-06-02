import { inject, NewInstance } from "aurelia-dependency-injection";
import { bindable, bindingMode, computedFrom } from 'aurelia-framework';

import { SelectHelper } from '../SelectHelper';

@inject(Element, NewInstance.of(SelectHelper))
export class SelectFilterCustomElement {

    @bindable
    public customContext: any;
    @bindable
    public allLabel: string;
    @bindable
    public items: SelectFilterItem[];
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    public selectedItem: SelectFilterItem;
    @bindable
    public onSelectionChanged: (item: SelectFilterItem) => void;
    

    constructor(private _element: Element,
        public selectHelper: SelectHelper) {
        this.selectHelper.element = this._element;
    }

    public bind(bindingContext: any) {
        if (!this.customContext) {
            this.customContext = bindingContext;
        }
    }

    public selectItem(item: SelectFilterItem, noChangedEvent?: boolean) {
        this.selectedItem = item;
        this.selectHelper.dropDownMenuVisible = false;
        !noChangedEvent && this.onSelectionChanged && this.onSelectionChanged.apply(this.customContext, [item]);
    }

    public unSelectItem() {
        this.selectItem(null);
    }

    public clear() {
        this.selectItem(null, true);
    }
}

export class SelectFilterOption {

    public allLabel: string;
    public items: SelectFilterItem[];

    constructor(allLabel: string, items: SelectFilterItem[]) {

        this.allLabel = allLabel;
        this.items = items;
    }

}

export class SelectFilterItem {

    public label: string;
    public key: string;

}
