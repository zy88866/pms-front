/* eslint-disable no-tabs */
<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form">

      <h3 class="title">物业管理系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin">
        </el-input>
      </el-form-item>
      <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin:0px 0px 25px 0px;"
      >记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
      <p class="login-tip">系统默认用户名：admin，密码：admin</p>
    </el-form>
  </div>
</template>

<script>
import {setToken, setUserInfo} from '~utils/sessionStorage'
import {login} from '@/api/auth'
import {getUserInfo} from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin',
        rememberMe: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        // 验证成功
        if (valid) {
          this.loading = true
          // 登陆对象实体
          login(this.loginForm.username, this.loginForm.password)
            .then(res => {
              setToken(res)
            }).then(res => {
              getUserInfo().then(res => {
                setUserInfo(res)
                this.$router.push('/')
                setTimeout(() => {
                   this.loading = false;
                }, 200);
              })
            }).catch(err =>{
                this.loading = false;
            })
        } else {
          return false;
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
    .login{
        display: flex;
        justify-content: center;
        align-items: center;
        background-image:url(	https://aurora-1255840532.cos.ap-chengdu.myqcloud.com/1547428971990.jpg);
         background-size: cover;
        height: 100%;
    }
     .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #707070;
    }
    .login-form {
        border-radius: 6px;
        background: #ffffff;
        width: 365px;
        padding: 25px 25px 5px 25px;
        .el-input {
        height: 38px;
        input {
            height: 38px;
        }
    }
  }
  .login-tip {
        font-size: 13px;
        text-align: center;
        color: #bfbfbf;
  }
</style>
