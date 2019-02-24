var vm = new Vue({
    el: '.container',
    data: {
        addressList: [],
        limitNum: 3,
        currentIndex: 0,
        shoppingMethod: 1,
        delAddFlag: false,
        curAddress: '',
        editAddFlag: false,
        editAdd: '',
        addAddFlag: false,
        addName: '',
        addStreet: '',
        addTel: '',
        resultName: '',
        resultStreet: '',
        resultTel: '',
        selectList: {},

    },
    mounted: function(){
        this.$nextTick( () => {
            this.getAddressList();
        });
    },
    computed: {
        filterAddress: function(){
            return this.addressList.slice(0,this.limitNum);
        },
        modifyAddress: function(){
            return this.addressList;
        }
    },
    methods: {
        getAddressList: function(){
            var _this = this;
            this.$http.get("data/address.json").then(response => {
                var res = response.data;
                if(res.status == "0"){
                    _this.addressList = res.result;
                }
            });
        },
        loadMoreAddress: function(addressId){
            this.limitNum = this.addressList.length;
        },
        setDefaultAddress(addressId){
            this.addressList.forEach((currentAddress,index) => {
                if(currentAddress.addressId == addressId){
                    currentAddress.isDefault = true;
                } else{
                    currentAddress.isDefault = false;
                }
                
            });
        },
        delAddrConfirm: function(address){
            this.delAddFlag = true;
            this.curAddress = address;
        },
        delAddress: function(){
            var index = this.addressList.indexOf(this.curAddress);
            this.addressList.splice(index, 1);
            this.delAddFlag = false;
            
        },
        editAddrConfirm: function(address){
            this.editAddFlag = true;
            this.curAddress = address;
            //this.selectList = addressList[index];
        },
        editAddress: function(){
            var index = this.addressList.indexOf(this.curAddress);
            this.selectList = {
                addressId: index,
                userName: this.modifyAddress.userName,
                streetName: this.modifyAddress.streetName,
                postCode: "430001",
                tel: this.modifyAddress.tel,
                isDefault: false
            };
            this.addressList.push(this.selectList);
            this.editAddFlag = false;
            
        },
        addAddrConfirm: function(){
            this.addAddFlag = true;
        },
        addAddress: function(){
            this.$emit('addAddress', this.modifyAddress);
        },
        addAddress: function(){
            this.selectList = {
                addressId: "105",
                userName: this.modifyAddress.userName,
                streetName: this.modifyAddress.streetName,
                postCode: "430001",
                tel: this.modifyAddress.tel,
                isDefault: false
            };
            this.addressList.push(this.selectList);
            this.addAddFlag = false;
        },

    }
});