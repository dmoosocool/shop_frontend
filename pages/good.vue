<template>
  <div id="admin-users">
    <b-notification type="is-warning" icon-pack="mdi" has-icon>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime accusantium consequatur doloremque facilis, a eum
      tempora corporis porro iusto consequuntur. Eveniet consectetur minima qui ipsam suscipit reiciendis pariatur dolor
      quam. Ipsam omnis ratione necessitatibus sint est dolor possimus dicta praesentium, sed aliquam tempora
      aspernatur? Consectetur adipisci doloribus expedita voluptas voluptatibus, repellendus ullam explicabo officia quo
      dolorem et eaque enim iusto assumenda ratione doloremque repellat provident tempora a nulla nisi, recusandae, ad
      sunt corporis! Ut nam rerum ea eum distinctio hic autem dolores non amet repudiandae illo numquam, rem minus
      pariatur, natus dignissimos obcaecati error et necessitatibus, doloremque deserunt veritatis quis.
    </b-notification>

    <div class="user-list panel-box-shadow">
      <div class="user-list-header columns">
        <div class="user-list-header-title column is-one-fifth">
          <b-icon pack="fas" icon="user"></b-icon>
          <span>商品管理</span>
        </div>
        <div class="column"></div>
        <div class="user-list-header-action column is-one-fifth"></div>
      </div>
      <div class="user-list-filter columns">
        <div class="column is-three-quarters">
          <div class="columns">
            <div class="column is-one-quarter">
              <b-field>
                <b-input
                  v-model="searchList.goods"
                  placeholder="搜索商品"
                  size="is-default"
                  type="search"
                  icon-pack="fas"
                  icon="search"
                >
                </b-input>
              </b-field>
            </div>
          </div>
        </div>

        <div class="column search-bar">
          <div class="notification is-twitter">
            <b-button type="is-primary" icon-left="search" icon-pack="fas">
              <span>查询</span>
            </b-button>

            <b-button type="is-primary" icon-left="plus" icon-pack="fas" @click="addGoodsForm">
              <span>添加</span>
            </b-button>

            <b-button type="is-primary" icon-left="trash" icon-pack="fas">
              <span>批量删除</span>
            </b-button>
          </div>
        </div>
      </div>
      <div class="user-list-table columns">
        <b-table
          :data="queryList"
          :checked-row="checkedRows"
          :loading="tableLoading"
          paginated
          per-page="10"
          aria-next-label="下一页"
          aria-previous-label="上一页"
          aria-page-label="页码"
          aria-current-label="当前页"
          checkable
          focusable
          striped
          :checkbox-position="checkboxPosition"
          @check="tableCheck"
        >
          <template slot-scope="props">
            <b-table-column label="标题" field="title" width="150" sortable>
              {{ props.row.title }}
            </b-table-column>

            <b-table-column label="描述" field="description" sortable>
              {{ props.row.description }}
            </b-table-column>

            <b-table-column label="商品分类" field="category" width="150" sortable>
              {{ props.row.category.name }}
            </b-table-column>

            <b-table-column label="商品价格" field="price" sortable>
              {{ props.row.price.toFixed(2) }}
            </b-table-column>

            <b-table-column label="创建时间" field="date" sortable>
              {{ props.row.created }}
            </b-table-column>

            <b-table-column label="修改时间" field="date" sortable>
              {{ props.row.updated }}
            </b-table-column>

            <b-table-column label="操作" field="actions" width="240">
              <span>
                <b-button type="is-warning" size="is-small" icon-left="lead-pencil">
                  <span>修改</span>
                </b-button>
                <b-button type="is-danger" size="is-small" icon-left="delete">
                  <span>删除</span>
                </b-button>
              </span>
            </b-table-column>
          </template>

          <template slot="empty">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p>
                  <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
                </p>
                <p>暂无数据.</p>
              </div>
            </section>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import addGoodsForm from '../components/addGoodsForm';

export default {
  layout: 'admin',
  middleware: 'authenticated',
  data() {
    return {
      title: '管理后台-商品管理',
      loggedUser: this.$store.state.user,
      checkedRows: null, // 用于存放选中数据
      checkboxPosition: 'left', // 设置CheckBox的方向
      tableLoading: true,
      queryList: [],
      goodsCategoryList: [],
      searchList: {
        goods: '',
      },
      addGoodsModal: null,
    };
  },
  head() {
    return {
      title: this.title,
    };
  },

  async asyncData({$axios}) {
    const queryList = await $axios.$get('/goods/');
    const goodsCategoryList = await $axios.$get('/goods-categories/');

    return {
      queryList,
      goodsCategoryList,
      tableLoading: false,
    };
  },

  methods: {
    tableCheck(checkedList) {
      this.checkedRows = checkedList;
    },

    addGoodsForm() {
      this.addGoodsModal = this.$buefy.modal.open({
        parent: this,
        component: addGoodsForm,
        hasModelCard: true,
        props: {
          title: '添加商品',
          content: '温馨提示',
          goodsCategoryList: this.goodsCategoryList,
        },
        events: {
          onConfirm: (params) => this.addGoods(params),
        },
        canCancel: ['escape', 'x'],
        customClass: 'custom-class custom-class-2',
      });
    },

    async addGoods(params) {
      const resp = await this.$axios.$post('/goods/', params);
      if (resp) {
        this.queryList.push(resp);
        this.addGoodsModal.close();
      }
    },
  },
};
</script>

<style lang="scss">
.user-list {
  background-color: #fff;

  .user-list-header {
    padding: 0.6rem;
    transition: height 0.3s;
    border-bottom: 1px solid #ebedf2;
  }

  .user-list-filter {
    padding: 1.5rem;
  }

  .user-list-table .table-wrapper {
    min-height: 200px;
  }

  .columns {
    margin: 0;
  }
}

.admin-container .admin-main .admin-main-content .search-bar {
  text-align: right;
  .notification {
    background: transparent;
    box-shadow: none;
  }
}
</style>
