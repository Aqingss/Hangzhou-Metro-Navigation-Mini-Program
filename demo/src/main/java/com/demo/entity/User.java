package com.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "wechat_auth_code", length = 255)
    private String wechatAuthCode; // 微信授权码
    
    @Column(name = "phone_number", length = 20, nullable = false, unique = true)
    private String phoneNumber; // 手机号码
    
    @Column(name = "verification_code")
    private Integer verificationCode; // 验证码
    
    @Column(name = "password", length = 255, nullable = true)
    private String password; // 密码
    
    // 构造函数
    public User() {}
    
    public User(String wechatAuthCode, String phoneNumber, Integer verificationCode, String password) {
        this.wechatAuthCode = wechatAuthCode;
        this.phoneNumber = phoneNumber;
        this.verificationCode = verificationCode;
        this.password = password;
    }
    
    // Getter和Setter方法
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getWechatAuthCode() {
        return wechatAuthCode;
    }
    
    public void setWechatAuthCode(String wechatAuthCode) {
        this.wechatAuthCode = wechatAuthCode;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public Integer getVerificationCode() {
        return verificationCode;
    }
    
    public void setVerificationCode(Integer verificationCode) {
        this.verificationCode = verificationCode;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", wechatAuthCode='" + wechatAuthCode + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", verificationCode=" + verificationCode +
                ", password='" + password + '\'' +
                '}';
    }
} 