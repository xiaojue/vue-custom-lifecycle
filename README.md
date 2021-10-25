# vue-custom-lifecycle

```ts
import { serviceA , serviceB} from './services';
import { Vue, Component, Mixin } from "vue-property-decorator";
import customLifecycle from "vue-custom-lifecycle";

const mylifecycle = new customLifecycle(Vue, {
  beforeCreated: {
    lifecycleMethods: [{name:"requestFirstScreenData",async:true}, "serviceFormat"]
  },
  created: {
    lifecycleMethods: ["renderFirstScreenData"]
  },
  afterCreated: {
  },
  beforeMounted: {}
  mounted: {},
  afterMounted: {
    lifecycleMethods: [{name:"completed",async:false,_:()=>{
	this.appSNC.onRendered();
    }}]
  },
  beforeUpdate: {},
  update: {},
  afterUpdate: {},
  beforeDestroy: {},
  destroyed: {},
});

class App extends Mixins(customLifecycle) {
  created(ctx) {
    console.log('vue created');
  }
  async requestFirstScreenData(ctx){
    let DataA = await serviceA();
    let DataB = await serviceB();
    ctx.requestFirstScreenData = { DataA, DataB};
  }
  serviceFormat(ctx){
    ctx.requestFirstScreenData.DataA.a = 'test data';
  }
  renderFirstScreenData(ctx){
    this.DataA = ctx.requestFirstScreenData.DataA;
  }
  completed(ctx){
    console.log('render completed')
  }
}
```
