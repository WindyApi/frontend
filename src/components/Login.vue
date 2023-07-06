<template>
    <div id="login">
        <header></header>
        <div id="content">
            <div id="content-image"></div>
            <div id="content-input">
                <el-form
                    label-position="top"
                    :model="loginData"
                    label-width="120px"
                    style="width: 70%"
                    scroll-into-view-options="true"
                    size="large"
                    id="el-form"
                    v-if="type ==='login'"
                >
                    <div id="content-input-title">用户登录</div>
                    <el-form-item label="账号">
                        <el-input v-model="loginData.account" />
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="loginData.password" type="password" show-password/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login" style="margin: 0 auto">登&nbsp;录</el-button>
                    </el-form-item>
                    <div id="content-input-switch" @click="switchForm('register')">新用户？点击注册</div>
                </el-form>
                <el-form
                    label-position="top"
                    :model="registerData"
                    label-width="120px"
                    style="width: 70%"
                    scroll-into-view-options="true"
                    size="large"
                    id="el-form"
                    v-if="type ==='register'"
                >
                    <div id="content-input-title">用户注册</div>
                    <el-form-item label="昵称">
                        <el-input v-model="registerData.nickname" />
                    </el-form-item>
                    <el-form-item label="账号">
                        <el-input v-model="registerData.account" />
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="registerData.password" type="password" show-password/>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="registerData.gender" style="width: 100%" clearable placeholder=" " v-if="type === 'register'">
                            <el-option label="男" value="0"/>
                            <el-option label="女" value="1"/>
                            <el-option label="保密" value="-1"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="register" style="margin: 0 auto">注&nbsp;册</el-button>
                    </el-form-item>
                    <div id="content-input-switch" @click="switchForm('login')" v-if="type ==='register'">已有账号？去登录</div>
                </el-form>
            </div>
        </div>
        <footer></footer>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from "axios";
import {useStore} from "vuex";
import {setCookie} from "../expand/utils.js";

//vuex对象
const store = useStore()

//显示页面为登录页面（login）还是注册页面（register） 默认为登录
const type = ref('login')

function switchForm(newType) {
    loginData.value = {
        'account': null,
        'password': null
    }
    registerData.value = {
        'account': null,
        'password': null,
        'nickname': null,
        'gender': null
    }
    type.value = newType
}

const loginData = ref({
    'account': null,
    'password': null
})

async function login() {
    let result
    await axios({
        url: '/platform/api/user/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            account: loginData.value.account,
            password: loginData.value.password
        })
    }).then((res) => {
        result = res.data
    })
    if (result.msg === 'OK') {
        store.commit('setUser', {
            'nickname': result.data.nickname,
            'avatar': result.data.avatar,
            'gender': result.data.gender,
            'role': result.data.role
        })
        setCookie('token', result.data.token, 3600 * 60)
        alert('登录成功')
    } else {
        alert(result.msg)
    }
}

const registerData = ref({
    'account': null,
    'password': null,
    'nickname': null,
    'gender': null
})

async function register() {
    let result
    await axios({
        url: '/platform/api/user/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            account: registerData.value.account,
            password: registerData.value.password,
            nickname: registerData.value.nickname,
            gender: registerData.value.gender,
        })
    }).then((res) => {
        result = res.data
    })
    if (result.msg === 'OK') {
        alert('注册成功')
    } else {
        alert(result.msg)
    }
}
</script>

<style scoped>
#login {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: #ffffff;
    background-image: linear-gradient(135deg, #ffffff 0%, #d4d5ff 100%);
}

header {
    flex: 1;
}

#content {
    flex: 7;
    width: 100vw;
    display: flex;
}

#content {
    flex: 7;
}

#content-image {
    background-image: url('/images/login-bg.jpg');
    flex: 5;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: -24px;
}

#content-input {
    flex: 2;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}

#el-form >>> .el-form-item__label {
    font-size: large;
}

#content-input-title {
    font-size: xx-large;
    margin-top: -12px;
    margin-bottom: 16px;
    text-align: center;
}

#content-input p {
    width: 70%;
    text-align: left;
    margin: 16px 0;
    font-size: large;
}

#content-input-switch {
    color: dodgerblue;
    position: relative;
    text-align: center;
    margin: 0 auto;
}

footer {
    flex: 1;
    background-color: gray;
}
</style>