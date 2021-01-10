<!--城市定位组件-->
<template>

    <div class="city_body">
        <Loading v-if="isLoading"/>
        <div v-else class="city_list">
            <!-- 热门城市开始 -->
            <!-- <Scroller ref="city_List">
                <div> -->
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hotList" :key="item.cityId" @click="handleToCity(item.name , item.cityId)">{{ item.name }}</li>
                        </ul>
                    </div>
                    <!-- 热门城市结束 -->
                    <!-- 城市分类开始 -->
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityList" :key="item.index">
                            <h2>{{ item.index }}</h2>
                            <ul>
                                <li v-for="a in item.list" :key="a.cityId" @click="handleToCity(a.name , a.cityId)">{{ a.name }}</li>
                            </ul>
                        </div>              
                    </div>
                <!-- </div>
            </Scroller> -->
            <!-- 城市分类结束 -->
        </div>
        <!-- 右侧字母开始 -->
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleleYoIndex(index)">{{ item.index }}</li>
            </ul>
        </div>
        <!-- 右侧字母结束 -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'City',
    data(){
        return {
            cityList : [],
            hotList : [],
            isLoading : true
        }
    },
    //数据请求开始
    mounted(){

        var cityList = window.localStorage.getItem('cityList');
        var hotList = window.localStorage.getItem('hotList');

        if(cityList && hotList){
            this.cityList = JSON.parse(cityList);
            this.hotList = JSON.parse(hotList);
            this.isLoading = false;
        }
        else{
        axios({
            url:"https://m.maizuo.com/gateway?k=9502566",
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
                'X-Host': 'mall.film-ticket.city.list'
            }
    }).then(res=>{
 
        var cities = res.data.data.cities;
        var { cityList , hotList } = this.formatCityList(cities);
        this.cityList = cityList;
        this.hotList = hotList;

        this.isLoading = false

        //本地存储
        window.localStorage.setItem('cityList' , JSON.stringify(cityList));
        window.localStorage.setItem('hotList' , JSON.stringify(hotList));
    });
    }
    },
    // 数据请求结束
    //方法处理开始
    methods : {       
        formatCityList(cities){           
            var cityList = [];//下部分城市分类
            var hotList = [];//热门城市

            // 1.判断isHot热门城市开始
            for(var i=0;i<cities.length;i++){
                if(cities[i].isHot === 1){
                    hotList.push( cities[i] );
                }
            }
            // 判断isHot热门城市结束

            // 2.城市分类开始
            //排序开始 获取每个城市的首字母，并改为大写，并排列放入到cityList中
            for(var i=0;i<cities.length;i++){
                var firstLetter = cities[i].pinyin.substring(0,1).toUpperCase();
                if(toCom(firstLetter)){
                    // 按ABC..分组
                    cityList.push({ index : firstLetter , list : [ { name : cities[i].name , cityId : cities[i].cityId} ] } );
                }
                else{
                    for(var j=0;j<cityList.length;j++){
                        if( cityList[j].index === firstLetter){
                            cityList[j].list.push( { name : cities[i].name , cityId : cities[i].cityId} );
                        }
                    }
                } 
                        
            }  
            //判断该城市是否是对应的该字母，不是的话返回ture进入ABC..分组
            function toCom(firstLetter){
                for(var i=0;i<cityList.length;i++){
                    if( cityList[i].index === firstLetter ){//筛选出该城市不是这个字母的，让其进行分组
                        return false;
                    }
                }
                return true;
            }
            // 城市首字母按顺序排序         
            cityList.sort((n1,n2)=>{
                if(n1.index > n2.index){
                    return 1;
                }
                else if(n1.index < n2.index){
                    return -1;
                }
                else{
                    return 0;
                }
            });

            //排序结束
            //  console.log(cityList);
            // console.log(hotList)
            return {
                cityList,
                hotList
            }
        },
        //2. 城市分类结束
        //formatCityList结束

        handleleYoIndex(index){
            //改变页面滚动到指定的位置
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
            // this.$refs.city_sort.parentNode.scrollTop获取父元素到顶部的距离
            //HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的包含该元素的定位元素
            // this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
        },
        // 改变定位
        handleToCity(name , cityId){
            this.$store.commit('citys/CITY_INFO',{name,cityId});
            //存储上一次定位到本地
            window.localStorage.setItem('nowNm',name);
            window.localStorage.setItem('nowId',cityId);
            // 点击定位后跳转
            this.$router.push('/movie/nowPlaying');
        }
    }
    // 方法处理结束
}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>