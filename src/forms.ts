
import { inject, NewInstance } from "aurelia-dependency-injection";
import { ValidationRules, ValidationController, validateTrigger, validationMessages } from 'aurelia-validation';

import { BootstrapFormRenderer } from "./forms/bootstrapFormRenderer";


@inject(NewInstance.of(ValidationController), NewInstance.of(BootstrapFormRenderer))
export class Forms {
  public types = [ "Perso" ,"Pro", "Any"]
  public item: Item;
  constructor(
        public validationController: ValidationController,
        public bootstrapFormRenderer: BootstrapFormRenderer) {
        this.item = {};

        // Validation 
        validationMessages['required'] = `Le champ '\${$displayName}' doit être renseigné.`;

        this.validationController.addRenderer(bootstrapFormRenderer);
        
        ValidationRules.ensure<Item, string>(a => a.label).displayName("Label")
                        .required()
                        .ensure<string>(a => a.type).displayName("Type")
                        .required()
                        .on(this.item);
  }
}

export class Item {

  public label: string;
  public type: string;

}

