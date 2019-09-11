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
          <span>用户管理</span>
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
                  v-model="listQuery.email"
                  placeholder="搜索邮箱"
                  size="is-default"
                  type="search"
                  icon-pack="fas"
                  icon="search"
                >
                </b-input>
              </b-field>
            </div>

            <div class="column">
              <b-field label="用户类型" horizontal class="inline-flex">
                <b-select v-model="listQuery.type">
                  <option checked value="">请选择用户类型</option>
                  <option value="0">管理员</option>
                  <option value="1">会员</option>
                </b-select>
              </b-field>

              <b-field label="用户性别" horizontal class="inline-flex">
                <b-select v-model="listQuery.sex">
                  <option value="">请选择用户性别</option>
                  <option value="0">女</option>
                  <option value="1">男</option>
                  <option value="2">其他</option>
                </b-select>
              </b-field>
            </div>
          </div>
        </div>

        <div class="column search-bar">
          <div class="notification is-twitter">
            <b-button type="is-primary" icon-left="search" icon-pack="fas" @click="queryList()">
              <span>查询</span>
            </b-button>

            <b-button type="is-primary" icon-left="plus" icon-pack="fas">
              <span>添加</span>
            </b-button>

            <b-button type="is-primary" icon-left="trash" icon-pack="fas" @click="deleteMultUser()">
              <span>批量删除</span>
            </b-button>
          </div>
        </div>
      </div>
      <div class="user-list-table columns">
        <b-table
          :data="userList"
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
            <b-table-column label="昵称" field="nickname" width="150" sortable>
              {{ props.row.nickname }}
            </b-table-column>

            <b-table-column label="电子邮箱" field="email" width="150" sortable>
              {{ props.row.email }}
            </b-table-column>

            <b-table-column label="注册时间" field="date" sortable>
              {{ props.row.created }}
            </b-table-column>

            <b-table-column label="修改时间" field="date" sortable>
              {{ props.row.updated }}
            </b-table-column>

            <b-table-column label="类型" field="type" sortable>
              <span></span>
              {{ props.row.type == '1' ? '成员' : '管理员' }}
            </b-table-column>

            <b-table-column label="性别" field="gender" width="200" sortable>
              <span>
                <b-icon
                  pack="fas"
                  :style="`color: ${props.row.sex == '1' ? '#0abb87' : '#fd397a'};`"
                  :icon="props.row.sex == '1' ? 'mars' : 'venus'"
                >
                </b-icon>
              </span>
              {{ props.row.sex == '1' ? '男' : '女' }}
            </b-table-column>

            <b-table-column label="操作" field="actions" width="240">
              <span>
                <b-button type="is-warning" size="is-small" icon-left="lead-pencil" @click="tableUpdateUser(props.row)">
                  <span>修改</span>
                </b-button>
                <b-button type="is-danger" size="is-small" icon-left="delete" @click="tableDeleteUser(props.row)">
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
import editUserForm from '../components/editUserForm';

export default {
  layout: 'admin',
  middleware: 'authenticated',
  data() {
    return {
      title: '管理后台-用户管理',
      loggedUser: this.$store.state.user,
      isPublic: false,
      checkedRows: null,
      checkboxPosition: 'left',
      tableLoading: true,
      listQuery: {
        email: '',
        type: '',
        sex: '',
      },
      userList: [],
      isEditUserModalActive: false, // 用于显示隐藏编辑框.
      updateModal: '', // 用于存储编辑框组件.
    };
  },
  head() {
    return {
      title: this.title,
    };
  },

  async asyncData({$axios}) {
    const userList = await $axios.$get('/users/');
    return {
      userList,
      tableLoading: false,
    };
  },

  methods: {
    queryList() {
      this.getUserList(this.listQuery);
    },

    tableDeleteUser(row) {
      const {id, email} = row;
      this.$buefy.dialog.confirm({
        title: '温馨提示',
        cancelText: '取消',
        confirmText: '确定',
        message: `是否要删除 <b>${email}</b> 这个账号?`,
        onConfirm: () => this.deleteUser(id),
      });
    },

    tableUpdateUser(row) {
      const {id, email, nickname} = row;
      this.updateModal = this.$buefy.modal.open({
        parent: this,
        component: editUserForm,
        props: {
          id,
          email,
          nickname,
        },
        events: {
          onConfirm: (params) => {
            const {password, newPassword, rePassword} = params;
            if (!password || !rePassword || !newPassword) {
              return;
            }

            if (newPassword !== rePassword) {
              this.$buefy.toast.open({
                message: `<b>温馨提示</b>: <b>新密码</b> 与 <b>确认密码</b> 不一致, 请检查后再提交.`,
                position: 'is-top',
                type: 'is-danger',
              });
              return;
            }

            this.updateUser(params);
          },
        },
        hasModelCard: true,
        canCancel: ['escape', 'x'],
        customClass: 'custom-class custom-class-2',
      });
    },

    deleteMultUser() {
      const ids = [];
      this.checkedRows.forEach((element) => {
        ids.push(element.id);
      });

      const idParam = ids.join(',');
      this.deleteUser(idParam);
    },

    tableCheck(checkedList) {
      this.checkedRows = checkedList;
    },

    // 删除table组件中的数据.
    tableDataDelete(id) {
      const delArr = id.split(',');
      const newUserList = [];
      this.userList.forEach((element) => {
        if (!delArr.includes(element.id)) {
          newUserList.push(element);
        }
      });
      this.userList = newUserList;
    },

    // 请求删除用户接口.
    async deleteUser(id) {
      if (id) {
        this.tableDataDelete(id);
        const resp = await this.$axios.$delete('/users/', {data: {id}});
        if (resp) {
          this.$toast.success('删除用户成功');
        }
      }
    },

    // 获取用户列表用于查询.
    async getUserList(params) {
      this.tableLoading = true;
      for (const i in params) {
        if (params[i] === '') {
          delete params[i];
        }
      }

      const userList = await this.$axios.$get('/users/', {params});

      this.tableLoading = false;
      this.userList = userList;
      this.listQuery = {
        email: params.email || '',
        type: params.type || '',
        sex: params.sex || '',
      };
    },

    async updateUser(params) {
      const {id, password, newPassword} = params;
      const resp = await this.$axios.$put(`/users/${id}/password`, {password, newPassword});
      if (resp) {
        this.updateModal.close();
        this.$toast.success('修改用户成功');
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
