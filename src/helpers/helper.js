const helper = {
  jsonStringify(object) {
    if (object == undefined) {
      return `null`;
    }
    return JSON.stringify(object);
  },
};

module.exports = helper;
