<!--即将上映组件-->
<template>
    <!-- <Scroller> -->
        <div class="movie_body">
            <Loading v-if="isLoading"/>
            <Scroller v-else>
            <ul>           
                <li v-for="item in comingList" :key="item.id">
                    <div class="pic_show" @click="handleToDetail(item.id)"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2 @click="handleToDetail(item.id)">{{item.nm}}</h2>
                        <p><span class="person">{{item.wish}}</span>人想看</p>
                        <p>主演：{{item.star}}</p>
                        <p>{{item.rt}}上映 {{item.version}}</p>
                    </div>
                    <div class="btn_mall">
                        预售
                    </div>
                </li>
            </ul>
            </Scroller>
        </div>
    <!-- </Scroller> -->
</template>

<script>
import axios from 'axios'
export default {
    name : 'ComingSoon',
    
    data(){
        return{
            comingList : [],
            isLoading : true,
            prevCityId : -1,//上一个定位记录
        }
    },
    activated(){

            // activated在挂载后和更新前被调用的。所以说当我们想使用activated()生命周期时，必须配合<keep-alive>来使用！
        //上一个定位记录
        var cityIds = this.$store.state.citys.cityId;
        if( this.prevCityId === cityIds){return;}
        this.isLoading = true;

        axios({
            url: '/ajax/comingList?ci=1&token=&limit=10&optimus_uuid=227AE2D0393911EBAFC86B80F89D1EEE521D849956394874B777E5103B4531C8&optimus_risk_level=71&optimus_code='+cityIds,
            }).then(res=>{
                this.comingList = res.data.coming;
                // console.log(this.comingList)
                this.isLoading = false

                 //保存之前的定位记录
         this.prevCityId = cityIds;
        });
    },
    methods : {
        handleToDetail(movieId){
            this.$router.push('/movie/detail/1/'+movieId);
        }
    }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>