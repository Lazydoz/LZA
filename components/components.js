const header = './components/header.html';
const footer = './components/footer.html';
const card = './components/card.html';

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

/* ---CARD */
class Card extends Component {
    constructor() {
        super();
        this.file = card;
    }
}
customElements.define('m-card', Card);
