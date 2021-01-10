<!--正在上映组件-->
<template>
    <div class="movie_body" ref="movie_body">
        <Loading v-if="isLoading"/>
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>  
                <li class="pullDown">{{pullDownMsg}}</li>                                              
                <li v-for="item in movieList" :key="item.filmId">
                    <div class="pic_show" @click="handleToDetail(item.filmId)"><img :src="item.poster"></div>
                    <div class="info_list">
                        <h2 @click="handleToDetail(item.filmId)">{{item.name}}</h2>
                        <p>{{item.category}}</p>
                        <p>主演：<span v-for="a in item.actors" :key="a.index">{{a.name}}/</span></p>
                        <p>{{item.nation}} {{item.filmType.name}}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>           
            </ul>
        </Scroller>
    </div>
</template>

<script>
import axios from 'axios';
// import BScroll from 'better-scroll';
export default {
    name : 'NowPlaying',
    data(){
        return{
            movieList : [],
            pullDownMsg : '',
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
            url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k='+cityIds,
        headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
            'X-Host': 'mall.film-ticket.film.list'
        }
    }).then(res=>{
        // var msg = res.data.msg;
        // if( msg === 'OK'){
        //     this.movieList = res.data.data.films;
        // }
         this.movieList = res.data.data.films;
         this.isLoading = false;
         //保存之前的定位记录
         this.prevCityId = cityIds;
        //  console.log(res.data)
        // this.$nextTick(()=>{
        //     var scroll = new BScroll(this.$refs.movie_body,{
        //         click : true,
        //         probeType : 2
        //     });

        //     scroll.on('scroll',(pos)=>{
        //         console.log('scroll');
        //         if(pos.y > 10){
        //             this.pullDownMsg = '正在更新中'
        //         }
        //     });
        //     scroll.on('touchEnd',(pos)=>{
        //         console.log('touchEnd');
        //         if(pos.y > 10){
        //             this.pullDownMsg = '更新成功'
        //         }
        //     })
        // })
     });
    },
    methods : {
        handleToDetail(movieId){
            // console.log(movieId);
            this.$router.push('/movie/detail/1/'+movieId);
        },
        handleToScroll(pos){
            if(pos.y > 10){
                this.pullDownMsg = '正在更新中'
                }
        },
        handleToTouchEnd(pos){
            if(pos.y > 10){
                this.pullDownMsg = '更新成功'
            }
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
.pullDown{
    margin: 0;
    padding-left: 35%;
    border: none;
}
</style>