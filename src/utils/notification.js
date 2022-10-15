export const notification = (root, type, message, description) => {
  root.$notification[type]({ message, description, duration: 3 });
};
