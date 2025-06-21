package com.demo.controller;

import com.demo.entity.User;
import com.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // 创建用户
    @PostMapping
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            User createdUser = userService.createUser(user);
            response.put("success", true);
            response.put("message", "用户创建成功");
            response.put("data", createdUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    
    // 获取所有用户
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllUsers() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<User> users = userService.getAllUsers();
            response.put("success", true);
            response.put("message", "获取用户列表成功");
            response.put("data", users);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // 根据ID获取用户
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUserById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<User> user = userService.getUserById(id);
            if (user.isPresent()) {
                response.put("success", true);
                response.put("message", "获取用户成功");
                response.put("data", user.get());
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "用户不存在");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // 根据手机号码获取用户
    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<Map<String, Object>> getUserByPhoneNumber(@PathVariable String phoneNumber) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<User> user = userService.getUserByPhoneNumber(phoneNumber);
            if (user.isPresent()) {
                response.put("success", true);
                response.put("message", "获取用户成功");
                response.put("data", user.get());
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "用户不存在");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // 更新用户
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        Map<String, Object> response = new HashMap<>();
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            response.put("success", true);
            response.put("message", "用户更新成功");
            response.put("data", updatedUser);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    
    // 删除用户
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            userService.deleteUser(id);
            response.put("success", true);
            response.put("message", "用户删除成功");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    
    // 用户登录验证
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            String phoneNumber = loginRequest.get("phoneNumber");
            String password = loginRequest.get("password");
            
            if (phoneNumber == null || password == null) {
                response.put("success", false);
                response.put("message", "手机号码和密码不能为空");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            
            boolean isValid = userService.validateUser(phoneNumber, password);
            if (isValid) {
                Optional<User> user = userService.getUserByPhoneNumber(phoneNumber);
                response.put("success", true);
                response.put("message", "登录成功");
                response.put("data", user.get());
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "手机号码或密码错误");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // 更新验证码
    @PutMapping("/verification-code")
    public ResponseEntity<Map<String, Object>> updateVerificationCode(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String phoneNumber = (String) request.get("phoneNumber");
            Integer verificationCode = (Integer) request.get("verificationCode");
            
            if (phoneNumber == null || verificationCode == null) {
                response.put("success", false);
                response.put("message", "手机号码和验证码不能为空");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            
            // 查找用户
            Optional<User> userOptional = userService.getUserByPhoneNumber(phoneNumber);
            if (!userOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "用户不存在");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            // 更新验证码
            User user = userOptional.get();
            user.setVerificationCode(verificationCode);
            User updatedUser = userService.updateUser(user.getId(), user);
            
            response.put("success", true);
            response.put("message", "验证码更新成功");
            response.put("data", updatedUser);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // 发送验证码
    @PostMapping("/send-verification-code")
    public ResponseEntity<Map<String, Object>> sendVerificationCode(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String phoneNumber = request.get("phoneNumber");
            
            if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "手机号码不能为空");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            
            // 发送验证码
            Integer verificationCode = userService.sendVerificationCode(phoneNumber);
            response.put("success", true);
            response.put("message", "验证码发送成功");
            // 注意：在实际生产环境中，不应该返回验证码给客户端
            // 这里只是为了演示和测试目的
            response.put("verificationCode", verificationCode);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    
    // 验证验证码
    @PostMapping("/verify-code")
    public ResponseEntity<Map<String, Object>> verifyCode(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String phoneNumber = (String) request.get("phoneNumber");
            Integer verificationCode = (Integer) request.get("verificationCode");
            
            if (phoneNumber == null || verificationCode == null) {
                response.put("success", false);
                response.put("message", "手机号码和验证码不能为空");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            
            boolean isValid = userService.verifyCode(phoneNumber, verificationCode);
            if (isValid) {
                response.put("success", true);
                response.put("message", "验证码验证成功");
            } else {
                response.put("success", false);
                response.put("message", "验证码错误或已过期");
            }
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
} 