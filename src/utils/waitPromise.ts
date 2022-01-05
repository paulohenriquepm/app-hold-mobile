const waitPromise = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export { waitPromise };
