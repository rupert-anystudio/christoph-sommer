import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { de } from 'date-fns/locale'

export const formatIsoDate = (isoDate) => {
  if (!isoDate) return null
  const date = parseISO(isoDate)
  if (!date) return isoDate
  return format(date, 'do MMMM yyyy', { locale: de })
}
