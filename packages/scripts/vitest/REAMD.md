##

```bash
npm run api:docs Button 'VueNext(PC)'  vitest,finalProject
npm run api:docs Button 'Vue(PC)'  vitest,finalProject
npm run api:docs Button 'React(PC)'  vitest,finalProject
```

## 测试类名

1. 检测是否存在某个类名，比如：button.block

```json
{"PC":{"className":"t-size-full-width"}}
```

2. API 为字符串或布尔类型，不同的值对应着完全不同的类名，无序。"枚举值": "类名"

```json
{"PC":{"className": { "underline": "t-link--hover-underline", "color": "t-link--hover-color" }, "snapshot": true}}
```

3.  API 为字符串，存在枚举值，类名是枚举值的一部分，且存在，比如 button.variant
```json
{"PC":{"className": "t-button--variant-${item}", "snapshot": true }}
```

值为 `true` 时，存在类名 `.t-link--hover-underline`；值为 `false` 时，类名为 `.t-link--hover-color`


4. API 为字符串，存在枚举值，类名和枚举值没有相同字符串。按枚举值顺序列举类名。比如：button.size 和 button.shape

```json
{"PC":{"className": [{ "t-button--shape-square": false }, "t-button--shape-square", "t-button--shape-round", "t-button--shape-circle" ]}}
```

## 测试属性

1. 检测某个属性的枚举值值是否正确，比如：button.type

```json
{"PC":{"attribute": { "type": ["submit", "reset", "button"] }}}
```

2. 检测某个 API 的属性是否允许直接透传，比如：button.href

```json
{"PC":{"attribute": { "href": "https://tdesign.tencent.com/" }, "snapshot": true }}
```

## 检测某个元素是否存在

1. API 值类型 Boolean 时检测某个元素是否存在，如：button.loading

```json
{"PC":{"dom": ".t-loading", "className":"t-is-loading"}}
```
- 期望类名 `t-is-loading` 存在
- 期望 DOM 元素 `.t-loading` 存在

2. API 值类型是一个枚举值时，则依次设置对应的元素（有顺序），如：button.tag

```json
{"PC":{ "dom": ["button", "a", "div"], "snapshot": true }}
```
当 `type=button/a/div`时，期望依次呈现的 DOM 元素分别是 `["button", "a", "div"]`。

## 测试自定义元素 TNode

```json
{"PC": { "tnode": true, "snapshot": true }}
```

其中，snapshot: true 表示是否生成当前测试用例快照

## 测试事件

1. 点击事件

```json
{"PC":{ "event": { "click": { "arguments": [{ "stopPropagation": true, "type": "click" }] } } }}
```

点击自身，触发点击事件，第一个事件参数的属性 `stopPropagation` 必须存在，且属性 `type` 值为 `click`
expect(fn.mock.calls[0][0].stopPropagation).toBeTruthy();

```json
{"PC":{ "event": { "click": { "arguments": [[100, 101]] } } }}
```
点击自身，触发点击事件，第一个参数值为 [100, 101]
expect(fn.mock.calls[0][0]).toBe([100, 101]);