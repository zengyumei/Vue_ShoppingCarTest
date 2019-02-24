var vm = new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList:[],
        checkAllFlag: false,
        delFlag: false,
        curProduct: ''
    },
    mounted: function(){
        this.$nextTick(function(){
            vm.cartView();
        })
       
    },
    //所有事件的绑定
    methods:{
        cartView: function(){
            let _this = this;
            this.$http.get("data/cartData.json", {"id": 123}).then(res=>{
                this.productList = res.data.result.list;

            });
        },
        changeMoney: function(product, way){
            if(way > 0){
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if(product.productQuantity < 1){
                    product.productQuantity = 1;
                }               
            }
            this.calcTotalPrice();
        },
        seleted: function(item){
            if(typeof item.checked == 'undefined'){
                Vue.set(item, "checked", true);
                //this.$set(item, "checked", true)
            } else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function(){
            this.checkAllFlag = !this.checkAllFlag;
            var _this = this;
            //if(this.checkAllFlag){
            this.productList.forEach(function(item, index){
                if(typeof item.checked == 'undefined'){
                    _this.$set(item, "checked", _this.checkAllFlag)
                } else{
                    item.checked = _this.checkAllFlag;
                }
            })
            //}
            this.calcTotalPrice();
        },
        calcTotalPrice: function(){
            var _this = this;
            _this.totalMoney = 0;
            this.productList.forEach(function(item, index){
                if(item.checked){
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            })
        },
        delConfirm: function(item){
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function(){
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
            
            this.calcTotalPrice();
        }
    },
    filters:{
        formatMoney: function(value){
            return value.toFixed(2);
        }
    }
});

Vue.filter("money", function(value, type){
    return value.toFixed(2) + type;
})