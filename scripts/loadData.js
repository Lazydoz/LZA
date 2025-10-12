function loadData(sheetname){
    const script = document.createElement('script');
    const parts = [
        `https://script.google.com`,
        `/macros`,
        `/s`,
        `/AKfycbxHcScV1xSOVetZH0eUud5wfHGuKl011qv-7kXgYLoL`,
        `/exec`
    ]
    script.src = `${parts.join('')}?callback=handleData&sheetname=${sheetname}`;
    document.body.appendChild(script);
}