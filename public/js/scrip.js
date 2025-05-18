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