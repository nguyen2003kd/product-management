// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-form input[name="keyword"]');
    const searchForm = document.querySelector('.search-form');
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    
    if (searchInput && searchForm) {
        let timeoutId;
        searchForm.appendChild(searchResults);

        // Function to show results with animation
        const showResults = () => {
            searchResults.style.display = 'block';
            // Trigger reflow
            searchResults.offsetHeight;
            searchResults.classList.add('active');
        };

        // Function to hide results with animation
        const hideResults = () => {
            searchResults.classList.remove('active');
            setTimeout(() => {
                searchResults.style.display = 'none';
            }, 300); // Match transition duration
        };

        searchInput.addEventListener('input', function(e) {
            const keyword = e.target.value.trim();
            
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            if (!keyword) {
                hideResults();
                return;
            }

            // Add loading state
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Đang tìm kiếm...</span>
                </div>
            `;
            showResults();

            timeoutId = setTimeout(async () => {
                try {
                    const response = await fetch(`/search/autocomplete?keyword=${encodeURIComponent(keyword)}`);
                    const suggestions = await response.json();
                    
                    if (suggestions.length > 0) {
                        searchResults.innerHTML = suggestions.map(product => `
                            <a href="/product/detail/${product.slug}" class="search-result-item">
                                <div class="result-thumbnail">
                                    <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
                                </div>
                                <div class="result-info">
                                    <div class="result-title">${product.title}</div>
                                    <div class="result-price">
                                        ${product.discountPercentage > 0 
                                            ? `<span class="new-price">$${product.newPrice}</span>
                                               <span class="old-price">$${product.price}</span>`
                                            : `<span class="price">$${product.price}</span>`
                                        }
                                    </div>
                                </div>
                            </a>
                        `).join('');
                    } else {
                        searchResults.innerHTML = `
                            <div class="no-results">
                                <i class="fas fa-search"></i>
                                <span>Không tìm thấy sản phẩm</span>
                            </div>
                        `;
                    }
                } catch (error) {
                    console.error('Error fetching search suggestions:', error);
                    searchResults.innerHTML = `
                        <div class="no-results">
                            <i class="fas fa-exclamation-circle"></i>
                            <span>Có lỗi xảy ra, vui lòng thử lại</span>
                        </div>
                    `;
                }
            }, 300);
        });

        // Handle focus
        searchInput.addEventListener('focus', function() {
            if (searchInput.value.trim()) {
                showResults();
            }
        });

        // Handle blur with delay to allow clicking results
        searchInput.addEventListener('blur', function() {
            setTimeout(hideResults, 200);
        });

        // Handle keyboard navigation
        searchInput.addEventListener('keydown', function(e) {
            const items = searchResults.querySelectorAll('.search-result-item');
            const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentIndex < items.length - 1) {
                        items[currentIndex + 1].focus();
                    } else if (items.length > 0) {
                        items[0].focus();
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        items[currentIndex - 1].focus();
                    } else if (items.length > 0) {
                        items[items.length - 1].focus();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    hideResults();
                    searchInput.focus();
                    break;
                case 'Enter':
                    if (document.activeElement.classList.contains('search-result-item')) {
                        e.preventDefault();
                        document.activeElement.click();
                    }
                    break;
            }
        });

        // Prevent form submission if clicking a result
        // searchForm.addEventListener('click', function(e) {
        //     if (e.target.closest('.search-result-item')) {
        //         e.preventDefault();
        //     }
        // });

        // Add loading animation to search button
        const searchBtn = searchForm.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                if (!searchInput.value.trim()) {
                    e.preventDefault();
                    searchInput.focus();
                }
            });
        }
    }
}); 