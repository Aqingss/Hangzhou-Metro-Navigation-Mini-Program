# 用户管理API使用说明

## 数据库配置
确保MySQL数据库已创建名为`hzsubway`的数据库，并修改`application.properties`中的数据库连接信息：
- 数据库URL：`jdbc:mysql://localhost:3306/hzsubway`
- 用户名：`root`
- 密码：`123456`

## 用户表结构
- `id`: 主键（自增）
- `wechat_auth_code`: 微信授权码（String）
- `phone_number`: 手机号码（String，唯一）
- `verification_code`: 验证码（Integer）
- `password`: 密码（String）

## API接口列表

### 1. 创建用户
- **URL**: `POST /api/users`
- **Content-Type**: `application/json`
- **请求体示例**:
```json
{
    "wechatAuthCode": "wx123456789",
    "phoneNumber": "13800138000",
    "verificationCode": 1234,
    "password": "password123"
}
```

### 2. 获取所有用户
- **URL**: `GET /api/users`
- **返回**: 用户列表

### 3. 根据ID获取用户
- **URL**: `GET /api/users/{id}`
- **参数**: `id` - 用户ID

### 4. 根据手机号获取用户
- **URL**: `GET /api/users/phone/{phoneNumber}`
- **参数**: `phoneNumber` - 手机号码

### 5. 更新用户
- **URL**: `PUT /api/users/{id}`
- **参数**: `id` - 用户ID
- **Content-Type**: `application/json`
- **请求体示例**:
```json
{
    "wechatAuthCode": "wx987654321",
    "phoneNumber": "13900139000",
    "verificationCode": 5678,
    "password": "newpassword123"
}
```

### 6. 删除用户
- **URL**: `DELETE /api/users/{id}`
- **参数**: `id` - 用户ID

### 7. 用户登录
- **URL**: `POST /api/users/login`
- **Content-Type**: `application/json`
- **请求体示例**:
```json
{
    "phoneNumber": "13800138000",
    "password": "password123"
}
```

### 8. 更新验证码
- **URL**: `PUT /api/users/verification-code`
- **Content-Type**: `application/json`
- **请求体示例**:
```json
{
    "phoneNumber": "13800138000",
    "verificationCode": 5678
}
```

### 9. 发送验证码
- **URL**: `POST /api/users/send-verification-code`
- **Content-Type**: `application/json`
- **请求体示例**:
```json
{
    "phoneNumber": "13800138000"
}
```
- **说明**: 向指定手机号发送6位随机验证码，验证码会自动更新到数据库中。如果手机号不存在，会自动创建一个临时用户记录用于存储验证码

### 10. 验证验证码
- **URL**: `POST /api/users/verify-code`
- **Content-Type**: `application/json`
- **请求体示例**:
```json
{
    "phoneNumber": "13800138000",
    "verificationCode": 123456
}
```
- **说明**: 验证手机号和验证码是否匹配

## 响应格式
所有API响应都采用统一格式：
```json
{
    "success": true,
    "message": "操作成功信息",
    "data": {}
}
```

## 运行项目
1. 确保MySQL数据库已启动并创建`hzsubway`数据库
2. 运行命令：`mvn spring-boot:run`
3. 访问：`http://localhost:8080`

## 测试示例（使用curl命令）

### 创建用户
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "wechatAuthCode": "wx123456789",
    "phoneNumber": "13800138000",
    "verificationCode": 1234,
    "password": "password123"
  }'
```

### 获取所有用户
```bash
curl -X GET http://localhost:8080/api/users
```

### 用户登录
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "13800138000",
    "password": "password123"
  }'
```

### 发送验证码
```bash
curl -X POST http://localhost:8080/api/users/send-verification-code \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "13800138000"
  }'
```

### 验证验证码  
```bash
curl -X POST http://localhost:8080/api/users/verify-code \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "13800138000",
    "verificationCode": 123456
  }'
```

### 更新验证码
```bash
curl -X PUT http://localhost:8080/api/users/verification-code \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "13800138000",
    "verificationCode": 5678
  }'
``` 