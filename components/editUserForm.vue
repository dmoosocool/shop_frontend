<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">用户编辑</p>
    </header>
    <section class="modal-card-body">
      <b-notification type="is-info" icon-pack="mdi" has-icon>
        <span>如果不修改密码, 请将 <b>新密码</b> 与 <b>确认密码</b> 留空.</span>
      </b-notification>
      <b-field label="昵称">
        <b-input v-model="editFormData.nickname" type="text" :value="nickname" placeholder="昵称" required> </b-input>
      </b-field>

      <b-field label="电子邮箱">
        <b-input type="email" :value="email" placeholder="电子邮箱" required> </b-input>
      </b-field>

      <b-field label="新密码">
        <b-input type="password" :value="password" password-reveal placeholder="新密码"> </b-input>
      </b-field>

      <b-field label="确认密码">
        <b-input type="password" :value="repassword" password-reveal placeholder="确认密码"> </b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot" style="justify-content: flex-end;">
      <button class="button" type="button" @click="$parent.close()">取消</button>
      <button class="button is-primary" @click="$parent.events.onConfirm({id, ...editFormData})">
        确定
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    nickname: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    repassword: {
      type: String,
      default: '',
    },
  }, // ['nickname', 'email', 'password', 'repassword'],

  data() {
    return {
      editFormData: {
        nickname: this.nickname,
        email: this.email,
        password: this.password,
        repassword: this.repassword,
      },
    };
  },
};
</script>
