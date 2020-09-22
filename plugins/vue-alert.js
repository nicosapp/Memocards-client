export default ({ app }, inject) => {
  inject('maFonctionInjectee', chaine => console.log('test', chaine))
}
