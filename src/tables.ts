
import { inject, NewInstance } from "aurelia-dependency-injection";
import { SortService } from './tables/sortService';

@inject(NewInstance.of(SortService))
export class Tables {

  public items = [{
        label : "1",
        type : "Small"
      },
      {
        label : "2",
        type : "Small"
      },
      {
        label : "3",
        type : "Small"
      },
      {
        label : "4",
        type : "Small"
      },
      {
        label : "5",
        type : "Big"
      },
      {
        label : "6",
        type : "Big"
      },
      {
        label : "7",
        type : "Big"
      },
      {
        label : "8",
        type : "Big"
      },
      {
        label : "9",
        type : ""
      },
      {
        label : "10",
        type : ""
      }
    ];

  constructor(public sortService: SortService) {
  }
}

