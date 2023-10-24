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
                    :rules="loginDataRule"
                >
                    <div id="content-input-title">用户登录</div>
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="loginData.account" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginData.password" type="password" show-password/>
                    </el-form-item>
                    <el-form-item label="验证码" prop="password">
                        <div style="display: flex; width: 100%">
                            <img :src="captcha.captchaBase64Data" alt="" @click="getCaptcha">
                            <div style="flex: 1"></div>
                            <el-input v-model="loginData.captcha" style="flex: 5"/>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login" style="margin: 0 auto">登&nbsp;录</el-button>
                    </el-form-item>
                    <div class="content-input-switch" @click="switchForm('register')">新用户？点击注册</div>
                    <div class="content-input-switch" @click="switchForm('forget')">忘记密码？点此重置</div>
                </el-form>
                <el-form
                    label-position="top"
                    :model="resetData"
                    label-width="120px"
                    style="width: 70%"
                    scroll-into-view-options="true"
                    size="large"
                    id="el-form"
                    v-if="type ==='forget'"
                    :rules="resetDataRule"
                >
                    <div id="content-input-title">重置密码</div>
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="resetData.account" />
                    </el-form-item>
                    <el-form-item label="验证码" prop="verifyCode">
                        <div style="display: flex; width: 100%">
                            <el-button type="primary" @click="getResetVerifyCode" style="margin: 0 auto">点&nbsp;击&nbsp;获&nbsp;取</el-button>
                            <div style="flex: 1"></div>
                            <el-input v-model="resetData.verifyCode" style="flex: 5"/>
                        </div>
                    </el-form-item>
                    <el-form-item label="密码" prop="newPassword">
                        <el-input v-model="resetData.newPassword" type="password" show-password/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="reset" style="margin: 0 auto">重&nbsp;置</el-button>
                    </el-form-item>
                    <div class="content-input-switch" @click="switchForm('login')">想起密码？去登陆</div>
                    <div class="content-input-switch" @click="switchForm('register')">新用户？点击注册</div>
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
                    :rules="registerDataRule"
                >
                    <div id="content-input-title">用户注册</div>
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="registerData.nickname" />
                    </el-form-item>
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="registerData.account" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="registerData.password"/>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerData.email" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="registerData.gender" style="width: 100%" clearable placeholder=" " v-if="type === 'register'">
                            <el-option label="男" value="0"/>
                            <el-option label="女" value="1"/>
                            <el-option label="保密" value="-1"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="验证码" prop="captcha">
                        <div style="display: flex; width: 100%">
                            <img :src="captcha.captchaBase64Data" alt="" @click="getCaptcha">
                            <div style="flex: 1"></div>
                            <el-input v-model="registerData.captcha" style="flex: 5"/>
                        </div>
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
import {ref, onMounted} from 'vue'
import {useStore} from "vuex";
import {setCookie} from "../expand/utils.js";
import {useRouter} from "vue-router";
import {getRequest, postRequest, putRequest} from "../expand/request.js";
import {ElMessage} from "element-plus";

//vuex对象
const store = useStore()
const router = useRouter()

//显示页面为登录页面（login）还是注册页面（register） 默认为登录
const type = ref('login')

const captcha = ref({
    identity: null,
    captchaBase64Data: null
})

const getCaptcha = async () => {
    const result = await getRequest('/platform/api/center/user/captcha', null)
    captcha.value.identity = result.data.identity
    captcha.value.captchaBase64Data = result.data.captchaBase64Data
}

onMounted(async () => {
    await getCaptcha()
})

const switchForm = async (newType) => {
    await getCaptcha()
    loginData.value = {
        'account': null,
        'password': null
    }
    registerData.value = {
        'account': null,
        'password': null,
        'email': null,
        'nickname': null,
        'gender': null
    }
    type.value = newType
}

const loginData = ref({
    'account': null,
    'password': null,
    'captcha': null
})

const loginDataRule = {
    account: {
        required: true,
        message: '请输入账号',
        trigger: 'blur'
    },
    password: {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    },
    captcha: {
        required: true,
        message: '请输入验证码',
        trigger: 'blur'
    }
}

