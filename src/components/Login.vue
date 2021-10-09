<template>
    <div class="login_container">

        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box"><img src="../assets/logo.png" alt=""></div>

              <!--输入区域  -->
            <el-form :model="UserPassword" :rules="inputFormRules" ref="clearForm" class="input_box">
              <el-form-item prop="id">
               <el-input prefix-icon="el-icon-user" v-model="UserPassword.id"></el-input>
              </el-form-item>
              <el-form-item prop="password">
               <el-input prefix-icon="el-icon-loading" v-model="UserPassword.password" type="password"></el-input>
              </el-form-item>
              <el-form-item class="button">
                  <el-button type="primary" @click="login">登录</el-button>
                  <el-button type="success" @click="clear">重置</el-button>
              </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      UserPassword: {
        id: '',
        password: ''
      },
      inputFormRules: {
        id: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 8, max: 11, message: '长度在 8 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 11, message: '长度在 8 到 11 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    clear () {
      this.$refs.clearForm.resetFields()
    },
    login () {
      console.log(this.UserPassword.id)
      this.$refs.clearForm.validate(valid => {
        if (!valid) return false /* 当预处理为false时，返回  */
        this.$axios({
          method: 'post',
          url: 'http://localhost:8071/login/login2',
          data: this.UserPassword
        }).then((response) => {
          if (response.data.status === 200) {
            console.log(response)
            this.$message.success('登录成功')
            // 存储token
            // window.sessionStorag.setItem('token', response.data.data.token)
            sessionStorage.setItem('token', response.data.data.token)
            // 跳转页面
            this.$router.push('/home')
          } else {
            this.$message.error('登录失败,请检查账号与密码')
            console.log(response)
          }
        })
      })
    }
  }
}

</script>

<style lang="less" scoped>
.login_container {
    /* background-color; */
    height: 100%;

}

.login_box {
    width: 450px;
    height: 300px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);  /**以盒子为单位水平与垂直方向移动-50% */

   .avatar_box {
     height: 100px;
     width: 100px;
     background-color: rgb(161, 156, 156);
     position:absolute;
     border-radius: 50%;
     left: 50%;
     transform: translate(-50%,-50%);
     padding: 5px;

     img{
     height: 100px;
     width: 100px;
     border-radius: 50%;
     background-color:gray;
     };

    }
      .input_box{
      position: absolute;
      width: 100%;
      padding: 0px 30px;
      left: 50%;
      transform: translate(-50%,-50%);
      top:60%;
      box-sizing: border-box;

      .button{
          display: flex;
          justify-content: end;
      }
     }
}
</style>
