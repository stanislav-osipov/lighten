import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export class Drawer {
  private root;

  constructor() {
    this.root = {};
  }

  render(selector, template) {
    let child = document.createElement(selector);
    this.root.appendChild(child);
    child.innerHTML = template;

    return child;
  }

  replace(element, template) {
    element.innerHTML = template;
  }

  remove(element)  {
    this.root.removeChild(element);
  }
}