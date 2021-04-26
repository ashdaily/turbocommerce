const truncate = (str, length, ending) => {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

const removeHyphenAndCapitalize = (url) => url.replace('-', ' ')[0].toUpperCase() + url.replace('-', ' ').slice(1)

module.exports = { truncate, removeHyphenAndCapitalize };
