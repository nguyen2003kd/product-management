const input= document.querySelectorAll('[button-change-deleted]')
if(input.length>0){
    input.forEach((item)=>{
        item.addEventListener('click',async (e)=>{
            const formDelete = document.querySelector('#form-delete-roles')
            const patch=formDelete.getAttribute('data-url')
            const id = e.target.getAttribute('data-id')
            formDelete.action=`${patch}/${id}?_method=DELETE`
            formDelete.submit()
    })
})
}