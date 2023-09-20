export const $ = () => document.querySelector.call(this, arguments);
export const $$ = () => document.querySelectorAll.call(this, arguments);
HTMLElement.prototype.on = (a, b, c) => this.addEventListener(a, b, c);
HTMLElement.prototype.on = (a, b) => this.addEventListener(a, b);
HTMLElement.prototype.$ = (s) => this.querySelector(s);
HTMLElement.prototype.$$ = (s) => this.querySelectorAll(s);
