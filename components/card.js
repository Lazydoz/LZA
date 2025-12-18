export class Card extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        const name = this.getAttribute('name') || 'Unnamed Product';
        const image = this.getAttribute('image') || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E';
        const link = this.getAttribute('link') || '#';
        const for0bj = this.getAttribute('for0bj') || '';
        
        // XSS Protection: Escape HTML
        const escapedName = this.escapeHtml(name);
        const escapedFor0bj = this.escapeHtml(for0bj);
        
        this.innerHTML = `
            <div class="card">
                <div class="card-logo">
                    <img src="${image}" alt="${escapedName}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2216%22%3EImage Error%3C/text%3E%3C/svg%3E'" />
                </div>
                <div class="card-content">
                    <h2 class="card-title">${escapedName}</h2>
                    <button class="btn card-detail" data-link="${link}" data-for0bj="${escapedFor0bj}" data-name="${escapedName}">Detail</button>
                </div>
            </div>
        `;

        this.querySelector('.card-detail').addEventListener('click', (e) => {
            e.preventDefault();
            this.showModal();
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showModal() {
        const name = this.getAttribute('name');
        const image = this.getAttribute('image');
        const link = this.getAttribute('link');
        const for0bj = this.getAttribute('for0bj');
        
        const escapedName = this.escapeHtml(name);
        const escapedFor0bj = this.escapeHtml(for0bj);
        
        function displayModal() {
            const modalEl = document.querySelector('m-modal');
            if (!modalEl) {
                setTimeout(displayModal, 100);
                return;
            }
            
            const modal = modalEl.querySelector('#card-modal');
            const body = modalEl.querySelector('#modal-body');
            
            if (!modal || !body) {
                setTimeout(displayModal, 100);
                return;
            }
            
            // Build modal content with XSS protection
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content-wrapper';
            
            const imgEl = document.createElement('img');
            imgEl.src = image;
            imgEl.alt = escapedName;
            imgEl.style.cssText = 'max-width:100%; border-radius: 8px;';
            imgEl.onerror = function() {
                this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="320"%3E%3Crect fill="%23ddd" width="320" height="320"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="18"%3EImage Not Found%3C/text%3E%3C/svg%3E';
            };
            
            const infoEl = document.createElement('div');
            infoEl.className = 'modal-info';
            
            const titleEl = document.createElement('h2');
            titleEl.textContent = escapedName;
            
            const forEl = document.createElement('p');
            forEl.innerHTML = `<strong>For:</strong> <span>${escapedFor0bj}</span>`;
            
            const buttonContainer = document.createElement('p');
            const linkBtn = document.createElement('a');
            linkBtn.href = link;
            linkBtn.target = '_blank';
            linkBtn.className = 'btn btn-dark';
            linkBtn.textContent = 'Go to Link';
            
            const cartBtn = document.createElement('button');
            cartBtn.className = 'btn btn-dark ms-2';
            cartBtn.textContent = 'Add to Cart';
            cartBtn.addEventListener('click', () => this.addToCart(name, image, link));
            
            buttonContainer.appendChild(linkBtn);
            buttonContainer.appendChild(cartBtn);
            
            infoEl.appendChild(titleEl);
            infoEl.appendChild(forEl);
            infoEl.appendChild(buttonContainer);
            
            modalContent.appendChild(imgEl);
            modalContent.appendChild(infoEl);
            
            body.innerHTML = '';
            body.appendChild(modalContent);
            modal.style.display = 'flex';
        }
        
        displayModal();
    }
    
    addToCart(name, image, link) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, image, link, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`"${name}" added to cart!`);
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
    }
}

customElements.define('m-card', Card);

