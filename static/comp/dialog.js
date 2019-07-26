/* global headerComp */

import {html} from 'https://unpkg.com/lit-element/lit-element.js?module';
import {BaseComp} from './base.js';
import './dialogEdit.js';
import './dialogInfo.js';
import './dialogError.js';
import './dialogLogin.js';

export class DialogComp extends BaseComp {

    static get properties() {
        return {
            infoShown: Number,
            dialog: String,
        };
    }

    constructor() {
        super();
        this.dialog = '';
    }

    showDialog() {
        headerComp.stopAutoload();
    }

    showEdit(id, title, status, image) {
        this.showDialog();
        this.dialog = html`<dialog-edit .id=${id} .title=${title} .status=${status} .imageUrl=${image}></dialog-edit>`;
    }

    showInfo() {
        if (this.infoShown) {
            this.close();
            this.infoShown = false;
        } else {
            this.dialog = html`<dialog-info></dialog-info>`;
            this.infoShown = true;
            this.showDialog();
        }
    }

    showLogin() {
        this.showDialog();
        this.dialog = html`<dialog-login></dialog-login>`;
    }

    showError(error) {
        this.showDialog();
        this.dialog = html`<dialog-error .error=${error}></dialog-error>`;
    }

    close() {
        this.dialog = '';
        headerComp.startAutoload();
        console.log('TODO: Scrollhandling');
        // TODO: scrollhandling
    }

    render() {
        if (this.dialog === '') {
            return html``;
        } else {
            return html`
<div id="bg" class="bg" @click=${this.close}></div>
    <div id="overlay" class="container-fluid">${this.dialog}</div>
    <!--
    <datalist id="titelList">
        foreach ($titelList as $element) {
            echo "<option value='$element'/>";
        }
    -->
</datalist>`;
        }
    }
}

customElements.define('dialog-overlay', DialogComp);