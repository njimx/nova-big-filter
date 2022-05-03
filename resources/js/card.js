Nova.booting((Vue, router, store) => {
  Vue.component("nova-big-filter", require("./components/Card").default);
  Nova.inertia("NovaBigFilter", require("./pages/Tool").default);
});
