<template>
    <div class="loginWrapper">
        <q-card class="card">
            <q-form class="form" @submit="login()">
                <div class="inputWrapper">
                    <q-input placeholder="Username" v-model="username"></q-input>
                    <q-input placeholder="Password" v-model="password" type="password"></q-input>
                </div>
                <q-btn label="Log in" type="submit" color="primary" />
            </q-form>
        </q-card>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import userService from '../services/user.service'

export default defineComponent({
    name: 'IndexPage',
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        async login() {
            let response = await userService.login(this.username, this.password)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                this.$router.push({ name: 'Main' })
            }
        },
    },
})
</script>
  
<style scoped lang="scss">

.form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.inputWrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.loginWrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>