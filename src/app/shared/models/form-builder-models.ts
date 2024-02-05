import {FormControl, FormGroup} from "@angular/forms";

export interface FormGroupItem {
    items: FormControl[] | FormGroup;
    isGroup: boolean;
}

export type FormElement = any | FormGroupItem;


export interface Attribute {
    attribute_id?: string;
    definition_id?: string;
    items?: Attribute[];
}

export interface JsonResponse {
    entries: {
        attributes: Attribute[];
        definition: any[]; // You can create a type or interface for this as well
    }[];
}
