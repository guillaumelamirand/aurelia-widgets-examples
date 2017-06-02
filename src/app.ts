import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'selects',         name: 'selects',        moduleId: 'selects',        nav: true, title: 'Selects' },
      { route: 'tables',         name: 'tables',        moduleId: 'tables',        nav: true, title: 'Tables' },
      { route: 'forms',         name: 'forms',        moduleId: 'forms',        nav: true, title: 'Forms' }
    ]);

    this.router = router;
  }
}
