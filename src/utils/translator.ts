/**
 * On the website, some characters are not displayed correctly
 * because of the weird formatting, so we need to translate them.
 * 
 * @param text The text to translate.
 * @returns The translated text.
 */
export const translateCharacters = (text: string): string => text
  .replace(/Ã©/g, "é")
  .replace(/Ã¨/g, "è");
