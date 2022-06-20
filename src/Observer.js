export default class Observer {
  events = {};

  subscribe = (eventName, fn) => {
    if (this.events[eventName]) this.events[eventName].push(fn);
    else this.events[eventName] = [fn];
  };

  publish = (eventName, data) => {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn.call(this, data);
      });
    }
  };
}
