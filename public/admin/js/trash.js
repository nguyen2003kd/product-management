const buttonDelete = document.querySelectorAll('[button-change-deleted]');
if(buttonDelete.length > 0) {
    buttonDelete.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const confirmation = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không lần xóa này không thể khôi phục được?");
            if(confirmation){
                const id = button.getAttribute('data-id');
                const form = document.querySelector('#form-change-deleted');
                const action = form.getAttribute('data-url');
                form.action = action+`/${id}?_method=DELETE`;
                form.submit();
            }
        })
        
    })
}
const buttonRestore = document.querySelectorAll('[button-change-restore]');
if(buttonRestore.length > 0) {
    buttonRestore.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const confirmation = window.confirm("Bạn có chắc chắn muốn khôi phục sản phẩm này không?");
            if(confirmation){
                const id = button.getAttribute('data-id');
                const form = document.querySelector('#form-change-restore');
                const action = form.getAttribute('data-url');
                form.action = action+`/${id}?_method=PATCH`;
                form.submit();
            }
        })
        
    })
}