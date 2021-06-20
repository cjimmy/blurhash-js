const baseChars = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~`

const baseNumber = baseChars.length

export const from83to10 = (str: string) => {
  let value = 0
  for (const c of str) {
    value = value * baseNumber + baseChars.indexOf(c)
  }
  return value
}

export const from10to83 = (n: number, length: number): string => {
  let result = ''
  for (let i = 1; i <= length; i++) {
    const digit =
      (Math.floor(n) / Math.pow(baseNumber, length - i)) % baseNumber
    result += baseChars.charAt(Math.floor(digit))
  }
  return result
}
