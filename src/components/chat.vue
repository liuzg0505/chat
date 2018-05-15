<template>
  <div class="chat">
    <div class="chat-list">
      <ul>
        <li :class="{active: activeItem==index}" v-for="(item,index) in chatList" :key="index" @click="select(index,item)">
          <img :src="item.headimg" alt="">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="chat-content">
      <ChatContent :to-item="toItem" :from-item="fromItem"></ChatContent>
    </div>
  </div>
</template>

<script>
import ChatContent from '@/components/chatContent'
export default {
  name: 'chat',
  components: {
    ChatContent
  },
  data() {
    return {
      activeItem: '0',
      fromItem: {
        fromid: '1',
        headimg: 'https://tva3.sinaimg.cn/crop.0.0.99.99.50/6411875cjw1eqcjn2y0w5j202s02smx6.jpg',
        name: '我'
      },
      toItem: {},
      chatList: [
        {
          toid: '11',
          headimg: 'https://tvax4.sinaimg.cn/crop.0.0.100.100.50/0075AKpmly8fpmucxdxcnj302s02s3ym.jpg',
          name: 'MAX Communication',
          history: [
            {
              id: '1',
              fromid: '11',
              toid: '1',
              content: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好好你好你好你好你好你好你好好你好你好你好你好你好你好好你好你好你好你好你好你好好你好你好你好你好你好你好好你好你好你好你好你好你好',
              time: '2018-03-25 21:35:24'
            },
            {
              id: '2',
              fromid: '1',
              toid: '11',
              content: '你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好你也好',
              time: '2018-03-25 21:36:44'
            },
            {
              id: '3',
              fromid: '11',
              toid: '1',
              content: '干嘛呢',
              time: '2018-03-25 21:37:15'
            },
            {
              id: '4',
              fromid: '1',
              toid: '11',
              content: '吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢吃饭呢',
              time: '2018-03-25 21:38:45'
            },
            {
              id: '5',
              fromid: '1',
              toid: '11',
              content: '你呢',
              time: '2018-03-25 21:39:05'
            }
          ]
        },
        {
          toid: '12',
          headimg: 'https://tvax4.sinaimg.cn/crop.0.0.996.996.50/005EyM6hly8fp5tx4zqyfj30ro0ro760.jpg',
          name: 'cockroach-yz',
          history: [
            {
              id: '1',
              fromid: '12',
              toid: '1',
              content: '你好啊',
              time: '2018-03-25 21:35:24'
            },
            {
              id: '2',
              fromid: '1',
              toid: '12',
              content: '好什么好',
              time: '2018-03-25 21:36:44'
            },
            {
              id: '3',
              fromid: '12',
              toid: '1',
              content: '咋了啊',
              time: '2018-03-25 21:37:15'
            },
            {
              id: '4',
              fromid: '1',
              toid: '12',
              content: '烦烦烦烦',
              time: '2018-03-25 21:38:45'
            },
            {
              id: '5',
              fromid: '12',
              toid: '1',
              content: '咋了啊，说说看',
              time: '2018-03-25 21:39:05'
            },
            {
              id: '6',
              fromid: '1',
              toid: '12',
              content: '唉，不说了，让我冷静一会，我只想静静',
              time: '2018-03-25 21:39:05'
            },
            {
              id: '7',
              fromid: '1',
              toid: '12',
              content: '别问我静静是谁！',
              time: '2018-03-25 21:39:05'
            }
          ]
        },
        {
          toid: '13',
          headimg: 'https://tva4.sinaimg.cn/crop.0.0.198.198.50/5c5ac88fgw1ez41y95au8j205k05k74f.jpg',
          name: 'lychiyu',
          history: [
            {
              id: '1',
              fromid: '13',
              toid: '1',
              content: 'Hello',
              time: '2018-03-25 21:35:24'
            },
            {
              id: '2',
              fromid: '1',
              toid: '13',
              content: 'Hi',
              time: '2018-03-25 21:36:44'
            },
            {
              id: '3',
              fromid: '13',
              toid: '1',
              content: 'What are u doing now?',
              time: '2018-03-25 21:37:15'
            },
            {
              id: '4',
              fromid: '1',
              toid: '13',
              content: 'study',
              time: '2018-03-25 21:38:45'
            },
            {
              id: '5',
              fromid: '1',
              toid: '13',
              content: 'U ?',
              time: '2018-03-25 21:39:05'
            },
            {
              id: '6',
              fromid: '13',
              toid: '1',
              content: 'watch TV',
              time: '2018-03-25 21:39:05'
            }
          ]
        }
      ],
      
    };
  },
  created() {
    this.toItem = this.chatList[0];
    // console.log('axios',this.$http)
    // console.log('vueWebsocket',this.$socket)
  },
  methods: {
    select(index,item) {
      this.activeItem = index;
      this.toItem = item;
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        let list = document.getElementById('info-List')
        list.scrollTop = list.scrollHeight;
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
  width: 800px;
  height: 520px;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  background-color: #eee;
}
/* 列表部分 */
.chat-list {
  width: 200px;
  height: 519px;
  box-sizing: border-box;
  float: left;
  background-color: #ccc;
}
.chat-list ul {
  width: 200px;
  height: 518px;
  box-sizing: border-box;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #33353a;
}
.chat-list ul li {
  width: 200px;
  height: 60px;
  line-height: 40px;
  /* margin: 10px 0; */
  padding: 10px 10px;
  box-sizing: border-box;
  text-align: left;
  background: #33353a;
  cursor: pointer;
  color: #fff;
  border-bottom: 1px solid #eee;
}
.chat-list ul li.active {
  background: #292b2e;
}
.chat-list ul li img {
  float: left;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 20px;
  vertical-align: middle;
}
.chat-list ul li span {
  float: left;
  width: 130px;
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  font-size: 14px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
/* 内容部分 */
.chat-content {
  margin-left: 210px;
}
</style>
