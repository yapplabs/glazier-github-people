function send(eventName) {
  return function() {
    this.send(eventName);
  };
}

export default send;
