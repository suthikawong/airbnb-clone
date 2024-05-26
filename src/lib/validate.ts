export interface validatePasswordType {
  strength: number
  sensitiveData: boolean
  length: boolean
  containSymbol: boolean
}

export const strengthMapping = {
  0: 'weak',
  1: 'weak',
  2: 'good',
  3: 'strong',
}

export const validateNewPassword = (
  data: { password: string; email: string; firstName: string },
  validateState: validatePasswordType
) => {
  const validate = { ...validateState }
  const { password, email, firstName } = data
  const charPattern = /[a-zA-Z]/
  const numberPattern = /[0-9]/
  const symbolPattern =
    /[!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\>\=\?\@\[\]\{\}\\\\\^\_\`\~]/
  let charExist = false
  let numberExist = false
  let symbolExist = false

  if (password.length < 8) validate.length = false
  else validate.length = true

  if (
    (email && email !== '' && password.includes(email.split('@')[0])) ||
    (firstName && firstName !== '' && password.includes(firstName))
  )
    validate.sensitiveData = false
  else validate.sensitiveData = true

  if (charPattern.test(password)) charExist = true
  if (numberPattern.test(password)) numberExist = true
  if (symbolPattern.test(password)) symbolExist = true

  validate.containSymbol = numberExist || symbolExist

  const exist = [charExist, numberExist, symbolExist]
  validate.strength = exist.filter((item) => item).length

  return validate
}
