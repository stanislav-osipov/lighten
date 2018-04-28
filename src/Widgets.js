(() => {
  const events = Object.freeze({
    popup: 'open-popup'
  });

  class Widgets {
    popup(payload) {
      const openEvent = new CustomEvent(events.popup, {
        detail: payload
      });
  
      window.dispatchEvent(openEvent);
    }
  
    onPopup(callback) {
      window.addEventListener(events.popup, callback);
      return window.removeEventListener.bind(window, events.popup, callback);
    }
  
    static get instance() {
      if (!this._instance) {
        this._instance = new this();
      }
  
      return this._instance;
    }
  }

  window.widgets = Widgets.instance;
})(window);