<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          placeholder="请输入密码"
        />
      </el-form-item>

      <el-form-item prop="userType">
        <el-radio-group v-model="ruleForm.userType">
          <el-radio label="0">业主</el-radio>
          <el-radio label="1">物主</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: '',
  userType: ''
})

const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change'
    }
  ],
  userType: [
    {
      required: true,
      message: '请选择用户类型',
      trigger: 'change'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      handleLogin()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleLogin = async () => {
  try {
    const res = await store.dispatch('login', ruleForm)
    console.log(res)
    if (!res) return

    router.push('/')
  } catch (error) {
    console.log(error)
  }
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="sass"></style>
