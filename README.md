# 黑曜石记账

...

# 路由配置

1.使用VueRouter配置路由

```typescript
const routes = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/add',
    component: Add
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/tags',
    component: Tag
  },
]
```

# BetterScroll 去除滚动条的简单使用方法

1. 安装betterscroll

```
yarn add better-scroll
```

2. 由于typescript的原因，需要安装

```
@types/better-scroll
```

3. 封装一个通用的Scroll.vue文件

```vue
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import BScroll from "better-scroll";

@Component
export default class Scroll extends Vue {
  scroll: any;
  mounted() {
    {
      // 创建scroll对象 
      this.scroll = new BScroll(this.$refs.wrapper as any, {
        click: true // betterscroll默认不监听浏览器的原生click，加上true即可监听
      });
    }
  }
}
</script>
```

4. 如在Add.vue中使用Better-scroll（后满会封装Add.vue组件）

```
<template>
	<Scroll class="content">
		<!-此处省略内容-->
	</Scroll>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Scroll from "@/components/common/Scroll.vue";

@Component({
  components: {
    Scroll
  }
})
export default class Add extends Vue {

}
</script>

<style>
	.content{
  	position: absolute;
  	top: 50px;
  	bottom: 270px;
  	left:0
  	right:0
  	overflow: hidden;
	}
</style>

```

5. ok 可以愉快地使用better-scroll了

- 注意：必须给better-scroll指定的高度才可以滚动（无高度不可以滚动）

# TypeScript中使用toast

1. 建立一个文件夹 toast
2. 封装一个Toast组件(css略)

```
<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Toast extends Vue {
  message: string = "";
  isShow: boolean = false;

  show(message: string, duration = 1500) {
    this.isShow = true;
    this.message = message;
    setTimeout(() => {
      this.isShow = false;
      this.message = "";
    }, duration);
  }
}
</script>
```

3.在index.ts中使用

```
import Toast from './Toast.vue'

const obj = {} as any

obj.install = (Vue: any) => {
  // 1.创建一个组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()
  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.tost.$el对应的就是div(这样才真正的加到了界面上面)
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj
```

4. 在main.ts中安装toast

```
import toast from '@/components/common/toast'
Vue.use(toast)
```

5. 这时在任意Vue组件中使用toast即可

```
this.$toast.show('这是一句提示',1000)
```

6. 但是很不巧这里在TypeScript中会报错（$toast提示没定义问题）解决方法：

   * 在shims-vue.d.ts中

   ```
   declare module 'vue/types/vue' {
     // 3. 声明为 Vue 补充的东西
     interface Vue {
       $toast: any
     }
   }
   ```

   * 这样等于告诉编辑器，你这个属性是有的

7.  记一个踩过的坑，如何在vuex的store中更据不同的结果返回不同的toast

   * 首先在state中声明一个属性

   ```
   state:{
   	toastMessage:''
   }
   ```

   * mutations中声明一个updateToastMessage的方法

   ```
   mutations:{
       // toastMessage方法
       updateToastMessage(state, message) {
         state.toastMessage = message
       }
   }
   ```

   * 当其他方法改变toast时，如

   ```
   mutations:{
    createTag{
    	if(true){
    		store.commit('updateToastMessage',1)
    	}else{
    		store.commit('updateToastMessage',1)
    	}
    }
   }
   ```

   * 此时我们在组件中想要使用toast，可以：

   ```
       this.$store.commit("createTag", this.selectedTag);
       this.$toast.show(this.$store.state.toastMessage);
   ```

   

# Nav.vue 底部导航栏的封装

2. 1. svg的使用（使用svg-sprite-loader）

- iconfont.con下载svg
- shims-tsx.d.ts中添加

```
declare module '*.svg' {
  const content: string;
  export default content
}
```

- 安装 svg-sprite-loader(命令行输入)

```javascript
yarn add svg-sprite-loader -D
yarn add svgo-loader
```

