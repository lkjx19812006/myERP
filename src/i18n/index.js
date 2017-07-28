import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import zh_CN from './zh_CN'
import en from './en'
const messages = {
  zh_CN: zh_CN,
  en: en
}
const i18n = new VueI18n({
  locale: 'zh_CN',
  messages
})
export default i18n;
