import * as moment from 'moment'

import { inject, NewInstance } from "aurelia-dependency-injection";
import { bindable, bindingMode } from 'aurelia-framework';

import { SelectHelper } from '../SelectHelper';

@inject(Element, NewInstance.of(SelectHelper))
export class SelectPeriodCustomElement {

    @bindable
    public customContext: any;

    @bindable
    public allLabel: string = PeriodLabel.ALL;

    @bindable
    public lastMonthLabel: string = PeriodLabel.LAST_MONTH;
    @bindable
    public showLastMonth: boolean = true;

    @bindable
    public lastQuarterLabel: string = PeriodLabel.LAST_QUARTER;
    @bindable
    public showLastQuarter: boolean = true;

    @bindable
    public lastYearLabel: string = PeriodLabel.LAST_YEAR;
    @bindable
    public showLastYear: boolean = true;

    @bindable
    public customLabel: string = PeriodLabel.CUSTOM;
    @bindable
    public showCustom: boolean = true;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    public selectedPeriod: SelectPeriodItem;
    @bindable
    public onSelectionChanged: (item: SelectPeriodItem) => void;

    public customStartDate: moment.Moment;
    public customEndDate: moment.Moment;

    public selectedPeriodIndex = 0;

    constructor(private _element: Element,
        public selectHelper: SelectHelper) {
        this.selectHelper.element = this._element;
    }

    public bind(bindingContext: any) {
        if (!this.customContext) {
            this.customContext = bindingContext;
        }
    }


    public selectLastMonthPeriod() {
        this.selectedPeriodIndex = 1;
        this._selectPeriod({
            label: PeriodLabel.LAST_MONTH,
            start: moment().subtract(1, 'months'),
            end: moment()
        } as SelectPeriodItem);
    }

    public selectLastQuarterPeriod() {
        this.selectedPeriodIndex = 2;
        this._selectPeriod({
            label: PeriodLabel.LAST_QUARTER,
            start: moment().subtract(3, 'months'),
            end: moment()
        } as SelectPeriodItem);
    }

    public selectLastYearPeriod() {
        this.selectedPeriodIndex = 3;
        this._selectPeriod({
            label: PeriodLabel.LAST_YEAR,
            start: moment().subtract(1, 'years'),
            end: moment()
        } as SelectPeriodItem);
    }

    public customDatesChanged(startDate: Date, endDate: Date) {

        this.selectedPeriodIndex = 0;
        this._selectPeriod({
            label: PeriodLabel.CUSTOM,
            start: startDate ? moment(startDate) : null,
            end: endDate ? moment(endDate) : null
        } as SelectPeriodItem);
        this.selectHelper.dropDownMenuVisible = true;
    }


    public unSelectPeriod() {
        this.customStartDate = null;
        this.customEndDate = null;
        this.selectedPeriodIndex = 0;
        this._selectPeriod(null);
    }

    public clear() {
        this.customStartDate = null;
        this.customEndDate = null;
        this.selectedPeriodIndex = 0;
        this._selectPeriod(null, true);
    }

    private _selectPeriod(item: SelectPeriodItem, noChangedEvent?: boolean) {
        this.selectedPeriod = item;
        this.selectHelper.dropDownMenuVisible = false;
        !noChangedEvent && this.onSelectionChanged && this.onSelectionChanged.apply(this.customContext, [item]);
    }
}

export class PeriodLabel {

    public static readonly ALL = "Toute période";
    public static readonly LAST_MONTH = "Dernier mois";
    public static readonly LAST_QUARTER = "Dernier trimestre";
    public static readonly LAST_YEAR = "Dernière année";
    public static readonly CUSTOM = "Personnalisée";

}

export class SelectPeriodItem {

    public label: string;
    public start: moment.Moment;
    public end: moment.Moment;

}
