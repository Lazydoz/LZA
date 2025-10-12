const header = './components/header.html';
const footer = './components/footer.html';

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
