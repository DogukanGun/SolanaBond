export default function getFormattedDateTime() {
  const currentDate = new Date()

  const day = String(currentDate.getDate()).padStart(2, '0')
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const year = currentDate.getFullYear()

  const formattedDate = `${day}.${month}.${year}`

  const formattedTime = currentDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  })

  // Combine the formatted date and time
  const formattedDateTime = `${formattedDate} - ${formattedTime}`

  return formattedDateTime
}
