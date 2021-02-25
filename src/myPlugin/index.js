/*
 * @Descripttion: 
 * @version: v1.0
 * @Author: Guosh
 * @Date: 2021-02-25 15:41:54
 * @LastEditors: Guosh
 * @LastEditTime: 2021-02-25 15:43:10
 */
import imagesUpload from './ImagesUpload/index.js';
const components = [
	imagesUpload
]
const install = function(Vue, opts = {}) {
	components.forEach(component => {
	    Vue.component(component.name, component);
    });
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
 
export default {
	install,
	imagesUpload
}