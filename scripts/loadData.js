function loadData(sheetname){
    const script = document.createElement('script');
    const parts = [
        `https://script.google.com`,
        `/macros`,
        `/s`,
        `/AKfycbxHcScV1xSOVetZH0eUud5wfHGuKl011qv-7kXgYLoL`,
        `/exec`
    ];
    const src = `${parts.join('')}?callback=handleData&sheetname=${encodeURIComponent(sheetname)}`;
    console.log('[loadData] loading JSONP script:', src);
    script.src = src;
    script.async = true;

    // show loader
    try {
        const container = document.querySelector('.card-container');
        if (container) {
            if (!document.getElementById('data-loader')) {
                const loader = document.createElement('div');
                loader.id = 'data-loader';
                loader.className = 'data-loader d-flex justify-content-center align-items-center p-4';
                loader.innerHTML = `\n                    <div class="spinner-border text-primary" role="status">\n                      <span class="visually-hidden">Loading...</span>\n                    </div>\n                `;
                container.innerHTML = '';
                container.appendChild(loader);
            }
        }
    } catch (e) {
        console.warn('loadData: could not show loader', e);
    }

    script.onerror = () => {
        console.error('[loadData] failed to load JSONP script:', src);
        const loader = document.getElementById('data-loader');
        if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
        const container = document.querySelector('.card-container');
        if (container) container.innerHTML = '<div class="text-danger p-3">Không thể load dữ liệu (kiểm tra kết nối hoặc ID Apps Script)</div>';
    };

    document.body.appendChild(script);
}