const tablePermission = document.querySelector("[table-permission]");
if (tablePermission) {
    const buttonSubmit= document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", function () {
        let permission = [];
        const row= tablePermission.querySelectorAll("[data-name]");
        row.forEach((item) => {
            const name = item.getAttribute("data-name");
            const id = item.querySelectorAll("input");
            if(name=="id"){
                id.forEach((item) => {
                    permission.push({
                        id: item.value,
                        permission:[]
                    });
                });
            }
            else{
                id.forEach((item,index) => {
                    const check = item.checked;
                    if(check){
                        permission[index].permission.push(name);
                    }
                });
            }
        });
        const formPermission = document.querySelector("#form-change-permission");
        const inputData=formPermission.querySelector("input[name='permission']");
        const stringPermission = JSON.stringify(permission)
        inputData.value = stringPermission;
        formPermission.submit();
    });
} 