/**
 * Created by microsoft on 2016/4/11.
 */
var app=angular.module('myapp',["ui.router"])
    app.service("alldata",function(){
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
                    //console.log($stateParams.ID)
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
                controller:function($scope,alldata,cutpage){
					//删除
					    $scope.remove=function(id){
                            $scope.mydata= alldata
					        $scope.mydata.forEach(function(i,index){
					            if(i.ID==id){
					                $scope.mydata.splice(index,1);
					            }
					        })
                            cutpage($scope)
					    }
                    //修改
                    $scope.bol=false
                    $scope.change = function (id) {
                        $scope.bol=true

                        $scope.cutoutData.forEach(function (i,index) {

                            if(i.ID==id){
                                //console.log(id)
                                $scope.tar={}
                                for(s in i){
                                    $scope.tar[s]=i[s]
                                }
                                //console.log( $scope.tar)
                            }
                        })

                    }
                    $scope.sure=function () {
                        $scope.bol=false
                        $scope.cutoutData.forEach(function (i,index) {
                            if(i.ID==$scope.tar.ID){
                                $scope.cutoutData[index]=$scope.tar
                                //console.log($scope.tar)
                                //console.log($scope.mydata[index])
                            }

                        })
                    }
                    $scope.no=function () {
                        $scope.bol=false
                    }

			        }
			    })
    })
app.service("cutpage",function(){
    return function ($scope) {
        var oldData=$scope.fileData()
        $scope.allPage=Math.ceil(oldData.length/$scope.maxLength)
        $scope.pageArr=[]
        for(var i=2;i<$scope.allPage;i++){
            $scope.pageArr.push(i)
        }
        $scope.pageShow=function (i) {
            $scope.index=i-1
            $scope.showStatue1=false;
            $scope.showStatue2=false;
            if($scope.index<=3){
                $scope.showStatue1=false;
                $scope.showStatue2=true;
                $scope.self=1;
                $scope.self_1=2;
                $scope.self_2=3;
                $scope.self1=4;
                $scope.self2=5;
            }else if($scope.index>3&&$scope.index<$scope.allPage-4){
                $scope.showStatue1=true;
                $scope.showStatue2=true;
                $scope.self=$scope.index+1;
                $scope.self_1=$scope.index;
                $scope.self_2=$scope.index-1;
                $scope.self1=$scope.index+2;
                $scope.self2=$scope.index+3;
            }else{
                $scope.showStatue1=true;
                $scope.showStatue2=false;
                $scope.self=$scope.allPage-1;
                $scope.self_1=$scope.allPage-2;
                $scope.self_2=$scope.allPage-3;
                $scope.self1=$scope.allPage-4;
            }
            if($scope.allPage<=6){
                $scope.showStatue1=false;
                $scope.showStatue2=false;
            }
            $scope.cutDataFn()


        }

        $scope.cutDataFn=function () {
            var newdata=$scope.fileData()
            //console.log(newdata)
            $scope.cutoutData=newdata.splice($scope.index*$scope.maxLength,$scope.maxLength)

        }
        $scope.changeIndexFn=function (i) {
            $scope.valueDATA=i
            $scope.pageShow(i)


        }
        $scope.updownFn=function (i) {
            if(i=="+"){
                if(($scope.index+1)< $scope.allPage){
                    $scope.pageShow($scope.index+2)
                }
            }else{
                if($scope.index>0){
                    $scope.pageShow($scope.index)
                }
            }


        }
        $scope.changeInput=function () {

            $scope.pageShow($scope.valueDATA)


        }
        $scope.pageShow(1)

    }
})

app.controller("ft", function ($scope, $http,alldata,cutpage) {
    $scope.data = alldata
//console.log(alldata)
    $scope.fileData = function () {
        return alldata.map(function (i) {
            return i
        })
    }
    
//  每一页显示的数据长度
    $scope.maxLength = 1
    cutpage($scope)

//添加
    $scope.$on("addData",function(e,d){
        $scope.data.push(d.data)
        //console.log( $scope.data)
        cutpage($scope)
    })
//查询
    $scope.btn=function(){

        cutpage($scope)
        // console.log( $scope.sea)
    }


})











