import "../js/rating.js";
import "../Styles/rating.css";
import { DataController } from "../Controller/QualificationController";
import { lists } from "../Utilities/Utils.js";

export namespace DataBL{
    
    export var classification;

    export async function readData(){
        return await DataController.readData();
    }

    export async function updateData(data: any){

        if(classification && data.Comments != ""){

            data.Satisfaction = classification.toString();
            data.Evaluated = true;
        
            return await DataController.updateData(data);
        }
    }
}


export namespace EditData{

    export async function edit(ev: kendo.ui.GridEditEvent){

      var calificated;

      if(!( ev.model.isNew() )){
        calificated = parseInt(ev.model["Satisfaction"]);
        console.log(calificated);
        $("#calification").val(calificated);
        $("#calification").attr("disabled", "disabled");

        console.log(ev.model["Evaluated"]);
        


        if(ev.model["Evaluated"] == true){
          $(".k-grid-update").attr("disabled", "disabled");

          $("#Comments").attr("disabled", "disabled");
          $("#Satisfaction").attr("disabled", "disabled");

        }
        
      }


        $(".k-grid-update").html("<span class='k-icon k-i-check'></span>SAVE");

        $("#Satisfaction").rateYo({
            numStars: 10,
            fullStar: true,
            rating: calificated/2,
            onSet: function (rating, rateYoInstance) {
                
                let classification = rating*2;
                DataBL.classification = classification;

                $("#star").val(classification);
                $("#calification").val(rating*2);
            },
            multiColor: {
                "startColor": "#FF0000",
                "endColor"  : "#31C41D" 
            }
        });


        $(".k-grid-update").click(async function(){
            console.log(DataBL.classification);
            
            let comment = $("#Comments").val();
            console.log(comment);
            
            if(DataBL.classification && comment != ""){

                await showNotificationWindow();

                await setTimeout(function(){
                        location.href = "https://millicom.sharepoint.com/sites/SharedServiceCenter";
                }, 2000); 
            }
            

        });

        $(".k-grid-cancel, .k-i-close").click( async (e) =>{
            location.href = "https://millicom.sharepoint.com/sites/SharedServiceCenter";
        } );

        validateFields();

        

    }

    export async function validateFields(){
        var validator = $("#tabstrip").kendoValidator().data("kendoValidator");

        $(".k-grid-update").click( () => {
            if (!validator.validateInput($("textarea[name=Comments]"))) {
                NotificationError("The field Comment is required");
            }

            if (!validator.validateInput($("input[name=star]"))) {
                NotificationError("You must choose a rating");
            }
        });
    }

    // Show popip notification when the result is success 
  export function NotificationSuccess(msg:string){
    var popupNotification = $("#popupNotification")
    .kendoNotification({
      position: {
        top: 20
      },
      hideOnClick: true
    })
    .data("kendoNotification");

    popupNotification.show(kendo.toString(msg), "success");
  }

  //Show popup notification when the result is wrong
  export function NotificationError(msg:string){
    var popupNotification = $("#popupNotification")
    .kendoNotification({
      position: {
        top: 20
      },
      autoHideAfter: 10000,
      hideOnClick: true
    })
    .data("kendoNotification");

    popupNotification.show(kendo.toString(msg), "error");
  }


  function showNotificationWindow(){
      // data iene de la funcion VValidateFields, es un array
      let div = document.createElement("div.notificaciones");
      let windowConfir = $(div).kendoWindow({
        width: "430px",
        height: "auto",
        title: "Notification",
        visible: false,
        content: {
          template:  `
            <div>
            <br />
              <h1 style="text-align: center; font-size: 22px;">Thanks for your rating</h1><br/>
              <center><span class="material-icons icon-check">check_circle_outline</span></center>
            </div>
          `
      }
    }).data("kendoWindow").center().open();

  }
}