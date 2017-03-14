<template scope='scope'>
<div class="hello">
    <h1>{{ msg }}</h1>
    <h2>网站用户有：</h2>
    <ul>
        <li v-for="(item, index) in user">
            {{ index }} {{ item.email }}
            <el-button type="" @click="del_user(index)">删除</el-button>
        </li>
        <br>
    </ul>
    <el-button type="primary" @click="logout()">登出</el-button>
</div>
</template>

<script>
import * as types from '../store/types'
export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            user: ''
        }
    },
    mounted() {
        this.getUser();
    },
    methods: {
        getUser() {
            setTimeout(() => {
                this.$http.get('/api/user').then((response) => {
                    console.log(response)
                    this.user = response.data
                })
            }, 50)
        },
        logout() {
            this.$store.commit(types.LOGOUT)
            if (!this.$store.state.token) {
                this.$router.push('/login')
                this.$message({
                    type: 'success',
                    message: '登出成功'
                })
            } else {
                this.$message({
                    type: 'info',
                    message: '登出失败'
                })
            }
        },
        del_user(id) {
            let _id = this.user[id]._id;
            console.log(_id)
            this.$http.post('/api/del_user', {
                id: _id
            }).then(response => {
                console.log(response)
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                this.getUser()
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
