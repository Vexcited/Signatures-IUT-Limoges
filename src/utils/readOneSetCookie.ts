const readOneSetCookie = (setCookie: string, key: string): string | undefined => {
  const indexOfKey = setCookie.indexOf(key);
  if (indexOfKey === -1) return;
  
  const startIndex = indexOfKey + key.length + 1; // `+ 1` for the '='
  const endIndex = setCookie.indexOf(";", startIndex);
  if (endIndex === -1) return;

  return setCookie.slice(startIndex, endIndex);
};

export default readOneSetCookie;
