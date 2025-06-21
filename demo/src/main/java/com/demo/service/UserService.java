package com.demo.service;

import com.demo.entity.User;
import com.demo.repository.UserRepository;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    // 添加PostConstruct注解，在服务启动后自动执行
    @PostConstruct
    public void initTestUser() {
        String testPhoneNumber = "17800000000";
        String testPassword = "test123456";
        
        // 检查测试账号是否已存在
        if (!userRepository.existsByPhoneNumber(testPhoneNumber)) {
            User testUser = new User();
            testUser.setPhoneNumber(testPhoneNumber);
            testUser.setPassword(testPassword);
            userRepository.save(testUser);
            
            System.out.println("测试账号已创建 - 手机号: " + testPhoneNumber + " 密码: " + testPassword);
        } else {
            System.out.println("测试账号已存在");
        }
    }

    // 创建用户
    public User createUser(User user) {
        // 检查密码是否为空
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new RuntimeException("密码不能为空");
        }
        
        // 检查手机号码是否已存在
        if (userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
            // 如果已存在的用户没有密码（临时验证码用户），则更新为正式用户
            Optional<User> existingUser = userRepository.findByPhoneNumber(user.getPhoneNumber());
            if (existingUser.isPresent() && existingUser.get().getPassword() == null) {
                User tempUser = existingUser.get();
                tempUser.setPassword(user.getPassword());
                tempUser.setWechatAuthCode(user.getWechatAuthCode());
                return userRepository.save(tempUser);
            } else {
                throw new RuntimeException("手机号码已存在");
            }
        }
        
        // 检查微信授权码是否已存在（如果提供了）
        if (user.getWechatAuthCode() != null && !user.getWechatAuthCode().isEmpty()) {
            if (userRepository.existsByWechatAuthCode(user.getWechatAuthCode())) {
                throw new RuntimeException("微信授权码已存在");
            }
        }
        
        return userRepository.save(user);
    }
    
    // 根据ID获取用户
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    // 根据手机号码获取用户
    public Optional<User> getUserByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }
    
    // 根据微信授权码获取用户
    public Optional<User> getUserByWechatAuthCode(String wechatAuthCode) {
        return userRepository.findByWechatAuthCode(wechatAuthCode);
    }
    
    // 获取所有用户
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    // 更新用户
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("用户不存在，ID: " + id));
        
        // 更新字段
        if (userDetails.getWechatAuthCode() != null) {
            user.setWechatAuthCode(userDetails.getWechatAuthCode());
        }
        if (userDetails.getPhoneNumber() != null) {
            // 检查新手机号码是否已被其他用户使用
            Optional<User> existingUser = userRepository.findByPhoneNumber(userDetails.getPhoneNumber());
            if (existingUser.isPresent() && !existingUser.get().getId().equals(id)) {
                throw new RuntimeException("手机号码已被其他用户使用");
            }
            user.setPhoneNumber(userDetails.getPhoneNumber());
        }
        if (userDetails.getVerificationCode() != null) {
            user.setVerificationCode(userDetails.getVerificationCode());
        }
        if (userDetails.getPassword() != null) {
            user.setPassword(userDetails.getPassword());
        }
        
        return userRepository.save(user);
    }
    
    // 删除用户
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("用户不存在，ID: " + id);
        }
        userRepository.deleteById(id);
    }
    
    // 验证用户登录
    public boolean validateUser(String phoneNumber, String password) {
        Optional<User> user = userRepository.findByPhoneNumber(phoneNumber);
        return user.isPresent() && user.get().getPassword() != null && user.get().getPassword().equals(password);
    }
    
    // 发送验证码
    public Integer sendVerificationCode(String phoneNumber) {
        // 生成6位随机验证码
        Random random = new Random();
        Integer verificationCode = 100000 + random.nextInt(900000);
        
        // 查找用户是否存在
        Optional<User> userOptional = userRepository.findByPhoneNumber(phoneNumber);
        
        User user;
        if (userOptional.isPresent()) {
            // 用户存在，直接更新验证码
            user = userOptional.get();
            user.setVerificationCode(verificationCode);
        } else {
            // 用户不存在，创建一个临时用户记录，只包含手机号和验证码
            user = new User();
            user.setPhoneNumber(phoneNumber);
            user.setVerificationCode(verificationCode);
            // 密码字段保持为null，表示这是一个只用于验证码的临时记录
        }
        
        // 保存用户信息
        userRepository.save(user);
        
        // 这里应该调用短信服务发送验证码
        // 由于是演示，我们只是打印日志
        System.out.println("向手机号 " + phoneNumber + " 发送验证码: " + verificationCode);
        
        return verificationCode;
    }
    
    // 验证验证码
    public boolean verifyCode(String phoneNumber, Integer verificationCode) {
        Optional<User> userOptional = userRepository.findByPhoneNumber(phoneNumber);
        if (!userOptional.isPresent()) {
            return false;
        }
        
        User user = userOptional.get();
        return user.getVerificationCode() != null && user.getVerificationCode().equals(verificationCode);
    }
} 