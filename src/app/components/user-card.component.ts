import { Renderable, register } from '@core';

@register({
  selector: 'user-card',
  template: `<div> user card <script> SAS </script></div>`
})
export class UserCard extends Renderable {

}