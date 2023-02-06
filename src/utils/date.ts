export const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
] as const

export const stringifyMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const minutesLeft = minutes % 60

  return `${hours.toString().padStart(2, "0")}:${minutesLeft.toString().padStart(2, "0")}`
}
export const stringifyDate = (date: Date) => {
  date = new Date(date)

  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear().toString()

  return `${day}/${month}/${year}`
}
export const humanifyDate = (date: Date, withYear = false) => {
  date = new Date(date)

  const day = date.getDate().toString().padStart(2, "0")
  const month = MONTHS[date.getMonth()]
  const year = date.getFullYear().toString()

  return `${day} ${month} ${withYear ? year : ""}`.trim()
}
