//button change status
const buttonChange = document.querySelectorAll('[button-change-status]');
const formPatch = document.querySelector('#form-change-status');
if(buttonChange.length > 0) {
    buttonChange.forEach((button) => {
        button.addEventListener('click', (e) => {
            let status =button.getAttribute('button-change-status');
            const id = button.getAttribute('data-id');
            const patch=formPatch.getAttribute('data-url');
            status=status =='active' ? 'inactive' : 'active';
            const newPatch = patch+`/${status}/${id}?_method=PATCH`;
            formPatch.action=newPatch;
            formPatch.submit();
        })
    })
}
//end button change status
//chage status delete
const tableMultipleDelete = document.querySelector("[check-box-multi]");
if (tableMultipleDelete) {
    const buttonChangedelete = tableMultipleDelete.querySelectorAll('[button-change-deleted]');
    const formPatch = document.querySelector('#form-change-deleted');
    if(buttonChangedelete.length > 0) {
        buttonChangedelete.forEach((button) => {
            button.addEventListener('click', (e) => {
                const checkClient=window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
                if(checkClient) { 
                    const id = button.getAttribute('data-id');
                    const patch=formPatch.getAttribute('data-url');
                    const newPatch = patch+`/${id}?_method=PATCH`;
                    formPatch.action=newPatch;
                    formPatch.submit();
                }
            })
        })
    }
}
//end chage status delete
