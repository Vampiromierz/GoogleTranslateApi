type InitialArray = {
  data: Array<any>
  translations: Array<{
    translatedText: string
    detectedSourceLanguage: string
  }>
}

export function dataHandler(data: InitialArray) {
  if (data.translations?.length) {
    const translatedString = data.translations
      .map(({ translatedText }: { translatedText: string }) => translatedText)
      .join("\n")

    return {
      translatedString: translatedString,
      detectedSourceLanguage: data.translations[0]?.detectedSourceLanguage,
    }
  } else return { translatedString: "", detectedSourceLanguage: undefined }
}
