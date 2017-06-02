
import { SelectFilterCustomElement, SelectFilterOption, SelectFilterItem } from './selects/select-filter/selectFilter';
import { SelectPeriodItem } from './selects/select-period/selectPeriod';

export class Selects {
    public heading = 'Select elements';
    public context;
    public selectFilters: SelectFilterOption[];
    public selectFilterElements: SelectFilterCustomElement[] = [];
    public selectPeriodAllNotify : number = 0;
    public selectPeriodAll : SelectPeriodItem;

    public activate(){          
          this.selectFilters = [
              {
                  allLabel: "Everyone",
                  items: [
                      {
                          label: "Adults",
                          key: "adults"
                      } as SelectFilterItem,
                      {
                          label: "Children",
                          key: "children"
                      } as SelectFilterItem
                  ]
              } as SelectFilterOption,          
              {
                  allLabel: "All ages",
                  items: [
                      {
                          label: "1 to 10",
                          key: "1_10"
                      } as SelectFilterItem,
                      {
                          label: "11 to 20",
                          key: "11_20"
                      } as SelectFilterItem,
                      {
                          label: "20 to 30",
                          key: "20_30"
                      } as SelectFilterItem,
                      {
                          label: "Old people",
                          key: "old"
                      } as SelectFilterItem
                  ]
              } as SelectFilterOption
          ];
    }
    public bind(bindingContext: any) {
        this.context = bindingContext;
    }

    public onSelectPeriodAllChanged(item: SelectPeriodItem) {
      this.selectPeriodAllNotify++;
      this.selectPeriodAll= item;
    }
}

export class ToJsonValueConverter {
    toView(obj) {    
      return JSON.stringify(obj);
    }
}
