# **杭州地铁导航小程序** 🚇

**一个基于微信小程序的杭州地铁线路查询与导航系统**

## **项目简介**

本项目包含两部分：

1. **`miniprogram-2`** - 微信小程序前端（地铁导航、线路查询、站点信息等）。
2. **`demo`** - 后端服务（Java + Spring Boot），提供数据接口支持。

---

## **注意事项 ⚠️**

1. **小程序预览问题**
   * 由于后端服务未部署到云端， **在小程序预览时登录功能无法使用** 。
   * 如需完整测试，请 **本地运行后端服务**

    ![image](https://github.com/user-attachments/assets/c0395f31-6ca8-4955-b7e7-c08a2d7405a3)

2. **后端数据库配置**
   * `demo` 是后端项目，依赖  **MySQL 数据库** ，需提前创建数据库 `hzsubway` 。

## **常见问题 ❓**

**Q1: 小程序报错 "无法连接到服务器"**

* 检查后端是否启动，且 `app.js` 中的 `baseUrl` 是否指向正确地址（如 `http://localhost:8080`）。
* 换成localhost或者你自己的ip

![image](https://github.com/user-attachments/assets/b2c9b8bc-3dd9-407e-a78b-1c54a21870da)


**Q2: 数据库连接失败**

* 确认 `application.properties` 中的用户名、密码和数据库名（`hzsubway`）是否正确。
