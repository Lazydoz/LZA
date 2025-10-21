document.addEventListener('submit', function(event) {
    if (event.target.matches('form.search-bar')) {
        event.preventDefault();
        handleSearch();
    }
});

// Biến toàn cục lưu kết quả tìm kiếm
let searchResults = [];

function searchProducts(keyword, data){
    // Lọc các sản phẩm có tên chứa từ khóa (không phân biệt hoa thường)
    return data.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
}

function handleSearch(){
    const keyword = document.getElementById('searchBox').value;
    searchResults = searchProducts(keyword, jsonData);
    renderResults(searchResults);
}