export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export const formatToDatetimeLocal = (isoString: string): string => {
  if (!isoString) return ''
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export const formatToISO = (datetimeLocal: string): string => {
  if (!datetimeLocal) return ''
  const date = new Date(datetimeLocal)
  return date.toISOString()
}
