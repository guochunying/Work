/**
 * Created by microsoft on 2016/4/11.
 */
var app=angular.module('myapp',["ui.router"])
    app.service("data",function(){
        return[
            //fstdata:[
            //    {
            //        id:1,
            //        name:'个人中心',
            //        nickname:'账户管理'
            //    },
            //    {
            //        id:2,
            //        name:'系统设置',
            //        nickname:'权限管理'
            //    }
            //],
            //secdata:[
            //    {
            //        id:11,
            //        parentid:1,
            //        name:'个人信息',
            //        page:'grxx.html'
            //    },
            //    {
            //        id:12,
            //        parentid:1,
            //        name:'修改密码',
            //        page:'xgmm.html'
            //    },
            //    {
            //        id:21,
            //        parentid:2,
            //        name:'功能配置',
            //        page:'gnpz.html'
            //    },
            //    {
            //        id:22,
            //        parentid:2,
            //        name:'角色管理',
            //        page:'jsgl.html'
            //    },
            //    {
            //        id:23,
            //        parentid:2,
            //        name:'用户管理',
            //        page:'yhgl.html'
            //    }
            //],
                {
                    ID:1,
                    parentid:23,
                    loginname:'zhangsan',
                    name:'张三',
                    role:'13管理员aaa',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'启用',
                    creattime:'2014-07-27 16:56'

                },
                {
                    ID:2,
                    parentid:23,
                    loginname:'lisi',
                    name:'李四',
                    role:'13管理员aaa',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'禁用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:3,
                    parentid:23,
                    loginname:'wangwu',
                    name:'王五',
                    role:'13管理员aaa',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'启用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:4,
                    parentid:23,
                    loginname:'zhangchen',
                    name:'张晨',
                    role:'13管理员aaa',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'启用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:5,
                    parentid:23,
                    loginname:'liucheng',
                    name:'刘成',
                    role:'管理员',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'禁用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:6,
                    parentid:23,
                    loginname:'liji',
                    name:'李继',
                    role:'13管理员aaa',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'禁用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:7,
                    parentid:23,
                    loginname:'yuantao',
                    name:'袁涛',
                    role:'13管理',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'启用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:8,
                    parentid:23,
                    loginname:'wangjian',
                    name:'王建',
                    role:'管理员',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'禁用',
                    creattime:'2014-07-27 16:56'
                }
            ]
        })


    app.config(function ($stateProvider) {
    var num =9
        $stateProvider
            .state("add",{
                url:"/add",
                templateUrl:"../txt/add.html",
                controller:function($scope,$stateParams){
                    //添加
                    console.log($stateParams.ID)
                    $scope.addfn=function(){
                        $scope.add.ID=num++
                        $scope.$emit("addData",{
                            data:$scope.add
                        })
                    }
                }
            })
            .state("user",{
                url:"/user",
                templateUrl:"../txt/user.html",
                controller:function($scope,data){
                    //查询
                    $scope.btn=function(){
                        //$scope.tal=set

                        $scope.search=$scope.search
                        //$scope.tel=$scope.sta
                    }
                    //分页总数
                    $scope.page = [];
                    for(var i=1;i<=data.length;i++){
                        //console.log(data[i])
                        $scope.page.push(i)
                        //console.log( $scope.page)

                    }
                    //点击每一页

                    $scope.pageSize=function(i){
                        $scope.pagelist=data[i]
                        $scope.selected = i+1;
                        //console.log()
                        //点击上一页
                        $scope.Previous=function(){
                                i-=1
                            $scope.selected = i+1;
                            if(i<0){
                                i=0;

                                return false
                            }
                            $scope.pagelist=data[i]
                        }
                        //点击下一页
                        $scope.Next=function(){
                            i+=1
                            $scope.selected = i+1;
                            if(i>=data.length){
                                i=data.length;

                                return false
                            }
                            $scope.pagelist=data[i]
                        }
                    }

                }
            })
    })


app.controller("ft", function ($scope, $http,data) {
    $scope.DATA=data

    $scope.$on("addData",function(e,d){
        $scope.DATA.push(d.data)
        console.log( $scope.DATA)
    })
    //删除
    $scope.remove=function(id){
        $scope.DATA.forEach(function(i,index){
                //console.log(i)
            if(i.ID==id){
                $scope.DATA.splice(index,1);

            }
        })
    }


//修改
    $scope.bol=false
    $scope.change = function (id) {
        $scope.bol=true
        $scope.mydata=data
        $scope.mydata.forEach(function (i,index) {
            if(i.ID==id){
                $scope.tar={}
                for(s in i){
                    $scope.tar[s]=i[s]
                }
                //console.log($scope.tar)
            }
        })

    }
    $scope.sure=function () {
        $scope.bol=false
        $scope.mydata.forEach(function (i,index) {

            if(i.ID==$scope.tar.ID){
                $scope.mydata[index]=$scope.tar
            }
        })
    }
    $scope.no=function () {
        $scope.mydata=data
        $scope.bol=false
    }

   });




