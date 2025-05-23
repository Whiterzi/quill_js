// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
//import EmbedBlot from 'quill/blots/embed';
import EmbedBlot from './embed';
import { autoDetach } from './embed';
import { service } from '../service/quire';

class EmailBlot extends EmbedBlot {
    static blotName = 'email';
    static className = 'ql-email';
    static tagName = 'A';

    static create(value: string) {
        const node = super.create() as HTMLAnchorElement;
        
        node.setAttribute('contenteditable', `${service.isEnabled()}`);//#21509: for cursor visible
        node.setAttribute('target', '_blank');
        autoDetach(node);//#22037

        EmailBlot._updateNode(node, value);
        
        return node;
    }

    static _updateNode(node: HTMLElement, value: string) {
        node.setAttribute('href', service.getEmailUrl(value));
        node.setAttribute('data-value', value);
        node.innerText = value;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }

    format(name, value) {
        if (name === this.statics.blotName && value) {
            EmailBlot._updateNode(this.domNode as HTMLElement, value);
        } else {
          super.format(name, value);
        }
    }
} 
 
export default EmailBlot;