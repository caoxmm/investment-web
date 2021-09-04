## react ts 项目代码检查和在 vscode 中自动格式化配置

> caoxmm  
> Date: 2020-09-04

在团队协作开发时有没有遇到下面问题：

写 javascript 时，我没定义，直接使用一个变量，能运行成功 🤔️。  
写 typescript 时，只要我不开代码检查，大家就 any、any、any 的提交代码了 😣。  
这样的结果就是，每个人的代码有每个人的风格，代码里面有很多不可控制的漏洞。此时，引入代码检查，保持团队代码风格一致就很有必要了。

---

### 需要用到的工具：

- [ESLint](https://eslint.org/docs/user-guide/getting-started)用来检查和识别 ECMAScript/JavaScript 代码的语法错误。

- [stylelint](https://stylelint.io/user-guide/get-started)用来检查样式代码的语法错误。

- [Prettier](https://prettier.io/docs/en/index.html)用来自动格式化代码风格，例如： 字符串使用单引号还是双引号

### 添加步骤：

1. 使用 create-react-app 创建一个 typescript 模版的项目：

```sh
npx create-react-app cra-ts-lint-demo --template typescript
```
# investment-web
