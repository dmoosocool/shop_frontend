<template>
  <form @submit="checkForm">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
      </header>
      <section class="modal-card-body">
        <!-- 编辑提示 -->
        <b-notification v-show="!!content" type="is-info" icon-pack="mdi" has-icon>
          {{ content }}
        </b-notification>

        <b-field label="商品分类名称">
          <b-input v-model="editFormData.name" type="text" placeholder="商品分类名称" required size="is-medium">
          </b-input>
        </b-field>

        <b-field label="商品分类别名">
          <b-input v-model="editFormData.alias" type="text" placeholder="商品分类别名" required size="is-medium">
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
    title: {
      type: String,
      default: '',
    },

    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editFormData: {
        name: '',
        alias: '',
      },
    };
  },
  methods: {
    checkForm(e) {
      e.preventDefault();
      const {editFormData} = this;
      this.$parent.events.onConfirm({...editFormData});
    },
  },
};
</script>
