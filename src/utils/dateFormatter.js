import { safeDateFormat } from "./safeDateFormatter"

export const formattedDate = (date) => {
  return safeDateFormat(date, { showTime: false })
}