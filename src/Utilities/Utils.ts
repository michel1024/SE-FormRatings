import { sp } from "@pnp/sp/presets/core";

let config = {
headers: {
["accept"]:"application/json;odata=nometadata"
    }
}



export namespace lists {
    export const MDExperience = sp.web.lists.getById("6d8123a0-f96c-4fc7-862a-10e31b47e169");
    MDExperience.configure(config);    
}

export namespace ui {

    export declare interface IFieldPayload {
        className?: string;
        id?: string;
        name?: string;
        required?: boolean;
        title: string;
        type: string;
        value?: string;
        readonly?:string;
        others?:string;
        classTitle?:string;
        checkBox?:boolean;
      }

    export function renderFieldDetail(parameters:IFieldPayload): string {
      const { title, value, type, id, className, required, name, others,classTitle } = parameters;
      return `
          <label>${title}</label>
          <div class="control">
            <${type} id="${id || ""}" name="${name}" class="${className || ""}" data-bind="value: ${value}" ${required ? "required" : ""} ${others ? others : ""}></${type}>
          </div>
      `;
    }
}