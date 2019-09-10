<template>
  <form @submit="checkForm">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">用户编辑</p>
      </header>
      <section class="modal-card-body">
        <b-notification type="is-info" icon-pack="mdi" has-icon>
          <span>
            <del>如果不修改密码, 请将 <b>新密码</b> 与 <b>确认密码</b> 留空.</del>
            <b>暂时只支持修改密码.</b>
          </span>
        </b-notification>
        <b-field label="昵称">
          <b-input v-model="editFormData.nickname" type="text" :value="nickname" placeholder="昵称" disabled required>
          </b-input>
        </b-field>

        <b-field label="电子邮箱">
          <b-input v-model="editFormData.email" type="email" :value="email" placeholder="电子邮箱" disabled required>
          </b-input>
        </b-field>

        <b-field label="新密码">
          <b-input
            v-model="editFormData.password"
            type="password"
            :value="password"
            password-reveal
            placeholder="新密码"
            required
          >
          </b-input>
        </b-field>

        <b-field label="确认密码">
          <b-input
            v-model="editFormData.repassword"
            type="password"
            :value="repassword"
            password-reveal
            placeholder="确认密码"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot" style="justify-content: flex-end;">
        <button class="button" type="button" @click="$parent.close()">取消</button>
        <button class="button is-primary" type="submit">
          确定
        </button>
      </footer>
    </div>
  </form>
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
  },
  data() {
    return {
      editFormData: {
        nickname: this.nickname,
        email: this.email,
        password: this.password,
        repassword: this.repassword,
      },
    };
  }, // ['nickname', 'email', 'password', 'repassword'],
  methods: {
    checkForm(e) {
      e.preventDefault();
      const {id, editFormData} = this;
      this.$parent.events.onConfirm({id, ...editFormData});
    },
  },
};
</script>
