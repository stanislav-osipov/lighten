import { ComponentData, RootData, Drawer } from '@core';

type Root = {
  element: HTMLElement,
  data: RootData
}

class Engine {
  private root: Root = null;
  private components: {[selector: string]: string} = {};
  private drawer: Drawer;

  private constructor() {
    //this.drawer = new Drawer();
  }

  private static _instance: Engine;
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  setRoot(data: RootData) {
    if (this.root) {
      throw 'Root is already defined';
    }

    const element = document.querySelector<HTMLElement>(data.container);

    if (!element) {
      throw 'Cannot find root element';
    }

    this.root = { element, data };
  }

  register(data: ComponentData, ctor) {
    this.components[data.selector] = data.template;
  }

  compile(template: string, selector: string) {
    const parser = new DOMParser();
    const nodes = parser.parseFromString(template, 'text/html').body.childNodes;
    
    const element: Element = document.createElement(selector);
    this.compileChilds(element, nodes);

    return element;
  }

  private compileChilds(root: Node, childs: NodeList) {
    Array.prototype.forEach.call(childs, (node: Node) => {
      let toAppend: Node;
      const name = node.nodeName.toLowerCase();

      if (name in this.components) {
        toAppend = this.compile(this.components[name], name);
      } else if (Engine.SAFE_ELEMENTS.indexOf(name) >= 0) {
        toAppend = node.cloneNode(false);
        node.childNodes.length && this.compileChilds(toAppend, node.childNodes);
      } else {
        toAppend = document.createComment(`Sanitized tag <${name}>`);
      }

      root.appendChild(toAppend);
    });
  }

  bootstrap() {
    if (!this.root) {
      throw 'Root should be set before bootstrapping';
    }

    this.root.element.appendChild(
      this.compile(this.root.data.template, this.root.data.selector)
    );
  }

  private static readonly SAFE_ELEMENTS = ['div', 'span', 'p', 'ul', 'li', '#text', 'img'];
}

export const engine = Engine.instance;