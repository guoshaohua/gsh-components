/*
 * @Descripttion: 
 * @version: v1.0
 * @Author: Guosh
 * @Date: 2021-02-25 13:49:41
 * @LastEditors: Guosh
 * @LastEditTime: 2021-02-25 15:41:29
 */
import imagesUpload from './index.vue';
imagesUpload.install = Vue => Vue.component(imagesUpload.name, imagesUpload);//.name就是vue文件暴露出来的name名
export default imagesUpload;