<template lang="html">
  <div class="">
    <el-row>
      <el-col :span="10" :offset="7">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户登录" name="first">
            <el-col >
              <el-form :model="dynamicValidateForm" label-width="100px" ref="dynamicValidateForm">
                    <el-form-item
                      prop="email"
                      label="邮箱"
                      :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                      ]"
                    >
                      <el-input v-model="dynamicValidateForm.email"></el-input>
                    </el-form-item>
                    <el-form-item
                    prop="password"
                    label="密码"
                    :rules = "[
                      { required: true, message: '请输入密码', trigger: 'blur' }
                    ]"
                    >
                      <el-input type="password" v-model="dynamicValidateForm.password"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="submitForm('dynamicValidateForm')">登陆</el-button>
                    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
              </el-form>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="用户注册" name="second">
            <Register></Register>
          </el-tab-pane>
      </el-tabs>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import Register from '@/components/Register.vue'
import * as types from '../store/types'
import sha1 from 'sha1'
export default {
  name: 'login',
  data() {
    return {
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: '',
        password: ''
      },
      activeName: this.$store.state.activeName
    }
  },
  components: {
    Register
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let opt = this.dynamicValidateForm;
          this.$http.post('/api/login', opt).then((response) => {
            console.log(response)
            if (response.data.info == false) {
              this.$message({
                type: 'info',
                message: '账号不存在'
              })
            }
            if (response.data.success) {
              this.$message({
                type: 'success',
                message: '登录成功'
              })
              this.$store.commit(types.LOGIN, response.data.token);
              let redirect = decodeURIComponent(this.$route.query.redirect || '/');
              this.$router.push({
                path: redirect
              })
              console.log(localStorage.token)
            } else if (response.data.success == false) {
              this.$message({
                type: 'info',
                message: '密码错误'
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss">
.el-col {
    // margin-bottom:
}
</style>
