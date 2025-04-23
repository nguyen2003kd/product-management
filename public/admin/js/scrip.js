//button filler
const buttonStatus = document.querySelectorAll('[button-status]');
if(buttonStatus.length > 0) {
    buttonStatus.forEach((button) => {
        let url=new URL(window.location.href);
        button.addEventListener('click', () => {
            const status = button.getAttribute('button-status');
            checkStatus=status;
            if(status == '') {
                url.searchParams.delete('status');
            }
            else
            {
                url.searchParams.set('status', status);
                url.searchParams.set('page', 1);
            }
            window.location.href=url.href;
        })
        
    })
}
//end button filler
//form search
const formSearch = document.querySelector('#form-search');
if(formSearch) {
    let url=new URL(window.location.href);
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        const search = e.target.elements.search.value;
        if(search){
            url.searchParams.set("search", search);
            url.searchParams.set('page', 1);
        }
        else { 
            url.searchParams.delete("search");
        }
        window.location.href=url.href;
    });
    
}
//end form search
//button pagination
const buttonPagination = document.querySelectorAll('[button-pagination]');
if(buttonPagination.length > 0) {
    let url=new URL(window.location.href);
    buttonPagination.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const page = button.getAttribute('button-pagination');
            checkStatus=page;
            if(page == 1) {
                url.searchParams.delete('page');
            }
            else {
                url.searchParams.set('page', page);
            }
            window.location.href=url.href;
        })
        
    })
}
//end button pagination
//mutill change status
const chexboxmulti = document.querySelector('[check-box-multi]');
if(chexboxmulti) {
    const checkboxAll = chexboxmulti.querySelector("input[name='checkall']");
    const checkboxes = chexboxmulti.querySelectorAll("input[name='checkone']");
    if(checkboxAll) {
        checkboxAll.addEventListener('change', () => {
            if(checkboxAll.checked) {
                checkboxes.forEach((checkbox) => {
                    checkbox.checked = checkboxAll.checked;
                })
            }
            else {
                checkboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                })
            }
        })
    }
    if(checkboxes.length > 0) {
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                const coutChecked = chexboxmulti.querySelectorAll("input[name='checkone']:checked").length;
                if(checkboxes.length == coutChecked) {
                    checkboxAll.checked = true;
                }
                else {
                    checkboxAll.checked = false;
                }
            })
        })
    }

}

const fromChangemultil=document.querySelector('[from-change-multil]');
if(fromChangemultil) {
    fromChangemultil.addEventListener('submit', (e) => {
        e.preventDefault();
        const chexboxmulti = document.querySelector('[check-box-multi]');
        const checkboxes = chexboxmulti.querySelectorAll("input[name='checkone']:checked");
        const inputText=fromChangemultil.querySelector("input[name='ids']");
        const type=e.target.elements.type.value
        if(type=="deleted"){
            const isConfirm=window.confirm("Bạn có muốn xóa tất cả không ?")
            if(!isConfirm)
                return;
        };

        if(checkboxes.length > 0) {
            let i=[];
            checkboxes.forEach((checkbox) => {
                if(type=="position"){
                    const position=checkbox.closest('tr').querySelector("input[name='position']").value
                    console.log(checkbox.value+`-`+position)
                    i.push(checkbox.value+`-`+position)
                }
                else
                    i.push(checkbox.value );
            })
            inputText.value=i.join(",");
            fromChangemultil.submit();
        }
        else
        {
            window.confirm("hãy chọn một bản ghi")
        }
})    
}
//end mutill change status
//show alert
const showAlert=document.querySelector('[show-alert]')
if(showAlert)
{
    const dataTime=showAlert.getAttribute('data-time')
    setTimeout(()=>{
        showAlert.classList.remove("slide-in");
        showAlert.classList.add("slide-out");
    },parseInt(dataTime))
}
//end show alert
//display image
const display=document.querySelector('[upload-image]')
if(display){
    const inputImage=display.querySelector('[upload-image-input]')
    const uploadImage=display.querySelector('[upload-image-preview]')
    inputImage.addEventListener("change",(e)=>{
        const file=e.target.files[0]
        if(file){
            uploadImage.src=URL.createObjectURL(file)
        }

    })
}
//end display image