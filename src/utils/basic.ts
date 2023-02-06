import { ThemeType } from "../contexts/theme"

interface LocalType {
  theme: ThemeType
}

export const parseLocal = <T extends keyof LocalType>(key: T): LocalType[T] | null => {
  try {
    const content = localStorage.getItem(key)
    if (!content) return null

    return JSON.parse(content)
  } catch (error) {
    return null
  }
}
export const setLocal = <T extends keyof LocalType>(
  key: T,
  value: LocalType[T] | null,
) => {
  if (!value) localStorage.removeItem(key)
  else localStorage.setItem(key, JSON.stringify(value))
}

export const sleep = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds))

export const getUrl = (url?: string | null) => {
  if (!url?.length) return null
  try {
    return new URL(url)
  } catch (error) {
    return null
  }
}

export const copyText = (text: string) => {
  const textArea = document.createElement("textarea")
  textArea.value = text
  textArea.select()
  textArea.setSelectionRange(0, text.length)

  navigator.clipboard.writeText(textArea.value)
}

export const getJson = <T>(str: string): T | null => {
  try {
    return JSON.parse(str) as T
  } catch (error) {
    return null
  }
}

export const chunkArray = <T>(arr: T[], n: number): T[][] => {
  const arrays: T[][] = []
  arr.map((element, index) => {
    if (!(index % n)) arrays.push([element])
    else arrays[Math.floor(index / n)].push(element)
  })

  return arrays
}
