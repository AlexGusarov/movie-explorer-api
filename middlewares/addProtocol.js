const addProtocol = (link, next) => {
  let retVal = link;
  if (!link.startsWith('https' || 'ftp')) {
    retVal = `htpps://${link}`;
  }
  return retVal;
  next();
};