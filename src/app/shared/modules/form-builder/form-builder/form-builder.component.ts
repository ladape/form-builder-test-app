import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Attribute, FormElement, JsonResponse} from "../../../models/form-builder-models";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  public form: FormGroup | undefined;
  public formElements: FormElement[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<JsonResponse>('assets/dummyJSONData/form.json').subscribe((response: JsonResponse) => {
      this.form = this.createForm(response);
    });
  }

  createForm(jsonData: JsonResponse): FormGroup {
    const formGroup: { [key: string]: any } = {};
    const formElements: FormElement[] = [];

    jsonData.entries.forEach((entry: { attributes: Attribute[]; definition: any[];  }) => {
      entry.attributes.forEach((attribute: any) => {
        if (!attribute.values) {
          const controlName = attribute.attribute_id;
          const {defaultValue, validators} = this.getAttributeOptions(attribute);
          const formElement = {
            ...attribute,
            definition: entry.definition.find((definition: any) => attribute.definition_id === definition.attribute_definition_id),
            formControlName: controlName
          }

          formGroup[controlName] = [defaultValue, validators];
          formElements.push(formElement);
        } else {
          const accordionGoupItems: FormControl[] = [];
          const items = attribute.values;

          items.forEach((attributeItem: any) => {
            const controlName = attributeItem.attribute_id;
            const {defaultValue, validators} = this.getAttributeOptions(attributeItem);
            const formElement = {
              ...attributeItem,
              definition: entry.definition.find((definition: any) => attributeItem.definition_id === definition.attribute_definition_id),
              formControlName: controlName
            }

            accordionGoupItems.push(formElement)
            formGroup[controlName] = [defaultValue, validators];
          });

          if (accordionGoupItems.length) {
            formElements.push(
              {
                items: accordionGoupItems,
                isGroup: true
              }
            );
          }
        }
      });
    });

    this.formElements = formElements;

    return this.fb.group(formGroup);
  }

  private getAttributeOptions(attribute: any): {validators: ValidatorFn[]; defaultValue: unknown} {
    let defaultValue;
    let typeDetails;
    let validators: ValidatorFn[] = [];

    if (attribute.type_details) {
      typeDetails = JSON.parse(attribute.type_details);
      if (typeDetails.min) {
        validators =  [Validators.required, Validators.min(typeDetails.min), Validators.max(typeDetails.max)]
      }
      if (typeDetails.min_length) {
        validators =  [Validators.required, Validators.minLength(typeDetails.min_length), Validators.maxLength(typeDetails.max_length)]
      }
    }

    switch (attribute.type) {
      case 'STRING':
        defaultValue = attribute.value;
        break;
      case 'JSON':
        defaultValue = attribute.value;
        break;
      case 'BOOL':
        defaultValue = attribute.value === 'true';
        break;
      case 'is_true':
        defaultValue = attribute.value === 'true';
        break;
      case 'INT':
      case 'NUMBER':
      case 'FLOAT':
        defaultValue = +attribute.value;
        break;
      default:
        defaultValue = attribute.value ? attribute.value : null;
        break;
    }

    return {
      validators,
      defaultValue
    }
  }
}
