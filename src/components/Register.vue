<template lang="html">
  <div class="">
    <el-form :model="registerValidateForm" label-width="100px"  ref="registerValidateForm">
          <el-form-item
            prop="email"
            label="邮箱"
            :rules="rules.email"
          >
            <el-input v-model="registerValidateForm.email"></el-input>
          </el-form-item>
          <el-form-item
          prop="password"
          label="密码"
          :rules = "rules.password"
          >
            <el-input type="password" v-model="registerValidateForm.password"></el-input>
          </el-form-item>
          <el-form-item
          prop="checkPass"
          label="再次输入"
          :rules = "rules.checkPass"
          >
            <el-input type="password" v-model="registerValidateForm.checkPass"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submitForm('registerValidateForm')">注册</el-button>
          <el-button @click="resetForm('registerValidateForm')">重置</el-button>
    </el-form>
  </div>
</template>
·
<script>
import * as types from '../store/types'
export default {
    name: 'login',
    data() {
        var validatePass2 = (rule, value, callback) => {
            value === '' ? callback(new Error('请再次输入密码')) :
                value !== this.registerValidateForm.password ? callback(new Error('两次输入密码不一致!')) :
                callback()
        };
        return {
            registerValidateForm: {
                domains: [{
                    value: ''
                }],
                email: '',
                password: '',
                checkPass: ''
            },
            rules: {
                email: [{
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: 'blur,change'
                    }
                ],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
                checkPass: [{
                        required: true,
                        message: '请再次输入密码',
                        trigger: 'blur'
                    },
                    {
                        validator: validatePass2,
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let opt = this.registerValidateForm;
                    this.$http.post('/api/register', opt).then((response) => {
                        // console.log(response)
                        if (response.data.success) {
                            this.$message({
                                type: 'success',
                                message: '注册成功，请登录'
                            })
                            this.$router.push('/login')
                        } else {
                            this.$message({
                                type: 'info',
                                message: '此账户已存在'
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

<style lang="css">
</style>
