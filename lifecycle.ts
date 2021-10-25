import customLifecycle from "lifecycle";
import { serviceA, serviceB } from "./service";

const mylifecycle = new customLifecycle(
  [
    { name: "requestFirstScreenData", async: true },
    "serviceFormat",
    "renderFirstScreenData",
    {
      name: "completed",
      _: (ctx) => {
        console.log("defalut completed");
      },
    },
  ],
  {
    registerCtx: {
      // 可以注册默认 ctx 属性
    },
  }
);

let isApp = true;

mylifecycle({
  async requestFirstScreenData(ctx) {
    if (isApp) {
      let DataA = await serviceA();
      ctx.requestFirstScreenData = { DataA };
    } else {
      let DataB = await serviceB();
      ctx.requestFirstScreenData = { DataB };
    }
    ctx.requestFirstScreenData.DataC = "C";
  },
  serviceFormat(ctx) {
    if (isApp) {
      ctx.requestFirstScreenData.DataA.data.a = "test data";
    }
  },
  renderFirstScreenData(ctx) {
    if (isApp) {
      this.Data = ctx.requestFirstScreenData.DataA;
    } else {
      this.Data = ctx.requestFirstScreenData.DataB;
    }
    this.DataC = ctx.requestFirstScreenData.DataC;
  },
  completed(ctx) {
    console.log("render completed");
  },
});
