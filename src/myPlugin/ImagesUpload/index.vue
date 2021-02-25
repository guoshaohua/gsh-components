<!--
 * @Descripttion: 图片上传组件
 * @version: v1.0
 * @Author: Guosh
 * @Date: 2021-02-25 13:49:31
 * @LastEditors: Guosh
 * @LastEditTime: 2021-02-25 15:31:14
-->
<template>
  <div class="">
    <div class="uploadMain clearfix">
      <div class="uploadListItem" v-for="(url, index) in list" :key="index">
        <img :src="url" alt="">
        <div class="imgAction">
          <a-icon type="eye" @click.native="handlePreview(url)"/>
          <a-icon type="delete" @click.native="handleRemove(index)"/>
        </div>
      </div>
      <a-upload
        v-if="list.length < limitNum"
        listType="picture-card"
        :showUploadList="false"
        :beforeUpload="handleBeforeUpload">
        <div>
          <a-icon type="plus" />
          <div class="ant-upload-text">
            点击上传
          </div>
        </div>
      </a-upload>

      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
    <div class="notice">最多上传{{ limitNum }}张图片，单张图片不大于{{ size }}</div>
  </div>

</template>
<script>
import { cloneObject, getSimplifySize } from './js/util.js'

export default {
  name: 'images-upload',
  props: {
    // 已传图片列表副本
    fileList: {
      type: Array,
      default: () => []
    },
    // 限制上传图片数量
    limitNum: {
      type: Number,
      default: 9
    },
    // 约束单文件大小，默认最大为2M
    fileSize: {
      type: Number,
      default: 2097152
    },
    // 父组件预封装好的文件上传函数
    uploadFunc: {
      type: Function,
      require: true,
      default: () => {}
    }
  },
  data () {
    return {
      list: [], // 本地改动图片列表
      previewVisible: false, // 图片预览
      previewImage: ''
    }
  },
  computed: {
    size () {
      return getSimplifySize(this.fileSize)
    }
  },
  created () {
    if (this.fileList.length > 1) {
      this.list = cloneObject(this.fileList)
    }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    // 预览已上传图片
    handlePreview (url) {
      this.previewImage = url
      this.previewVisible = true
    },
    handleBeforeUpload (file) {
      const self = this
      return new Promise((resolve, reject) => {
        console.log('文件：', file)
        if (!self.isValid(file)) return reject

        const formData = new FormData()
        formData.append('file', file)
        self.upFile(formData)
        return reject
      })
    },
    // 实际上传动作
    upFile (data) {
      this.uploadFunc(data).then(res => {
        if (res.code === 200) {
          if (this.list.length < this.limitNum) {
            this.list.push(res.data)
            this.$message.success('上传成功')
            this.saveList()
          } else {
            this.$message.warning(`图片不能超过${this.limitNum}张`)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    saveList () {
      this.$emit('save', this.list)
    },
    handleRemove (index) {
      this.list.splice(index, 1)
    },
    // 文件验证
    isValid (file) {
      if (!/image\/\w+/.test(file.type)) {
        this.$message.error('请上传以jpg、jpeg、png等结尾的图片文件')
        return false
      } else if (file.size > this.fileSize) {
        this.$message.error('文件  ' + file.name + ' 太大, 不大于' + getSimplifySize(file.size) + '.')
        return false
      } else if (this.list.length >= this.limitNum) {
        this.$message.warning('图片不能超过' + this.limitNum + '张')
        return false
      }
      return true
    }
  }
}
</script>
<style lang="less" scoped>
  .ant-upload-picture-card-wrapper {
    float: left;
    width: auto;
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .uploadListItem {
    position: relative;
    float: left;
    width: 104px;
    height: 104px;
    margin: 0 8px 8px 0;
    padding: 8px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    img {
      position: static;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:hover::before {
      opacity: 1;
    }
    &:hover .imgAction {
      opacity: 1;
    }
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.5);
      opacity: 0;
      transition: all .3s;
      content: '';
    }
    .imgAction {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 10;
      white-space: nowrap;
      transform: translate(-50%,-50%);
      opacity: 0;
      transition: all .3s;
      .anticon-delete,.anticon-eye {
        z-index: 10;
        width: 16px;
        margin: 0 4px;
        color: hsla(0,0%,100%,.85);
        font-size: 16px;
        cursor: pointer;
        transition: all .3s;
      }
      &:hover {
        .anticon-delete,.anticon-eye {
          color: #fff
        }
      }
    }
  }
</style>
