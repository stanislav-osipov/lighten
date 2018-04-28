class UserCard extends Renderable {
  constructor(drawer, user) {
    super(drawer, 'user-card', {
      user,
      counter: 0
    });
  }

  openPopup() {
    widgets.popup(this.props.user);
  }

  openPopup2() {
    this.props.counter++;
    console.log('sddsds');
  }

  get template() {
    return `
      <div> ${this.props.user.login.username} -> <span render-click="openPopup"> CLICK </span> <span render-hover="openPopup2"> ${this.props.counter} </span> </div>
    `;
  }
}