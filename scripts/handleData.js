// Khai báo biến toàn cục
window.jsonData = [];

function handleData(data){
    const container = document.querySelector('.card-container');
    container.innerHTML = '';

    // Chuyển dữ liệu thành mảng object
    window.jsonData = [];
    for(let i = 1; i < data.length; i++){
        const [name, image, link] = data[i];
        window.jsonData.push({ name, image, link });

        // Render card ban đầu
        const card = document.createElement('m-card');
        card.setAttribute('name', name);
        card.setAttribute('image', image);
        card.setAttribute('link', link);
        container.appendChild(card);
    }
}

// Hàm renderResults để hiển thị lại danh sách card khi tìm kiếm
function renderResults(results){
    const container = document.querySelector('.card-container');
    container.innerHTML = '';
    results.forEach(item => {
        const card = document.createElement('m-card');
        card.setAttribute('name', item.name);
        card.setAttribute('image', item.image);
        card.setAttribute('link', item.link);
        container.appendChild(card);
    });
}
