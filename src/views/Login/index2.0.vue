<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <!-- v-for数据循环  :key = v-bind:key -->
          <li :class="{ 'current': item.current }" v-for="item in menuTab" :key="item.id" @click="toggleMneu(item)">{{ item.txt }}</li>
       </ul>
       <!-- 表单 start -->
       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
            <!-- gutter  属性来指定每一栏之间的间隔，默认间隔为 0  span 通过基础的 24 分栏，迅速简便地创建布局 
                autocomplete="off"，禁止浏览器默认填充 -->
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>                
            </el-col>
            <el-col :span="9">
              <el-button  type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { stripscript, validateEmail, validatePassw, validateVcode } from '@/utils/validate';
export default {
  name: 'login',
  data(){
    // 验证用户名
    var validateUsername = (rule, value, callback) => {    
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if(!validateEmail(value)){
        callback(new Error('用户名格式有误'));
      } else {
        callback();
      }
    };
    // 验证密码
    var validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!validatePassw(value)) {
        callback(new Error('密码必须设为6-20位的数字+字母'));
      } else {
        callback();
      }
    };
    // 验证重复密码
    var validatePasswords = (rule, value, callback) => {
      // 如果为模块值为login，直接通过  如果不想生成这个DOM 可以直接使用v-if
      if(this.model === 'login') { callback(); }
      // 过滤后的数据
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value != this.ruleForm.password) {
        callback(new Error('两次密码不一致'));
      } else {
        callback();
      }
    };
    // 验证验证码
    var validateCode = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (!validateVcode(value)) {
        callback(new Error('验证码错误'));
      } else {
        callback();
      }
    };

    return{
      menuTab: [
        { txt: '登录', current: true, type: 'login'},
        { txt: '注册', current: false, type: 'register'}
      ],
      // 模块值
      model: 'login',
      ruleForm: {
          username: '',
          password: '',
          passwords: '',
          code: ''
      },
      // 验证trigger: 'blur'是否失去焦点
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  created(){},
  // 挂载完成后自动执行的
  mounted(){

  },
    
  // 写函数的地方
  methods: {
    // vue 数据驱动视频渲染
    // // js 操作DOM元素
    toggleMneu(data){
      // 遍历menuTab里current的值都为false
      this.menuTab.forEach(elem => {
        elem.current = false
      });
      // 高光
      data.current = true
      // 修改模块值
      this.model = data.type
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
<style scoped lang="scss" >
#login {
    height: 100vh; // 根据浏览器高度
    background-color: #344a5f;
}
.login-wrap {
  height: 330px;
  margin: auto;
  width: 300px;
}
.menu-tab {
  text-align: center;
  li {
    // a.不同之处：对元素设置display：inline-block ，元素不会脱离文本流
    // 而float就会使得元素脱离文本流，且还有父元素高度坍塌的效果
    // display几个常用的属性值，inline ， block， inline-block
    // inline: 行内元素   block: 块级元素 inline-block: 行内块级元素  
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    // 圆角
    border-radius: 2px;
    // 设置手柄
    cursor: pointer;
  }
  .current {
    background-color: rgba(0 , 0 ,0, .1);
  }
}
.login-form{
  margin-top: 29px;
  label {      
    // 改为块元素
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: white;
    text-align: left;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}

</style>
