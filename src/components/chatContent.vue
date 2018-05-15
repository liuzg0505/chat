<template>
  <div class="content">
    <div class="header">
      与{{toItem.name}}的聊天
    </div>
    <div class="list" id="info-List">
      <div :class="{info: true, right: fromItem.fromid == item.fromid}" v-for="(item, index) in toItem.history" :key="index">
        <img v-if="toItem.toid == item.fromid" :src="toItem.headimg" alt="">
        <img v-if="toItem.toid == item.toid" :src="fromItem.headimg" alt="">
        <span class="text-content" v-html="replaceContent('text', item.content)"></span>
      </div>
    </div>
    <div class="ipt">
      <textarea v-model="content" class="text" name="ipt-content" id="" rows="3" @keyup.enter="handlerMultiEnter" placeholder="按Enter发送消息，Shift+Enter换行"></textarea>
      <div class="btn-send" @click="sendMsg">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'toItem',
    'fromItem'
  ],
  data() {
    return {
      content: ''
    }
  },
  created() {
    // console.log(this.toItem.toid)
    this.scrollToBottom();
  },
  methods: {
    //替换消息的<, >, 表情,图片,语音
    replaceContent(type, content) {
      // if(type == 'event'){return;}
      if(type == 'text') {
        //文本消息，包括表情
        content = content.replace(/</g,'&lt;').replace(/>/g,'&gt;');//匹配标签括号
        var reg = /\[([^\[\]]+)\]/g; //匹配表情文本
        var arr = content.match(reg);
        if(arr){
          // console.log(arr)
          //下面一段是替换表情的，可以把表情组件引进来再加
          /* for(var i = 0; i < arr.length; i++) {
            for(var j = 0; j < this.emotions.length; j++) {
              if(arr[i] == this.emotions[j].value) {
                content = content.replace(arr[i],'<img style="width:22px;height:22px;" src="'+this.emotions[j].url+'">');
              }
            }
          } */
        }
      }else if(type == 'image') {
        //图片
        // this.infoImg = content;
        content = '<img class="sendImg" src="'+content+'">';
        
      }else if(type == 'voice') {
        //语音
        content = '语音：<a class="sendVoice" href="'+content+'" target="_blank">下载</a>';
      }
      
      return content;
    },
    //处理回车提交、ctrl+enter和shift+enter都不提交->textarea正常换行
    handlerMultiEnter(e) {
      // console.log(e)
      let code = e.keyCode;
      let ctrl = e.ctrlKey;
      let shift = e.shiftKey;
      let alt = e.altKey;
      console.log(code, ctrl, shift, alt)
      if(code == '13' && ctrl && !shift && !alt) {
        //ctrl + enter
        console.log(33)
        return;
      }
      if(code == '13' && !ctrl && shift && !alt) {
        //shift + enter
        return;
      }
      if(code == '13' && !ctrl && !shift && !alt) {
        //只按了enter
        this.sendMsg();
      }
    },
    //发送消息
    sendMsg() {
      if(this.content.trim() == '') {
        alert('不能发送空消息')
        this.content = '';
        return;
      }
      this.toItem.history.push({
        fromid: this.fromItem.fromid,
        toid: this.toItem.toid,
        content: this.content
      });
      this.content = '';
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        let list = document.getElementById('info-List')
        list.scrollTop = list.scrollHeight;
      })
    }
  },
  watch: {
    
  }
}
</script>

<style scoped>
.content {
  text-align: left;
}

.header {
  margin-top: 10px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #333;
  font-weight: 700;
}

.list {
  width: 578px;
  height: 360px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  overflow-y: auto;
}

.ipt {
  margin-top: 6px;
  padding-right: 10px;
}

.text {
  width: 100%;
  resize: none;
  box-sizing: border-box;
  font-size: 14px;
  outline: none;
  border-radius: 4px;
}

.btn-send {
  float: right;
  width: 60px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #0099ff;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  text-align: center;
}

.info {
  padding: 10px;
  box-sizing: border-box;
}

.info img {
  float: left;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 8px;
}

.info .text-content {
  display: inline-block;
  margin-top: 7px;
  margin-left: 8px;
  max-width: 310px;
  line-height: 24px;
  padding: 2px 8px;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 16px;
  position: relative;
  word-break: break-all;
}

.info .text-content:before {
  content: '';
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #fff;
  border-right: 0 none;
  position: absolute;
  top: 9px;
  left: -10px;
}

.info.right {
  text-align: right;
}

.info.right img {
  float: right;
  margin-right: 0;
}

.info.right .text-content {
  margin-left: 0;
  margin-right: 14px;
  background-color: #0099ff;
  text-align: left;
}

.info.right .text-content:before {
  display: none;
}

.info.right .text-content:after {
  content: '';
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #0099ff;
  border-left: 0 none;
  position: absolute;
  top: 9px;
  right: -10px;
}
</style>
