const editQuantity = document.querySelector('[edit-quantity]');
if(editQuantity) {
    const dedecrease=editQuantity.querySelector('#decrease');
    const input = editQuantity.querySelector('input');
    dedecrease.addEventListener('click', (e) => {
        e.preventDefault();
        let value = parseInt(input.value);
        if(value > 1) {
            value--;    
        }
        input.value = value;
    });
    const increase=editQuantity.querySelector('#increase');
    increase.addEventListener('click', (e) => {
        e.preventDefault();
        let value = parseInt(input.value);
        if(value < parseInt(input.max)) {
            value++;
        }
        input.value = value;
    });
    input.addEventListener('blur', (e) => {
        e.preventDefault();
        let value = parseInt(input.value);
        if(isNaN(value)) {
            value = parseInt(input.min);
            input.value = value;
        }
        if(value < parseInt(input.min)) {
            value = parseInt(input.min);
            input.value = value;
        }
        if(value > parseInt(input.max)) {
            value = parseInt(input.max);
            input.value = value;
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const searchNavItem = document.querySelector('.search-nav-item');
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-form input');

    // Toggle search form
    searchToggle.addEventListener('click', function(e) {
      e.preventDefault();
      searchNavItem.classList.toggle('active');
      if (searchNavItem.classList.contains('active')) {
        searchInput.focus();
      }
    });

    // Close search form when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.search-nav-item')) {
        searchNavItem.classList.remove('active');
      }
    });

    // Handle form submission
    searchForm.addEventListener('submit', function(e) {
      const keyword = searchInput.value.trim();
      if (!keyword) {
        e.preventDefault();
      }
    });
  });
//form search
// const formSearch = document.querySelector('#form-search');
// if(formSearch) {
//     let url=new URL(window.location.href);
//     formSearch.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const search = e.target.elements.keyword.value;
//         if(search){
//             url.searchParams.set("keyword", search);
//             // url.searchParams.set('page', 1);
//         }
//         else { 
//             url.searchParams.delete("keyword");
//         }
//         const dataAction = formSearch.getAttribute('data-url');
//         const urlNew = `http://${url.host}${dataAction}${url.search}`;
//         window.location.href = urlNew;
//     });
    
// }
//end form search
//price range
const priceRange = document.querySelector('.price-range');
if(priceRange) {
    const priceRangeInput = priceRange.querySelectorAll('input');
    const priceRangeLabel = priceRange.querySelector('label');
    let url=new URL(window.location.href);
    priceRangeInput.forEach(input => {
        input.addEventListener('change', (e) => {
            e.preventDefault();
            const price = e.target.value;
            const [min, max] = price.split('-');
            url.searchParams.set('min', min);
            url.searchParams.set('max', max);
            console.log(url.href);
            window.location.href = url.href;
        });
    });
    if(url.searchParams.get('min') && url.searchParams.get('max')) {
        const priceRangeActive = priceRange.querySelector(`input[value="${url.searchParams.get('min')}-${url.searchParams.get('max')}"]`);
        priceRangeActive.checked = true;
    }
}
  //end price range
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