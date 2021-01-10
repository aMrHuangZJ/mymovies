<!--我的页面组件-->
<template>
    <div id="main">
        <!-- 头部开始 -->
        <Header  title="个人中心"/>
        <!-- 头部结束 -->
        <!-- 内容开始 -->
        <div id="content">
            <Login />
        </div>
        <!-- 内容结束 -->
        <!-- 底部导航开始 -->
        <TabBar />
        <!-- 底部导航结束 -->
    </div>
</template>

<script>

import Header from '../../components/Header';
import TabBar from '../../components/TabBar';
import Login from '../../components/Login';

export default {
    name : 'Mine',
    components : {
        Header,
        TabBar,
        Login
    }
}
</script>