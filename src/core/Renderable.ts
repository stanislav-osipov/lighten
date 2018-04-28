export abstract class Renderable {
  protected handlers = [];
  private element;

  protected selector;
  protected props;
  protected drawer;

  constructor() {
    console.log('r', this);
    //this.render();
  }

  get template() {
    throw 'Should be overriden in subclasses';
  }

  render() {
    this.detachHandlers();

    // this.element ?
    //   this.drawer.replace(this.element, this.template) :
    //   this.element = this.drawer.render(this.selector, this.template);

    this.attachHandlers();
  }

  attachHandlers() {
    for (const event in Renderable.events) {
      const attributeName = Renderable.events[event];

      this.element
        .querySelectorAll(`[${attributeName}]`)
        .forEach(node => {
          const handlerName = node.attributes[attributeName].value;
          const handler = this[handlerName].bind(this);
    
          node.addEventListener(event, handler);

          this.handlers.push({
            node,
            event,
            callback: handler
          });
        });
    }
  }

  detachHandlers() {
    this.handlers = this.handlers.filter(handler => {
      return !!handler.node.removeEventListener(handler.event, handler.callback);
    });
  }

  destroy() {
    this.detachHandlers();
    this.drawer.remove(this.element);
  }

  private static readonly events = {
    click: 'render-click',
    mouseenter: 'render-hover',
    mouseleave: 'render-hover-off'
  }
}