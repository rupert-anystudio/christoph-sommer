import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { de } from 'date-fns/locale'

export const formatIsoDate = (isoDate) => {
  if (!isoDate) return null
  const date = parseISO(isoDate)
  if (!date) return isoDate
  return format(date, 'do MMMM yyyy', { locale: de })
}

export const formatProjectTimeframe = (timeframe) => {
  const { start, end } = timeframe
  if (!start) return null
  const from = parseISO(start)
  const fromYear = format(from, 'yyyy', { locale: de })
  if (!fromYear) return null
  if (!end) return `seit ${fromYear}`
  const until = parseISO(end)
  const untilYear = format(until, 'yyyy', { locale: de })
  return `von ${fromYear} bis ${untilYear}`
}
