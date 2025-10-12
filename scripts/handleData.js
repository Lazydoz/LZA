function handleData(data){
    const container = document.querySelector('.card-container');
    container.innerHTML = '';

    for(let i = 1; i < data.length; i++){
        const [name, image, link] = data[i];
        const card = document.createElement('m-card');
        card.setAttribute('name', name);
        card.setAttribute('image', image);
        card.setAttribute('link', link);
        container.appendChild(card);
    }
}
