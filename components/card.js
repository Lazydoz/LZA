export class Card extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const name = this.getAttribute('name') || 'Sample Card';
        const image = this.getAttribute('image') || 'https://via.placeholder.com/150';
        const link = this.getAttribute('link') || '#';
        /*
        const download = this.getAttribute('download') || '#';
        
        let downloadBtn = '';
        if (window.isAdmin){
            downloadBtn = `<a href="${download}" class="btn card-detail" target="_blank">📥</a>`
        }
        */
        this.innerHTML = `
            <div class="card">
                <div class="card-logo">
                    <img src="${image}" alt="Logo" />
                </div>
                <div class="card-content">
                    <h2 class="card-title">${name}</h2>
                    <button class="btn card-detail">Detail</button>
                    <!--\${downloadBtn}-->
                </div>
            </div>
        `;

        this.querySelector('.card-detail').addEventListener('click', () => {
            function showModal() {
                const modalEl = document.querySelector('m-modal');
                if (!modalEl) return;
                const modal = modalEl.querySelector('#card-modal');
                const body = modalEl.querySelector('#modal-body');
                if (!modal || !body) {
                    // Nếu modal chưa load xong, thử lại sau 100ms
                    setTimeout(showModal, 100);
                    return;
                }
                body.innerHTML = `
                    <div class="modal-content-wrapper">
                        <img src="${image}" alt="Logo" style="max-width:100%;" />
                        <div class="modal-info">
                            <h2>${name}</h2>
                            <p><strong>For : </strong> </p>
                            <p>
                                <a href="${link}" target="_blank" class="btn btn-primary">Go to link</a>
                                <button class="btn btn-success">Add to list</button>
                            </p>
                        </div>
                    </div>
                `;
                modal.style.display = 'flex';
            }
            showModal();
        });
    }
}
customElements.define('m-card', Card);

