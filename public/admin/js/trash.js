const buttonDelete = document.querySelectorAll('[button-change-deleted]');
if(buttonDelete.length > 0) {
    buttonDelete.forEach((button) => {
        button.addEventListener('click', (e) => {
            let url=new URL(window.location.href);
            const selected=url.searchParams.get('selected');
            e.preventDefault();
            const confirmation = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không lần xóa này không thể khôi phục được?");
            if(confirmation){
                if(selected) {
                    const id = button.getAttribute('data-id');
                    const form = document.querySelector('#form-change-deleted');
                    const action = form.getAttribute('data-url');
                    form.action = action+`/${id}?_method=DELETE&selected=${selected}`;
                    form.submit();
                }
                else {
                    const id = button.getAttribute('data-id');
                    const form = document.querySelector('#form-change-deleted');
                    const action = form.getAttribute('data-url');
                    form.action = action+`/${id}?_method=DELETE`;
                    form.submit();
                }
            }
        })
        
    })
}
const buttonRestore = document.querySelectorAll('[button-change-restore]');
if(buttonRestore.length > 0) {
    buttonRestore.forEach((button) => {
        button.addEventListener('click', (e) => {
            let url=new URL(window.location.href);
            const selected=url.searchParams.get('selected');
            e.preventDefault();
            const confirmation = window.confirm("Bạn có chắc chắn muốn khôi phục sản phẩm này không?");
            if(confirmation){
                if(selected) {
                    const id = button.getAttribute('data-id');
                    const form = document.querySelector('#form-change-restore');
                    const action = form.getAttribute('data-url');
                    form.action = action+`/${id}?_method=PATCH&selected=${selected}`;
                    form.submit();
                }
                else {
                    const id = button.getAttribute('data-id');
                    const form = document.querySelector('#form-change-restore');
                    const action = form.getAttribute('data-url');
                    form.action = action+`/${id}?_method=PATCH`;
                    form.submit();
                }
            }
        })
        
    })
}
const trash = document.querySelector('[trash]');
if(trash) {
    const selectedTrash = trash.querySelector("[trash-selected]");
    let url=new URL(window.location.href);
    if(selectedTrash) {
        selectedTrash.addEventListener('change', (e) => {
            e.preventDefault();
            const selectedValue = selectedTrash.value;
            url.searchParams.set('selected', selectedValue);
            window.location.href=url.href;
        })
    }
}
let url=new URL(window.location.href);
const selected=url.searchParams.get('selected');
if(selected) {
    const selectedTrash = trash.querySelector(`option[value='${selected}']`);
    selectedTrash.selected = selected;

}