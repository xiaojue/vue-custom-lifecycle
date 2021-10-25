import customLifecycle from "lifecycle";
import { serviceA, serviceB } from "./service";
import strategy from "strategy";

let isApp = true;

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
      runEnv: isApp ? "app" : "h5",
    },
  }
);

strategy.namespaces("app", "h5");

strategy.listen("app", "fetchData", async (ctx) => {
  let DataA = await serviceA();
  ctx.requestFirstScreenData = { DataA };
});
strategy.listen("h5", "fetchData", async (ctx) => {
  let DataB = await serviceB();
  ctx.requestFirstScreenData = { DataB };
});

strategy.listen("app", "formatData", (ctx) => {
  ctx.requestFirstScreenData.DataA.data.a = "test data";
});

strategy.listen("app", "renderData", (ctx, self) => {
  self.Data = ctx.requestFirstScreenData.DataA;
});

strategy.listen("h5", "renderData", (ctx, self) => {
  self.Data = ctx.requestFirstScreenData.DataB;
});

mylifecycle({
  async requestFirstScreenData(ctx) {
    await strategy.fetchData(ctx.runEnv, ctx);
    ctx.requestFirstScreenData.DataC = "C";
  },
  serviceFormat(ctx) {
    strategy.formatData(ctx.runEnv, ctx);
  },
  renderFirstScreenData(ctx) {
    strategy.renderData(ctx, this);
    this.DataC = ctx.requestFirstScreenData.DataC;
  },
  completed(ctx) {
    console.log("render completed");
  },
});
