export class Card extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const name = this.getAttribute('name') || 'Sample Card';
        const image = this.getAttribute('image') || 'https://via.placeholder.com/150';
        const link = this.getAttribute('link') || '#';
        this.innerHTML = `
            <div class="card">
                <div class="card-logo">
                    <img src="${image}" alt="Logo" />
                </div>
                <div class="card-content">
                    <h2 class="card-title">${name}</h2>
                    <a href="${link}" class="btn card-detail" target="_blank">Detail</a>
                </div>
            </div>
            <style>
                /* ...CSS giữ nguyên... */
            </style>
        `;
    }
}
customElements.define('m-card', Card);

