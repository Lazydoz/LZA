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

const sheetname = 'AVATAR';
const script = document.createElement('script');
script.src = `https://script.google.com/macros/s/AKfycbxHcScV1xSOVetZH0eUud5wfHGuKl011qv-7kXgYLoL/exec?callback=handleData&sheetname=${sheetname}`;
document.body.appendChild(script);