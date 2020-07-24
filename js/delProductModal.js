export default {
    template: ` <div id="delProductModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header text-white">
          <h5 id="exampleModalLabel" class="modal-title"><span>商品削除</span></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <strong class="text-danger"> {{ tempProduct.title }}</strong>
          <span class="deleteText0">を削除してもよろしいですか？</span>
          <p class="deleteText">（商品は完全に削除されます）</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn " data-dismiss="modal">
            キャンセル
          </button>
          <button type="button" class="btn" @click="delProduct">
            削除する
          </button>
        </div>
      </div>
    </div>
  </div>`,
    data() {
        return {
        };
    },
    props: ['tempProduct', 'user'],
    methods: {
        // 刪除產品
        delProduct() {
            const url = `${this.user.path}${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            axios.delete(url).then(() => {
                $('#delProductModal').modal('hide');
                this.$emit('update');
            });
        },
    }
}