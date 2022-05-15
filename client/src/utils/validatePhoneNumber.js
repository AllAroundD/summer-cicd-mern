export default function validatePhoneNumber(phone) {
  // eslint-disable-next-line
  return /^[]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im.test(phone);
}
