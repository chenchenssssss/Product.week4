export default {
  template: `
    <div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">商品マスター</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-grou">
              <label for="imageUrl">画像アドレス</label>
              <input type="text" id="imageUrl" v-model="tempProduct.imageUrl" class="form-control"
                placeholder="画像アドレスを入力してください。">
            </div>
            <div class="form-group">
                <label for="customFile">
                   画像をアップロードする
                   <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
                </label>
                <input type="file" id="customFile" class="form-control" ref="file" @change="uploadFile">
            </div>
            <img :src="tempProduct.imageUrl[0]" alt="" class="img-fluid">
          </div>

          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">商品名</label>
              <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="商品名を入力してください。">
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">カテゴリー</label>
                <input type="text" id="category" v-model="tempProduct.category" class="form-control"
                  placeholder="カテゴリーを入力してください。">
              </div>

              <div class="form-group col-md-6">
                <label for="unit">単位
                </label>
                <input id="unit" v-model="tempProduct.unit" type="unit" class="form-control" placeholder="単位を入力してください。">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="origin_price">定価</label>
                <input id="origin_price" v-model="tempProduct.origin_price" type="number" class="form-control"
                  placeholder="定価を入力してください。">
              </div>

              <div class="form-group col-md-6">
                <label for="price">販売単価</label>
                <input id="price" v-model="tempProduct.price" type="number" class="form-control" placeholder="販売単価を入力してください。">
              </div>
            </div>

            <div class="form-group mt-4">
              <label for="description">商品説明</label>
              <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                placeholder="">
            </textarea>
            </div>
            <div class="form-group">
              <label for="content">商品内容</label>
              <textarea id="content" v-model="tempProduct.content" type="text" class="form-control"
                placeholder="">
            </textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input type="checkbox" id="enabled" v-model="tempProduct.enabled" class="form-check-input"
                  :true-value="1" :false-value="0">
                <label for="enabled" class="form-check-label">公開</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
        <button type="button" class="btn btn-secondary" @click="updateProduct">登録する</button>
      </div>
    </div>
  </div>
</div>`,
  data() {
    return {
      tempProduct: {
        imageUrl: [],
      },
    };
  },
  props: ['isNew', 'status', 'user'],
  methods: {
    getProduct(id) {
      const api = `${this.user.path}${this.user.uuid}/admin/ec/product/${id}`;
      axios.get(api).then((res) => {
        $('#productModal').modal('show');
        this.tempProduct = res.data.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    // 上傳
    updateProduct() {
      // 新增
      let api = `${this.user.path}${this.user.uuid}/admin/ec/product`;
      let httpMethod = 'post';
      // 不是新增時切換成編輯
      if (!this.isNew) {
        api = `${this.user.path}${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
        httpMethod = 'patch';
      }
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
      axios[httpMethod](api, this.tempProduct).then(() => {
        $('#productModal').modal('hide');
        this.$emit('update');
      }).catch((error) => {
        console.log(error)
      });
    },
    // 上傳圖
    uploadFile() {
      const uploadedFile = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const url = `${this.user.path}${this.user.uuid}/admin/storage`;
      this.status.fileUploading = true;
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        this.status.fileUploading = false;
        if (response.status === 200) {
          this.tempProduct.imageUrl.push(response.data.data.path);
        }
      }).catch(() => {
        console.log('>2 MB');
        this.status.fileUploading = false;
      });
    },
  },
};