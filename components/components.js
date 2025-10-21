const header = './components/header.html';
const footer = './components/footer.html';
const cardContainer = './components/card_container.html';
const modal = './components/modal.html';

import { Card } from './card.js'; 

/* BASE COMPONENT */
class Component extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        fetch(this.file)
            .then(response => response.text())
            .then(data => {
                this.innerHTML = data;
            });
    }
}

/* ---HEADER */
class Header extends Component {
    constructor() {
        super();
        this.file = header;
    }
}
customElements.define('m-header', Header);

/* ---FOOTER */
class Footer extends Component {
    constructor() {
        super();
        this.file = footer;
    }
}
customElements.define('m-footer', Footer);

/* ---CARD CONTAINER */
class CardContainer extends Component {
    constructor() {
        super();
        this.file = cardContainer;
    }
}
customElements.define('m-card-container', CardContainer);

/* ---MODAL */
class Modal extends Component {
    constructor() {
        super();
        this.file = modal;
    }
}
customElements.define('m-modal', Modal);
