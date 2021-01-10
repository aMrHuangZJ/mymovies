// http地址，电影页面路由
export default{
    path : '/movie',
    component : () => import('../../views/Movie'),
    //二级路由
    //电影上部分组件路由
    children : [
        {
            path : 'city',//相对第一路由相对路径   定位
            component : () => import('../../components/City')
        },
        {
            path : 'nowPlaying',//相对第一路由相对路径   正在热映
            component : () => import('../../components/NowPlaying')
        },
        {
            path : 'comingSoon',//相对第一路由相对路径   积极上映
            component : () => import('../../components/ComingSoon')
        },
        {
            path : 'search',//相对第一路由相对路径   搜索
            component : () => import('../../components/Search')
        },
        {
            path : 'detail/1/:movieId',
            components : {
                default : ()=> import('../../components/NowPlaying'),
                detail : ()=> import('../../views/Movie/detail')
            },
            props : {
                detail:true
            }
        },
        {
            path : 'detail/2/:movieId',
            components : {
                default : ()=> import('../../components/ComingSoon'),
                detail : ()=> import('../../views/Movie/detail')
            },
            props : {
                detail:true
            }
        },
        {
            path : '/movie',//如果是/movie路径则默认显示
            redirect : '/movie/nowPlaying'
        }
    ]
}