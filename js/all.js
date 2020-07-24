import pagination from './pagination.js';
Vue.component('pagination', pagination);

import productModal from './productModal.js';
Vue.component('productModal', productModal);

import delProductModal from './delProductModal.js';
Vue.component('delProductModal',delProductModal)

new Vue({
    el: '#app',
    data: {
        products: [],
        pagination: {},
        tempProduct: {
            imageUrl: [],
        },
        isNew: false,
        status: {
            fileUploading: false,
        },
        user: {
            path:'https://course-ec-api.hexschool.io/api/',
            token: '',
            uuid: '5422afca-aaf4-4f91-8fb3-26f0be87e307',
        },
    },
    created() {
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)sonykoToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
        this.getProducts();
    },
    methods: {
        // 產品資料
        getProducts(page = 1) {
            const api = `${this.user.path}${this.user.uuid}/admin/ec/products?page=${page}`;
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            axios.get(api).then((response) => {
                this.products = response.data.data;
                this.pagination = response.data.meta.pagination;
            });
        },
        // 開啟 Modal
        openModal(isNew, item) {
            switch (isNew) {
                case 'new':
                    this.$refs.productModel.tempProduct = {
                        imageUrl: [],
                    };
                    this.isNew = true;
                    $('#productModal').modal('show');
                    break;

                case 'edit':
                    this.tempProduct = Object.assign({}, item);
                    this.$refs.productModel.getProduct(this.tempProduct.id);
                    this.isNew = false;
                    break;

                case 'delete':
                    this.tempProduct = Object.assign({}, item);
                    $('#delProductModal').modal('show');
                    break;
                default:
                break;
            }
        },
    },
})