- 在vue.config.js里面添加，启用两个loder

```
   module.exports = {
     lintOnSave: false,
     chainWebpack: config => {
       const dir = path.resolve(__dirname, 'src/assets/icons')
   
       config.module
         .rule('svg-sprite')
         .test(/\.svg$/)
         .include.add(dir).end() //包含icons目录
         .use('svg-sprite-loader').loader('svg-sprite-loader').options({ extract: false }).end()
       config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }])
       config.module.rule('svg').exclude.add(dir) //其他svg loader排除icons
     }
   }
```

   

- 封装Icon.vue

```typescript
   <template>
     <svg class="icon">
       <use :xlink:href="'#'+name" />
     </svg>
   </template>
   
   <script lang="ts">
   // 引入整个icons
   const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
     requireContext.keys().forEach(requireContext);
   try {
     importAll(require.context("../../assets/icons", true, /\.svg$/));
   } catch (error) {
     console.log(error);
   }
   
   export default {
     name: "Icon",
     props: ["name"]
   };
   </script>
   
   <style lang="scss" scoped>
   .icon {
     width: 1em;
     height: 1em;
     vertical-align: -0.15em;
     fill: currentColor;
     overflow: hidden;
   }
   </style>
```

* main.ts将Icon变为全局组件

```
   import Icon from '@/components/Icon.vue'
   Vue.component('Icon', Icon)
```

   2.封装nav.vue,通过url判断路由是否活跃以显示不同的icon(使用v-show显示)

```
   <script lang='ts'>
   import Vue from "vue";
   import { Component } from "vue-property-decorator";
   
   @Component
   export default class Nav extends Vue {
     get moneyIsActive() {
       return this.$route.path.indexOf("money") !== -1;
     }
     get statisticsIsActive() {
       return this.$route.path.indexOf("statistics") !== -1;
     }
   }
   </script>
```

# Layout.vue的封装

1.使Nav居于页面下方的方式

```
<template>
     <div class="layout-wrapper">
       <div class="content">
         <slot />
       </div>
       <Nav class="nav" />
     </div>
   </template>
   
   <style lang='scss' scoped>
   .layout-wrapper {
     display: flex;
     flex-direction: column;
     min-height: 100vh;
     > .content {
       overflow: auto;
       flex: 1;
     }
   }
   </style>
```

# TabBar的封装

1.获得选中状态(添加 class selected)

```vue
<template>
  <div class="tab-bar">
    <div class="icon">
      <slot name="icon" />
    </div>
    <span class="expend" :class="{'selected':type==='-'}" @click="selectType('-')">支出</span>
    <span class="income" :class="{'selected':type==='+'}" @click="selectType('+')">收入</span>
    <div class="delete">
      <slot name="delete" />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class extends Vue {
  type: string = "-";

  selectType(type: string) {
    this.type = type;
    this.$emit("selectType", type);
  }
}
</script>
```

2. slot插槽添加可能的Icon,并使它绝对定位

```
<div class="icon">
    <slot />
 </div>
 
   .icon {
    position: absolute;
    top: 50%;
    margin-top: -9px;
  }
```

# Tags.vue的封装

1. Tags.vue拥有的组件

```
  components: {
  	Scroll,
    TagsNav,
    TagSelected,
    TagList
  }
```

2. TagsNav的封装
   * 无难点，注意判断完成的点击状态，以及complete方法传入新添的tag即可

```
<template>
  <header>
    <div class="back" @click="back">
      <Icon name="back" />
    </div>
    <span>添加支出类别</span>
    <span class="complete" :class="{'complete-clicked':clicked}" @click="complete">完成</span>
  </header>
</template>
```

3. TagSelected的封装

   * 无难点，只需从Tags.vue中传入选中的tag即可

```
   @Prop({ default: { name: "餐饮", id: 1 }, type: Object }) selectedTag?: Tag;
```

   

4. TagsList的封装

