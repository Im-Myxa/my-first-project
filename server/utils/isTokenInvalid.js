module.exports = function (data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
};