const login = async () => {
    const result = await postRequest('/platform/api/center/user/login', {
        account: loginData.value.account,
        password: loginData.value.password,
        identity: captcha.value.identity,
        captcha: loginData.value.captcha
    })
    if (result.msg === 'OK') {
        switch (result.data.gender) {
            case 0:
                result.data.gender = '男'
                break
            case 1:
                result.data.gender = '女'
                break
            case -1:
                result.data.gender = '保密'
                break
        }
        if (result.data.avatar === null || result.data.avatar === '') {
            result.data.avatar = "/images/default-avatar.jpg"
        }
        store.commit('setUser', {
            'nickname': result.data.nickname,
            'avatar': result.data.avatar,
            'gender': result.data.gender,
            'role': result.data.role,
            'createTime': result.data.createTime
        })
        setCookie('token', result.data.token, 3600 * 60)
        ElMessage({
            message: '登录成功',
            type: 'success',
        })
        await router.push('/system')
    } else if (result.msg === '验证码不存在' || result.msg === '验证码错误') {
        ElMessage.error("验证码错误")
        await getCaptcha()
        loginData.value.captcha = null
    } else if (result.msg === '密码错误') {
        ElMessage.error("密码错误")
        await getCaptcha()
        loginData.value.password = null
        loginData.value.captcha = null
    } else if (result.msg === '用户不存在或已被封号') {
        ElMessage.error("用户不存在或已被封号")
        await getCaptcha()
    } else {
        ElMessage.error("系统出错")
        await getCaptcha()
        loginData.value.captcha = null
    }
}

const resetData = ref({
    visible: false,
    account: null,
    verifyCode: null,
    newPassword: null
})

const resetDataRule = {
    account: {
        required: true,
        message: '请输入账号',
        trigger: 'blur'
    },
    verifyCode: {
        required: true,
        message: '请输入验证码',
        trigger: 'blur'
    },
    newPassword: {
        required: true,
        message: '请输入新密码',
        trigger: 'blur'
    }
}

const getResetVerifyCode = async () => {
    const params = {'account': resetData.value.account}
    const result = await getRequest('/platform/api/center/user/forget', params)
    console.log(result)
    if (result.status === 0) {
        ElMessage({
            message: '验证码发送成功，请注意查收',
            type: 'success'
        })
    } else {
        ElMessage.error("账号不存在，请注册或检查邮箱是否正确")
    }
}

const reset = async () => {
    const result = await putRequest('/platform/api/center/user/forget', resetData.value)
    console.log(result)
    if (result.status === 0) {
        ElMessage({
            message: '重置成功',
            type: 'success'
        })
        await switchForm('login')
    }
}

const registerData = ref({
    'account': null,
    'password': null,
    'email': null,
    'nickname': null,
    'gender': null,
    'captcha': null
})

const registerDataRule = {
    account: {
        required: true,
        message: '请输入账号',
        trigger: 'blur'
    },
    password: {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    },
    email: {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur'
    },
    nickname: {
        required: true,
        message: '请输入昵称',
        trigger: 'blur'
    },
    gender: {
        required: true,
        message: '请选择性别',
        trigger: 'blur'
    },
    captcha: {
        required: true,
        message: '请输入验证码',
        trigger: 'blur'
    }
}

const register = async () => {
    const result = await postRequest('/platform/api/center/user/register', {
        account: registerData.value.account,
        password: registerData.value.password,
        email: registerData.value.email,
        nickname: registerData.value.nickname,
        gender: registerData.value.gender,
        identity: captcha.value.identity,
        captcha: registerData.value.captcha
    })
    if (result.msg === 'OK') {
        ElMessage({
            message: '注册成功',
            type: 'success',
        })
        type.value = 'login'
    } else if (result.msg === '验证码不存在' || result.msg === '验证码错误') {
        ElMessage.error("验证码错误")
        await getCaptcha()
        loginData.value.captcha = null
    } else {
        ElMessage.error("系统出错")
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

.content-input-switch {
    color: dodgerblue;
    position: relative;
    text-align: center;
    margin: 12px auto;
}

footer {
    flex: 1;
    background-color: gray;
}
</style>