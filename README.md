# mycomponets

> it's just for my personal componets library
> 个人组件库集合

## 图片上传组件-----ImagesUpload

> imagesUpload是一个基于antd-vue封装的图片上传组件，支持单图和多图上传，也有预览和删除已上传图片等功能。

### 主要参数一览

* **fileList**
此参数代表已传图片列表副本，由父组件传入图片组件，是由真实的图片url组成的一维数组，为可选参数，默认是空数组[]。

* **limitNum**
参数就如字面意思，代表限制上传图片的数量，默认为9，可传入Number类型数据。

* **fileSize**
约束上传的单文件大小的参数，单位为字节，默认为2097152个字节（即2M），也是Number类型数据。

* **uploadFunc**
父组件预封装好的文件上传request函数，只接受一个data字段（即file主体），具体内部使用代码如下：
```
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
```

* **save函数**
主要目的是本组件给父组件传递改动过的fileList，即发生删除或上传事件之后都会调用此函数。
```
saveList () {
  // 这边的this.list就是真实的已上传图片数组
  this.$emit('save', this.list)
},
```