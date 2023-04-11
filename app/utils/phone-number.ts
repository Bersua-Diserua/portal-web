export function parsePhoneNumber(phone: string) {
  if (phone) {
    if (phone.indexOf("62") === 0) {
      return phone.substring(2)
    } else if (phone[0] === "0") {
      return phone.substring(1)
    } else {
      return phone
    }
  } else {
    return ""
  }
}
