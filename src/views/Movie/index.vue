<!--电影页面组件-->
<template>
    <div id="main">
        <!-- 头部开始 -->
        <Header  title="电影"/>
        <!-- 头部结束 -->
        <!-- 上部分开始 -->
        <div id="content">
            <div class="movie_menu"> 
                <router-link tag="div" to="/movie/city" class="city_name">
                    <span>{{ $store.state.citys.name }}</span><i class="iconfont icon-lower-triangle"></i>
                    <!-- citys来源store的全局状态管理index.vue -->
                </router-link>
                <div class="hot_swtich">
                    <router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
                    <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
                </div>
                <router-link tag="div" to="/movie/search" class="search_entry">
                    <i class="iconfont icon-sousuo"></i>
                </router-link>
            </div>
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
        <!-- 上部分结束 -->
        <!-- 底部导航开始 -->
        <TabBar />
        <!-- 底部导航结束 -->
        <!-- 电影详情页开始 -->
        <router-view name="detail"/>
        <!-- 电影详情页结束 -->
    </div>
</template>

<script>

import Header from '../../components/Header';
import TabBar from '../../components/TabBar';

export default {
    name : 'Movie',
    components : {
        Header,
        TabBar
    }
}
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>