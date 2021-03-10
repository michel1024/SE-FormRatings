import { lists } from "../Utilities/Utils";

export namespace DataController{

    export async function readData(){
        return await lists.MDExperience.items
        .orderBy("Created", false)
        .get()
    }

    export async function updateData(data){
        return await lists.MDExperience.items.getById(data.Id).update(data);
    }

}
