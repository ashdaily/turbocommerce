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


const removeHyphensAndCapitalize = (str) => {
  if(str.length > 0){
    str = str.replaceAll('-', ' ');
    str = str[0].toUpperCase() + str.slice(1, str.length)
    return str
  }
  return ""
}


module.exports = { truncate, removeHyphensAndCapitalize };
