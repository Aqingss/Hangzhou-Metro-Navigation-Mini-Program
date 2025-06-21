package com.demo.repository;

import com.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // 根据手机号码查找用户
    Optional<User> findByPhoneNumber(String phoneNumber);
    
    // 根据微信授权码查找用户
    Optional<User> findByWechatAuthCode(String wechatAuthCode);
    
    // 检查手机号码是否存在
    boolean existsByPhoneNumber(String phoneNumber);
    
    // 检查微信授权码是否存在
    boolean existsByWechatAuthCode(String wechatAuthCode);
} 