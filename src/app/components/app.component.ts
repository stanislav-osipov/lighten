import { register, root, Renderable } from '@core';

@root({
  container: '#app',
  selector: 'app',
  template: `<div> Card: <user-card></user-card></div>`
})
export class App extends Renderable {
  private cards;

  constructor() {
    super();

    this.cards = [];
    this.error(this);
    //console.log(this.handlers)
    //root ? this.init(root) : this.error(null);
  }

  // init(root) {
  //   this.users = new Users();
  //   this.drawer = new Drawer(root);

  //   this.users.getList()
  //     .then(this.displayList.bind(this))
  //     .catch(this.error.bind(this));
  // }

  // displayList(users) {
  //   users.forEach(user => {
  //     const card = new UserCard(this.drawer, user);
  //     this.cards.push(card);
  //   });
  // }

  sort() {
    
  }

  error(reason) {
    console.error('c', reason);
  }
}