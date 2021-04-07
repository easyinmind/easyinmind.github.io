const aa = {name: "zs"}
function say(value) {
  // 传递的是内存地址，指向的是{name: "zs"}
  value.name = 'ls'
}
say(aa)
console.log(aa) // ls
const bb = 123;
function sayB(value) {
  // 传递的是具体值，为123
  value = 111
}
sayB(bb)
console.log(bb)