* 这里需要从Tags.vue中传入tagList和selectTag从而正确的显示
* 点击Icon后会得到一个selectTag从而给其添加样式
* 通过判断当前选中的tag的id是否与当前Icon的id一致来判断是否添加class

```
<ul class="icons">
      <li v-for="tag in tagList" :key="tag.id">
        <Icon
          class="icon"
          :name="tag.name"
          @click.native="selectTag(tag)"
          :class="{'selected':selectedTag.id===tag.id}"
        />
        <span>{{tag.name}}</span>
</li>

@Component
export default class TagList extends Vue {
  @Prop() readonly tagList!: Tag[];
  @Prop() selectedTag?: Tag;

  selectTag(tag: Tag) {
    this.$emit("selectTag", tag);
  }
}
```

5. Tags.vue的selected方法（遇到的坑）

```
  selectTag(tag: Tag) {
    this.selectedTag = tag;
  } // 正确的写法，会同步更新
```

````
  selectTag(tag: Tag) {
    this.selectedTag.name = tag.name
    this.selectedTag.id = tag.id
  }// 错误的写法，selectedTag不会同步更新
````



# Add.vue的封装

1. Add.vue的组件

```
@Component({
  components: {
    Scroll,
    TabBar,
    NumberPad,
    TagTable
  }
})
```

2. 在Add.vue中获取tagList,经过详细考虑我发现使用计算属性和watch能更好的获取tagList和当前选择标签的id

```
export default class Add extends Vue {
  selectedId: number = 0;
  type: string = "-";
  buttonSelected: boolean = false;

  get tagList() {
    if (this.type === "-") {
      return this.$store.state.tagList;
    } else if (this.type === "+") {
      return expendList;
    }
  }

  @Watch("tagList")
  onTagListChanged(newVal: Tag) {
    this.selectedId = this.tagList[0] ? this.tagList[0].id : 0;
  }

```

3. 封装一个TagTable.vue组件根据传过来的TagList

```
<template>
  <div class="tag-list">
    <header>{{tagList[0].name}}</header>
    <ul class="icons">
      <li v-for="tag in tagList" :key="tag.id">
        <Icon
          class="icon"
          :name="tag.name"
          :class="{'selected':selectedTag.id===tag.id}"
        />
        <span>{{tag.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class TagList extends Vue {
  @Prop() readonly tagList!: Tag[];
}
```

4. 封装NumberPad来记录金额和备注

* 点加ok时进行数组操作 来进行加法运算

```
 ok() {
    const addArray = this.output.split("+");
    this.output = "0";
    for (let i = 0; i < addArray.length; i++) {
      if (addArray[i] === "") return;
      this.output = (
        parseFloat(this.output) + parseFloat(addArray[i])
      ).toString();
    }

    this.$emit("createRecord", this.output, this.notes);
    this.notes = "";
    this.output = "0";
  }
```

5. 在Add.vue中使用record数组来存储每次添加的记录

```
  record: RecordItem = {
    tag: {},
    notes: "",
    type: "-",
    amount: 0
  };
  
  type RecordItem = {
  tag: Tag | {};
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
}
```

6. 在store里面封装recordList的方法

```
    // recordList方法
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
```



# Money.vue的封装

1. 封装MoneyHead.vue,MoneyList.vue和MoneyContent.vue并引入Money

```
   <template>
     <div>
       <Layout>
         <money-head />
         <money-list />
         <money-content />
       </Layout>
     </div>
   </template>
```



2. MoneyHead的封装

