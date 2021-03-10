import { ui } from "../Utilities/Utils";

const { renderFieldDetail } = ui;


const Rating = renderFieldDetail ({id: "Satisfaction", className: "input k-textbox", title: "What level of satisfaction would you rate the current requirement?", type: "div", name: "Satisfaction", others:"validationMessage='This field is required'", value:"Satisfaction",required: true})
const Comments = renderFieldDetail ({id: "Comments", className: "textarea k-textbox", title: "Comments", type: "textarea", name: "Comments", others:"validationMessage='This field is required'", value:"Comments",required: true})



export function getTemplate(): string {
    return `
    <div id="tabstrip">
        <ul>
            <li style="display: none;" class="k-state-active">Initiative</li>
        </ul>


        <div class="edit-container">
            <span id="popupNotification"></span>

            <span id="popupNotification"></span>

            <div class="columns">

                <div class="column is-12">
                    <div class="column is-12">
                        <span class="required-icon">*</span> 
                        ${Rating}
                        <input type="text" id="calification" class="input" style="text-align: center; font-size: 20px;" >
                        <span class="k-invalid-msg" data-for="dIniciativeCreation"></span>
                        <input type="hidden" id="star" name="star" required validationMessage="This field is required" />
                    </div>

                    <div class="column is-12">
                        <span class="required-icon">*</span> 
                        ${Comments} 
                        <span class="k-invalid-msg" data-for="dIniciativeCreation"></span>
                    </div>
                    <br>
                </div>

            </div>

        </div>

    </div>   
    <div id ="load"></div> 
    `;
}