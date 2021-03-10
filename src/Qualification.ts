import { DataBL, EditData } from "./BuinessLogic/QualificationBL";
import * as QualificationTemplate from "./Template/QualificationTemplate";
import "./Styles/Styles.css" ;

var dataSource = 
new kendo.data.DataSource({
    pageSize: 100,
    transport: {
        read: async (ev) => { 
            let result = await DataBL.readData();
            ev.success(result);
        },
        update: async (ev) => {
           await DataBL.updateData(ev.data);
        }
    },
    schema: {
        model: {
            id: "Id",
            fields: {
                Title: { type: "string" },
            }
        }
    },
});

const grid = $("#gridQualification").kendoGrid({
    columns: [
        { field: "Id", title: "Id" },
    ],
    editable: {
       mode: "popup",
       template: QualificationTemplate.getTemplate(),
       window: { title: "Rating" }
   },
   edit: EditData.edit,
    toolbar: [{
        name: "create",
        text: "ADD NEW"
    }],
    dataSource: dataSource,
    dataBound: function() {
        console.log(window.location.href);
        let Url = window.location.href.split("=")
        
        if (Url.length > 1) {
            let num = parseInt(Url[1])
            console.log(num);
            
            var grid = $("#gridQualification").data("kendoGrid");
            
            var item = grid.dataSource.get(num);
            
            var tr = $("[data-uid='" + item.uid + "']", grid.tbody)
            
            grid.addRow();
        }

    }
}).data("kendoGrid");


$("#gridQualification").css("opacity", "0");