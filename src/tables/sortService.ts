export class SortService {

    // Define the property on which one the datas are grouped by
    public groupByProperty: string;

    // Define the property on which one the datas are being sorted
    public sortProperty: string;

    // Define the direction used to sort the datas
    public sortDirection: 'asc' | 'desc';

    public sort(groupByProperty: string, sortProperty: string) {

        if (this.groupByProperty === groupByProperty && this.sortProperty === sortProperty) {
            switch (this.sortDirection) {
                case SortConstants.SORT_ASCENDING:
                    this.sortDirection = SortConstants.SORT_DESCENDING;
                    this.groupByProperty = groupByProperty;
                    this.sortProperty = sortProperty;
                    break;
                case SortConstants.SORT_DESCENDING:
                    this.sortDirection = null;
                    this.groupByProperty = null;
                    break;
                default:
                    this.sortDirection = SortConstants.SORT_ASCENDING;
                    this.groupByProperty = groupByProperty;
                    this.sortProperty = sortProperty;
                    break;
            }
        } else {
            this.groupByProperty = groupByProperty;
            this.sortProperty = sortProperty;
            this.sortDirection = SortConstants.SORT_ASCENDING;
        }
    }

    public isAsc(groupByProperty: string, sortProperty: string): boolean {
        return this.isEnabled(groupByProperty, sortProperty) && this.sortDirection === SortConstants.SORT_ASCENDING;
    }

    public isDesc(groupByProperty: string, sortProperty: string): boolean {
        return this.isEnabled(groupByProperty, sortProperty) && this.sortDirection === SortConstants.SORT_DESCENDING;
    }

    public isEnabled(groupByProperty: string, sortProperty: string): boolean {
        return this.groupByProperty === groupByProperty && this.sortProperty === sortProperty && !!this.sortDirection;
    }
}

export class SortConstants {
    public static readonly SORT_ASCENDING = 'asc';
    public static readonly SORT_DESCENDING = 'desc';
}