* 下拉选择日期
  * 使用year和month保存选中的年份，使用years和month保存选项们

  ```
   <select name="year" v-model="year" class="year">
          <option v-for="y in years" :value="y" :key="y">{{y}}年</option>
   </select>
  ```

  * filter函数获取当前日期的recordList的amount，这里以结余为例

  ```
    get monthBalance() {
      // 支出
      const expendRecordList = this.recordList.filter((i: RecordItem) => {
        return (
          dayjs(i.createdAt)
            .year()
            .toString() === this.year &&
          (dayjs(i.createdAt).month() + 1).toString() === this.month &&
          i.type === "-"
        );
      });
      // 收入
      const includeRecordList = this.recordList.filter((i: RecordItem) => {
        return (
          dayjs(i.createdAt)
            .year()
            .toString() === this.year &&
          (dayjs(i.createdAt).month() + 1).toString() === this.month &&
          i.type === "+"
        );
      });
      let balance = 0;
      for (let i = 0; i < expendRecordList.length; i++) {
        balance -= expendRecordList[i].amount;
      }
      for (let i = 0; i < includeRecordList.length; i++) {
        balance += includeRecordList[i].amount;
      }
      // 保留两位小数
      return balance.toFixed(2);
    }
  ```

  

## 展示每个日期支出收入

1. 这里需要的就是将同一日期的recordItem存到一起，所以同样需要引入dayjs对日期进行处理

2. 使用计算属性获得所需数据

```typescript
// 数据
  get dataList() {
    let dataList = [];
    console.log(this.$store.state.recordList);
    for (let i = 0; i < this.$store.state.recordList.length; i++) {
      const data = {
        y: 0,
        m: 0,
        d: 0,
        record: []
      } as Data;
      data.y = dayjs(this.$store.state.recordList[i].createdAt).year();
      data.m = dayjs(this.$store.state.recordList[i].createdAt).month() + 1;
      data.d = dayjs(this.$store.state.recordList[i].createdAt).date();

      // 判断日期是否为同一天
      if (i == 0) {
        // 存入recordItem
        data.record.push(this.$store.state.recordList[0]);
        dataList.push(data);
      } else if (
        // 日期不重复的情况
        data.y != dayjs(this.$store.state.recordList[i - 1].createdAt).year() ||
        data.m !=
          dayjs(this.$store.state.recordList[i - 1].createdAt).month() + 1 ||
        data.d != dayjs(this.$store.state.recordList[i - 1].createdAt).date()
      ) {
        // 存入recordItem
        data.record.push(this.$store.state.recordList[i]);
        dataList.push(data);
      } else {
        dataList[dataList.length - 1].record.push(
          this.$store.state.recordList[i]
        );
      }
    }
    return dataList;
  }
```

3. 对当日收入和支出进行一次计算

```typescript
// 获取当日支出
  getExpend(data: Data) {
    let expend = 0;
    for (let i = 0; i < data.record.length; i++) {
      if (data.record[i].type === "-") {
        expend += data.record[i].amount;
      }
    }
    return expend.toFixed(2);
  }
  // 获取当日收入
  getInclude(data: Data) {
    let include = 0;
    for (let i = 0; i < data.record.length; i++) {
      if (data.record[i].type === "+") {
        include += data.record[i].amount;
      }
    }
    return include.toFixed(2);
  }
```

4. 如何展示首页最上方年月的记录

* 首先需要在store中记录当前的年月（需要引入dayjs）
* 在MoneyHead中的select，监听年月的变化从而commit更改store的当前年月
* 在MoneyList使用filter函数获得当前年月的记录

```typescript
  // 获取首页展示的年月
  get year() {
    return this.$store.state.currentYear;
  }
  get month() {
    return this.$store.state.currentMonth;
  }
  get currentRecordList() {
    const currentRecordList = this.$store.state.recordList.filter(
      (item: RecordItem) => {
        return (
          dayjs(item.createdAt).year() == this.year &&
          dayjs(item.createdAt).month() + 1 == this.month
        );
      }
    );
    return currentRecordList;
  }
```

* 另外使用currentYear和currentMoney获取当前记录的长度，在Money.vue中利用v-if以获得要显示的内容

```

      <Scroll class="content">
        <money-list v-if="length>0" />
        <money-blank v-else />
      </Scroll>
```

