import * as _ from 'lodash'

export class GroupAndOrderByValueConverter {

    toView(data: any[], groupProperty: string, sortProperty: string, sortDirection: 'asc' | 'desc'): any {

        let returnMap = new Map<string, any[]>();

        let keys: string[] = [];
        let dataGroupBy = new Map<string, any[]>();
        if (groupProperty) {
            data && data.forEach(item => {
                let groupValue: string = "";
                if (item[groupProperty]) {
                    groupValue = item[groupProperty];
                }
                if (!dataGroupBy.has(groupValue)) {
                    dataGroupBy.set(groupValue, []);
                }
                dataGroupBy.get(groupValue).push(item);

                if (keys.indexOf(groupValue) == -1) {
                    keys.push(groupValue);
                }
            });
        } else {
            dataGroupBy.set(null, data);
            keys.push(null);
        }

        let valueOrderBy = this._orderBy(keys, (element) => { return element }, sortDirection);

        valueOrderBy.forEach(key => {
            if (dataGroupBy.has(key)) {
                let datas = dataGroupBy.get(key);
                let datasOrdered = this._orderBy(datas, sortProperty, sortDirection);
                returnMap.set(key, datasOrdered);
            }

        });

        return returnMap;
    }
    
    private _orderBy<T>(data: T[], property: string | ((element: T) => string), direction: 'asc' | 'desc'): T[] {
        if (property && direction) {
            return _.orderBy(data, property, direction);
        }
        return data;
    }

}
