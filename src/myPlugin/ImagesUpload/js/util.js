/*
 * @Descripttion: 公共函数
 * @version: v1.0
 * @Author: Guosh
 * @Date: 2020-12-14 09:47:18
 * @LastEditors: Guosh
 * @LastEditTime: 2021-02-25 14:27:23
 */
export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * debounce
 * 简易节流
 * @param {delay} 延时
 * @param {targetFuntion} 目标函数
 * @param {duration} 最大执行间隔
 */
export function throttle (delay, targetFuntion, duration, ...argument) {
  let timer
  let begin = new Date()
  return function debounceFunc () {
    const context = this
    const args = argument
    const current = new Date()
    if (timer === undefined) {
      targetFuntion.apply(context, args)
      timer = 'isApplyed'
      return
    }
    clearTimeout(timer)
    if (current - begin >= duration) {
      targetFuntion.apply(context, args)
      begin = current
    } else {
      timer = setTimeout(() => {
        targetFuntion.apply(context, args)
      }, delay)
    }
  }
}

/**
 * @name: swapArray
 * @msg: 交换给定数组对应位置的元素
 * @param {current} 当前位置元素索引
 * @param {goal} 目标位置元素索引
 * @param {array} 原数组
 * @return 改变之后的数组
 * @Date: 2021-01-13 16:07:17
 */
export function swapArray (current, goal, array) {
  array[goal] = array.splice(current, 1, array[goal])[0]
  return array
}

/**
 * @name: getSimplifySize
 * @msg: 获取文件最简化大小（即自适应最大单位），保留2位小数
 * @param {fileSize} 当前传入文件的大小（以字节为最小单位）
 * @return {String size} 返回为简化后带上最大单位的字符串，e.g. '2.5M'、'1.01G'等
 * @Date: 2021-02-08 15:07:25
 */
export function getSimplifySize (fileSize) {
  let num = ''
  let unit = 'K' // 默认最小单位为K
  if (fileSize / 1024 / 1024 / 1024 >= 1) { // 文件大小1G以上
    num = (fileSize / 1024 / 1024 / 1024).toFixed(2)
    unit = 'G'
  } else if (fileSize / 1024 / 1024 >= 1) { // 文件大小1M以上
    num = (fileSize / 1024 / 1024).toFixed(2)
    unit = 'M'
  } else { // 文件大小1M以下
    num = (fileSize / 1024).toFixed(2)
  }
  return num + unit
}
