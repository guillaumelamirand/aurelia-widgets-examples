import * as _ from 'lodash'
import { bindable, containerless } from 'aurelia-framework';
import { SortService } from './sortService';

@containerless
export class SortHeaderCustomElement {
    @bindable
    public title: string;

    @bindable
    public sortProperty: string;

    @bindable
    public groupByProperty: string;

    @bindable
    public sortService: SortService;

    @bindable
    public class: string;

    public get isAsc(): boolean {
        return this.sortService.isAsc(this.groupByProperty, this.sortProperty);
    }

    public get isDesc(): boolean {
        return this.sortService.isDesc(this.groupByProperty, this.sortProperty);
    }

    public get isEnabled(): boolean {
        return this.sortService.isEnabled(this.groupByProperty, this.sortProperty);
    }

    public sort() {
        this.sortService.sort(this.groupByProperty, this.sortProperty);
    }

}
