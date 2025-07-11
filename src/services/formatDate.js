import { safeDateFormat } from "../utils/safeDateFormatter"

export const formatDate = (dateString) => {
  return safeDateFormat(dateString, { showTime: true })
}