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

        <b-field label="标题">
          <b-input v-model="editFormData.title" type="text" placeholder="标题" required size="is-medium"> </b-input>
        </b-field>

        <b-field label="描述">
          <b-input v-model="editFormData.description" type="text" placeholder="描述" required size="is-medium">
          </b-input>
        </b-field>

        <b-field label="商品分类">
          <b-select v-model="editFormData.category" placeholder="请选择商品分类" size="is-medium" expanded>
            <option v-for="option in goodsCategoryList" :key="option.alias" :value="option">
              {{ option.name }}
            </option>
          </b-select>
        </b-field>

        <b-field label="内容">
          <mavon-editor v-model="editFormData.content" default-open="preview" :toolbars="editFormData.markdownOption" />
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

    goodsCategoryList: {
      type: Array,
      default: () => [{}, {}],
    },
  },
  data() {
    return {
      editFormData: {
        title: '',
        description: '',
        content: '',
        category: '',
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
