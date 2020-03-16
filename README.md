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



# Money.vue的封装

1. 封装MoneyHead.vue,MoneyToday.vue和MoneyContent.vue并引入Money

```
   <template>
     <div>
       <Layout>
         <money-head />
         <money-today />
         <money-content />
       </Layout>
     </div>
   </template>
```





## 需要完成TagNav的完成传值功能