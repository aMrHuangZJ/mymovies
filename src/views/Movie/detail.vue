<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <div id="content" class="contentDetail">
            <div class="detail_list">
                <div class="detail_list_bg"></div>
                <div class="detail_list_filter"></div>
                <div class="detail_list_content">
                    <div class="detail_list_img">
                        <img src="http://p0.meituan.net/128.180/movie/7cc1bdf342496b1fb3e80b419052100d1795568.jpg" alt="">
                    </div>
                    <div class="detail_list_info">
                        <h2>踮起脚尖去爱你</h2>
                        <p>刘岗,孙乐仟,夏志祥</p>
                        <p>9.2</p>
                        <p>剧情、爱情</p>
                        <p>中国大陆</p>
                        <p>2020-12-12大陆上映</p>
                    </div>
                </div>
            </div>
            <div>
                <p>获取到您点击对应电影的ID是：{{this.movieId}}</p>
            </div>
            <div class="detail_player swiper-container">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide">
                        <div>
                            <!-- <img src="http://p0.meituan.net/128.180/movie/7cc1bdf342496b1fb3e80b419052100d1795568.jpg" alt=""> -->
                        <p class="tishi">因未能爬取到对应网络接口请求数据，故未能开发对应电影详情</p>
                        </div>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import Header from '../../components/Header';
import axios from 'axios';
export default {
    name : 'Detail',
    data(){
        return{
            detailMovie :{}
        }
    },
    components :{
        Header
    },
    props : ['movieId'],
    methods : {
        handleToBack(){
            this.$router.back();
        }
    },
    mounted(){
        //  console.log(this.movieId);
         axios({
            url: '/ajax/comingList?ci=1&token=&limit=10&optimus_uuid=227AE2D0393911EBAFC86B80F89D1EEE521D849956394874B777E5103B4531C8&optimus_risk_level=71&optimus_code=',
            }).then(res=>{
               
               this.detailMovie = res.data.coming;
               console.log(res.data.coming);
        });
        
    }
}
</script>

<style scoped>
#detailContrainer{ position: absolute; left: 0; top: 0; z-index: 100; width: 100%; min-height: 100%; background: white; }
#detailContraine.slide-enter-active{
    animation:.6s slideMove;
}
@keyframes slideMove{
    0%{ transform: translateX(100%);}
    100%{ transform: translateX(0);}
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: url(/images/movie_1.jpg) 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
.tishi{
    color: tomato;
}
</style>