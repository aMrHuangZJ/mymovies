<template>
    <div class="cinema_body">
        <Loading v-if="isLoading"/>
        <Scroller v-else>
            <ul>
                <!-- <li>
                    <div>
                        <span>大地影院（奥东世纪店）</span>
                        <span class="q"><span class="price">22.9</span>元起</span>
                    </div>
                    <div class="address">
                        <span>金州区大连经济技术开发区奥东世纪3层</span>
                        <span>1763.5km</span>
                    </div>
                    <div class="card">
                        <div>小吃</div>
                        <div>折扣卡</div>
                    </div>
                </li> -->
                <li v-for="item in cinemeList1" :key="item.id">
                    <div>
                        <span>{{item.name}} <span class="numbers">{{item.count}}</span></span>
                        <span class="btn_mall">选择</span>
                    </div>
                </li>

            </ul>
        </Scroller>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'Clist',
    data(){
        return{
            cinemeList1 : [],
            isLoading : true
        
        };
    },
    mounted(){
        
         axios({
            url: '/ajax/filterCinemas?ci=1&optimus_uuid=227AE2D0393911EBAFC86B80F89D1EEE521D849956394874B777E5103B4531C8&optimus_risk_level=71&optimus_code=10',
            }).then(res=>{
                this.cinemeList1 = res.data.brand.subItems;
               
                // console.log(res.data.brand.subItems)
                this.isLoading = false
        });
    }
}
</script>

<style scoped>
.cinema_body{ 
    flex:1; 
    overflow:auto;
    }
.cinema_body ul{ 
    padding:20px;
    }
.cinema_body li{  
    border-bottom:1px solid #e6e6e6; 
    margin-bottom: 20px;
    }
.cinema_body div{ 
    margin-bottom: 10px; 
    position: relative;
    }
.numbers{
    color: #f90;
}
.btn_mall{
    width:47px; 
    height:27px; 
    line-height: 28px; 
    text-align: center; 
    background-color: #f03d37; 
    color: #fff; 
    border-radius: 4px; 
    font-size: 12px; 
    cursor: pointer;
    position: absolute;
    right: 20px;
    bottom: 2px;
}
</style>