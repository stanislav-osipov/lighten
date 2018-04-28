import './styles/main.scss';
import '../node_modules/font-awesome/scss/font-awesome.scss';

import { engine } from '@core';
import { App, UserCard } from './app/components';

const components = [
  App,
  UserCard
];

window.addEventListener('DOMContentLoaded', () => {
  engine.bootstrap();
});