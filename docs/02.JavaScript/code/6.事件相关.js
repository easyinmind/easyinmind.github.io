// 自定义事件
// 创建 =》 注册 =》 监听
const myEvent = new Event();
ele.addEventListener("myEvent", (e) => {});
ele.dispatchEvent(myEvent);
