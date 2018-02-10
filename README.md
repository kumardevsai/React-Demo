# qz-demo

React + Redux + Express + MongoDB + Antd + Purely ==> (移动端)最佳实践！！构建技术社区前后端！！

> 本来已经写好的文案...回退版本给我弄没了...心累！！！这个项目是我17年年初开的，当初刚刚入门前端，在慕课上学习`Node.js`(要被嘲笑了，但是还是很感谢慕课对我的帮助)，正好赶上我一个同学兼好友毕业设计没过，就帮他做了个全栈的游戏论坛网站，后来陆续完善过加过`gulp`，加过`less`，直到今天，我又把他重新捡起来，并且回退了N个版本重新来过。从我刚刚入门前端到现在差不多1年出头了，收获了很多，也希望能够做点事情，我的初衷并不是做一个实际的项目，而是一堆能帮助别人的工具，但是在开发工具的过程中才发现，没有一个实际的项目去测验工具的好坏我只能凭空想象，所以捡起本项目，再来一次大革新，希望对你我都有所帮助！

## 简介

现如今前端的技术层出不穷，每个人都有选择不同技术的权利，我更加钟爱`react`一些，所以采用了如题的技术栈，做一个功能比较完善的技术社区。

本篇对整个项目做一个统筹性的说明，我会在每个子包(也就是单独的项目中)进行项目的详细说明，想查看详细说明可到各个子包下面的`README.md`进行查看，如果是你想了解我学习的历程、本项目的开发过程和心得、与我一起成长，可以拉到文末查看我开发过程的博客，我可能会边做边写，也可能会做一大段在写，希望大家能耐心等待。

## 快速开始

整个项目包含客户端(client)、管理端(manage)和数据端(server)，他们的依赖存储在各自的`package.json`中，我采用的是`yarn`的`workspaces`的方式来搭建三个不同的项目又同时存在于一个包之中。

如果你使用的是`yarn`的话，你可以直接在`qz-demo`根目录下安装所有依赖

```shell
$ cd qz-demo
$ yarn
```
如果你使用的是`npm`的话，需要大家分别进入三个子包`client`、`manage`和`server`去安装依赖。

```shell
$ cd qz-demo/client
$ npm install
$ cd qz-demo/manage
$ npm install
$ cd qz-demo/server
$ npm install
```

在每个子包之中你可以单独的启动项目(`npm start`)，你也可以就在根目录下启动项目，他们分别启动在`3000`、`3001`和`3002`端口，你可以自行修改，但是不要启动在同一个端口。

```shell
$ npm run start:client 启动客户端
$ npm run start:manage 启动管理端
$ npm run start:server 启动数据端
```

## 开发环境

操作系统`Windows7`和`Mac`都做。

  - `Node`：     `>= 7.6.0`
  - `MongoDB`：  `>= 3.4.0`

## 依赖说明

开发依赖暂时不列，项目不断的加入不断补充：

### 客户端
 
  - 暂无。
 
### 管理端：

  - `ant-design`
  - `classnames`
  - `omit.js`
  - `react`
  - `react-container-query`
  - `react-document-title`
  - `react-dom`
  - `react-redux`
  - `react-router-dom`
  - `redux`
  - `redux-thunk`

### 数据端
  
  - `bcryptjs`
  - `chalk`
  - `connect-mongo`
  - `cookie-parser`
  - `express`
  - `express-session`
  - `form`
  - `formidable`
  - `gd-bmp`
  - `mongoose`

## 功能描述

项目主体分为三端，客户端，管理端和数据端各司其职，客户端用来面向用户，管理端用来给管理员管理社区，数据端用于吞吐数据，
每个子包中的`README.md`我都做了对应的详细描述，下面只是总的概述，详情可以进入每个子包详细了解。

### 客户端

分为5个模块，主页、分类、发布、心情、个人中心。

  - 主页：用于展示文章和心情头条内容
  - 分类：用于展示所有分类信息
  - 发布：用于发布文章和心情内容
  - 心情：用于展示所有用户发布的心情
  - 个人中心： 用于展示和修改个人信息

### 管理端

主要分为两大模块，一个是开始的登录、申请，一个是控制台中的数据把控。

  - 登录、申请
  - 总控制台

### 数据端

没的说，就是用于我们客户端和管理端发送异步请求的时候，为我们操作逻辑和数据库并返回数据使用，数据模型如下。

  - `admin`：管理员模型
  - `user`：用户模型
  - `genre`：分类模型
  - `post`：文章模型
  - `mood`：心情模型
  - `ids`：ID模型

## 项目博客

### 个人博客地址

待定...

### segmentfault地址

[React终极实战(一)-原型设计和数据模型](https://segmentfault.com/a/1190000013249174)

## 其他

本项目的问题你可以提[issue](https://github.com/yudaren007007/qz-demo/issues/new)或者给我发邮件。<br>
其他无关问题你可以在[segmentfault](https://segmentfault.com/u/qingzhan)给我提问。<br>
博客发表在我[个人主页](http://www.yujunren.com/blog/)和[segmentfault](https://segmentfault.com/blog/qingzhan)里面。<br>

<br>

---

&copy; 2018 [qingzhan](https://github.com/yudaren007007)
<br>
Licensed under MIT