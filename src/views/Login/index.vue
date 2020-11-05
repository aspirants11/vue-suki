<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <!-- v-for数据循环  :key = v-bind:key -->
          <li :class="{ 'current': item.current }" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">{{ item.txt }}</li>
       </ul>
       <!-- 表单 start -->
       <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
          <label for="passwords">重复密码</label>
          <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label for="code">验证码</label>
            <!-- gutter  属性来指定每一栏之间的间隔，默认间隔为 0  span 通过基础的 24 分栏，迅速简便地创建布局 
                autocomplete="off"，禁止浏览器默认填充 -->
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input id="code" type="text" v-model="ruleForm.code" autocomplete="off"></el-input>                
            </el-col>
            <el-col :span="9">
              <el-button  type="success" class="block" @click="getSms()">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block" :disabled="loginButtonStatus">{{ model === 'login' ? "登录" : "注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { GetSms } from '@/api/login';
import { reactive, ref, onMounted } from '@vue/composition-api';
import { stripscript, validateEmail, validatePassw, validateVcode } from '@/utils/validate';
export default {
  name: 'login',
  setup(pops, { refs, root }) {
    // 这里面放置data数据，生命周期，自定义函数
    /**
     * 声明数据
     */
    // 验证用户名
    let validateUsername = (rule, value, callback) => {    
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if(!validateEmail(value)){
        callback(new Error('用户名格式有误'));
      } else {
        callback();
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!validatePassw(value)) {
        callback(new Error('密码必须设为6-20位的数字+字母'));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      // 如果为模块值为login，直接通过  如果不想生成这个DOM 可以直接使用v-if
      if(model.value === 'login') { callback(); }
      // 过滤后的数据
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value != ruleForm.password) {
        callback(new Error('两次密码不一致'));
      } else {
        callback();
      }
    };
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (!validateVcode(value)) {
        callback(new Error('验证码错误'));
      } else {
        // 验证内容是否输入完毕 暂时写在这儿
        loginButtonStatus.value = false;
        callback();
      }
    };   

    const menuTab = reactive([
      { txt: '登录', current: true, type: 'login'},
      { txt: '注册', current: false, type: 'register'}
    ])
    // 模块值
    const model = ref('login')
    // 登录按钮禁用状态
    const loginButtonStatus = ref(true)
    // 表单绑定数据
    const ruleForm = reactive({
        username: '',
        password: '',
        passwords: '',
        code: ''
    })
    // 表单的验证
     // 验证trigger: 'blur'是否失去焦点
    const rules = reactive({
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
    })

    /**
     * 声明函数
     */
    // vue 数据驱动视频渲染
    // // js 操作DOM元素
    const toggleMenu = (data => {
      console.log(data)
      // 遍历menuTab里current的值都为false
      menuTab.forEach(elem => {
        elem.current = false
      });
      // 高光
      data.current = true
      // 修改模块值
      model.value = data.type
      // 重置表单
      // this.$refs[formName].resetFields(); // 2.0写法
      refs.loginForm.resetFields(); // 3.0写法

    })
    /**
     * 获取验证码
     */
    const getSms = (() => {
      // 前端进行拦截提示
      if(ruleForm.username == ''){
        root.$message.error({ message: '邮箱不能为空！' });
        return false
      }

      // 邮箱校验
      // if(validateEmail(ruleForm.username)){
      //   root.$message.error({ message: '邮箱格式有误，请重新输入！'});
      //   return false
      // }

      // 请求的接口
      // 多个接口写法
      // let data = {
      //   username: ruleForm.username
      // }
      // GetSms(data)

      // 单个接口写法
      GetSms({ username: ruleForm.username })
      // 要有后台数据支撑
      // GetSms({ username: ruleForm.username }).then(response => {

      // }).catch(error => {
      //     console.log(error)
      // })
    })
    /**
     * 提交表单
     */
    const submitForm = (formName => {      
      context.refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    })

    /**
     * 生命周期
     */
    // 挂载完成后自动执行的
    onMounted(() => {
      
    })

    return {
      menuTab,
      model,
      loginButtonStatus,
      toggleMenu,
      submitForm,
      ruleForm,
      rules,
      getSms
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
