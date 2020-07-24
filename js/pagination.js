export default {
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item" v-for="i in pages.total_pages" :key="i" :class='{ active: pages.current_page === i }'>
      <a class="page-link" href="#" @click.prevent='updatePage(i)'>{{ i }}</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
    </nav>`,
    // 如果用a去觸發一個事件 建議都加上prevent 。 它的用途是避免預設事件干擾事件觸發。
    props:['pages'],
    methods: {
        updatePage(num){
            this.$emit('update',num)
        }
    },
}