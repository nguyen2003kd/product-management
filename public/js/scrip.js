// const editQuantity = document.querySelectorAll('[edit-quantity]');
//   if(editQuantity.length > 0) {
//     editQuantity.forEach(item => {
//         const dedecrease=item.querySelector('#decrease');
//         const input = item.querySelector('input');
//         dedecrease.addEventListener('click', (e) => {
//         e.preventDefault();
//         let value = parseInt(input.value);
//         if(value > 1) {
//             value--;    
//         }
//         input.value = value;
//     });
//     const increase=item.querySelector('#increase');
//     increase.addEventListener('click', (e) => {
//         e.preventDefault();
//         let value = parseInt(input.value);
//         if(value < parseInt(input.max)) {
//             value++;
//         }
//         input.value = value;
//     });
//     input.addEventListener('blur', (e) => {
//         e.preventDefault();
//         let value = parseInt(input.value);
//         if(isNaN(value)) {
//             value = parseInt(input.min);
//             input.value = value;
//         }
//         if(value < parseInt(input.min)) {
//             value = parseInt(input.min);
//             input.value = value;
//         }
//         if(value > parseInt(input.max)) {
//             value = parseInt(input.max);
//             input.value = value;
//         }
//     });
//     });
// }
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
    setTimeout(()=>{
        showAlert.classList.add("hide");
    },parseInt(dataTime)+800)
}
//end show alert
//swiper
document.addEventListener('DOMContentLoaded', function() {
    new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        480: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 }
      }
    });
  });
//end swiper
//update cart quantity
const editQuantity = document.querySelectorAll('[edit-quantity]');

if (editQuantity.length > 0) {
  editQuantity.forEach(item => {
    const decreaseBtn = item.querySelector('#decrease');
    const increaseBtn = item.querySelector('#increase');
    const input = item.querySelector("input[name='quantity']");

    const min = parseInt(input.min);
    const max = parseInt(input.max);

    const validateAndUpdate = () => {
      let value = parseInt(input.value);
      if (isNaN(value) || value < min) {
        value = min;
      } else if (value > max) {
        value = max;
      }
      input.value = value;

      // Update URL (if needed)
      const productId = input.getAttribute('data-product-id');
      if (productId) {
        window.location.href = `/cart/${productId}/${value}`;
      }
    };

    // Giảm
    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let value = parseInt(input.value);
        if (value > min) {
          input.value = value - 1;
          validateAndUpdate();
        }
      });
    }

    // Tăng
    if (increaseBtn) {
      increaseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let value = parseInt(input.value);
        if (value < max) {
          input.value = value + 1;
          validateAndUpdate();
        }
      });
    }

    // Khi blur hoặc thay đổi bằng tay
    input.addEventListener('blur', validateAndUpdate);
    input.addEventListener('change', validateAndUpdate);
  });
}
//end update cart quantity
// resend OTP
const countdown = () => {
  let countdown = 10;
  const countdownDiv = document.getElementById('countdown');
  const resendBtn = document.getElementById('resendBtn');

  countdownDiv.style.display = 'inline-block';
  resendBtn.style.display = 'none';

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      countdownDiv.textContent = `Gửi lại mã xác thực trong ${countdown} giây`;
    } else {
      clearInterval(interval);
      countdownDiv.style.display = 'none';
      resendBtn.style.display = 'inline-block';
    }
  }, 1000);
}

document.getElementById('resendBtn')?.addEventListener('click', () => {
  // Gửi request POST đến server để tạo lại OTP
  fetch('/user/resend-otp', { method: 'POST' })
    .then(() => {
      alert('Đã gửi lại mã OTP!');
      countdown(); // Gọi lại khi người dùng ấn "Gửi lại"
    });
});

// Gọi khi trang được load để bắt đầu đếm ngược ban đầu
window.addEventListener('DOMContentLoaded', countdown);
//display image
const display=document.querySelector('[upload-image]')
if(display){
    const inputImage=display.querySelector('[upload-image-input]')
    const uploadImage=display.querySelector('[upload-image-preview]');
    inputImage.addEventListener("change",(e)=>{
        const file=e.target.files[0]
        if(file){
            uploadImage.src=URL.createObjectURL(file)
        }

    })
}
//end display image
// Change Password Modal
// document.getElementById('changePasswordForm').addEventListener('submit', async function(e) {
//   e.preventDefault();
//   const formData = new FormData(this);
//   const data = Object.fromEntries(formData.entries());
  
//   try {
//     const response = await fetch('/user/change-password', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     });
    
//     const result = await response.json();
    
//     if (response.ok) {
//       // Show success message
//       const successAlert = document.createElement('div');
//       successAlert.className = 'alert alert-success alert-dismissible fade show';
//       successAlert.innerHTML = `
//         ${result.message}
//         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//       `;
//       document.querySelector('.container').insertBefore(successAlert, document.querySelector('.row'));
      
//       // Close modal and reset form
//       const modal = bootstrap.Modal.getInstance(document.getElementById('changePasswordModal'));
//       modal.hide();
//       this.reset();
//     } else {
//       // Show error message
//       const errorAlert = document.createElement('div');
//       errorAlert.className = 'alert alert-danger alert-dismissible fade show';
//       errorAlert.innerHTML = `
//         ${result.message}
//         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//       `;
//       document.querySelector('.container').insertBefore(errorAlert, document.querySelector('.row'));
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// });