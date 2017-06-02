import {App} from '../../src/app';

class RouterStub {
  routes;
  
  configure(handler) {
    handler(this);
  }
  
  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut, mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Aurelia');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContain({ route: ['','welcome'], name: 'welcome',  moduleId: 'welcome', nav: true, title:'Welcome' });
  });

  it('should have a selects route', () => {
     expect(sut.router.routes).toContain({ route: 'selects', name: 'selects', moduleId: 'selects', nav: true, title:'Selects' });
  });
  it('should have a selects route', () => {
     expect(sut.router.routes).toContain({ route: 'tables', name: 'tables', moduleId: 'tables', nav: true, title:'Tables' });
  });
});
