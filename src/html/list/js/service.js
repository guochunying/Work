app.directive("headers",function(){
    return {
        restrict:"EACM",
        replace:true,
        templateUrl:"page/header.html",
        controller:function($scope,alldata){
            $scope.data=alldata.fstdata//把第一个数组存放到data里边

        }
    }
})
//删除
app.directive("confirm",function () {
    return {
        restrict:"ECMA",
        replace:true,
        templateUrl:"page/confirm/del.html",
        controller:function ($scope,alldata) {

        }
    }
})
//角色修改
app.directive("write",function () {
    return {
        restrict:"ECMA",
        replace:true,
        templateUrl:"page/confirm/write.html",
        controller:function ($scope,alldata) {

        }
    }
})
//用户修改
app.directive("main",function () {
    return {
        restrict:"ECMA",
        replace:true,
        templateUrl:"page/confirm/box.html",
        controller:function ($scope,alldata) {

        }
    }
})
//用户添加
app.directive("plus",function () {
    return {
        restrict:"ECMA",
        replace:true,
        templateUrl:"page/confirm/add.html",
        controller:function ($scope,alldata) {

            $scope.data=alldata.thirdata
            console.log($scope.data)
            $scope.$on("addData",function(e,d){
                console.log(d.alldata)
                $scope.data.push(d.alldata)
            })
        }
    }
})
//分页
app.service("cutpage",function () {
    return function ($scope) {
        //对页码进行判断
        $scope.pagelist=function(){
            if($scope.index<=3){
                $scope.showStatue1=false;
                $scope.showStatue2=true;
                $scope.self=1;
                $scope.self_1=2;
                $scope.self_2=3;
                $scope.self1=4;
                $scope.self2=5;
            }else if($scope.index>3&&$scope.index<$scope.allPage-4){
                //console.log($scope.allPage-4)
                $scope.showStatue1=true;
                $scope.showStatue2=true;
                $scope.self=$scope.index+1;//当前页
                $scope.self_1=$scope.index;//前一页
                $scope.self_2=$scope.index-1;//前两页
                $scope.self1=$scope.index+2;//后一页
                $scope.self2=$scope.index+3;//后两页
            }else{
                $scope.showStatue1=true;
                $scope.showStatue2=false;
                $scope.self=$scope.allPage-1;
                $scope.self_1=$scope.allPage-2;
                $scope.self_2=$scope.allPage-3;
                $scope.self1=$scope.allPage-4;
            }
        }
        //数据跟页码之间对应
        $scope.pageShow=function (i) {
            var oldData=$scope.fileData()//原来的数据
            $scope.allPage=Math.ceil(oldData.length/$scope.maxLength)//总的页数
            $scope.pageArr=[]//定义一个空的数组存放页数
            for(var j=2;j<$scope.allPage;j++){
                $scope.pageArr.push(j)//遍历总的页数把每页的页数存放到数组里
            }
            $scope.index=i-1//每页对应下标
            $scope.showStatue1=false;//省略号的状态
            $scope.showStatue2=false;//省略号的状态
            $scope.pagelist()

            $scope.cutPageState=true
            $scope.lastPage=true
            if($scope.allPage<=6){//如果总页数小于6就让省号不出现
                $scope.showStatue1=false;
                $scope.showStatue2=false;
                if($scope.allPage<2){//如果总页数小于2,最后一页不显示
                    $scope.lastPage=false
                    if($scope.allPage<1){//如果总页数小于1,页数都不显示
                        $scope.cutPageState=false
                    }
                }
            }
            $scope.cutDataFn()
        }
//对数据进行截取
        $scope.cutDataFn=function () {
            var newdata=$scope.fileData()//数据赋给新的变量存起来
            $scope.cutoutData=newdata.splice($scope.index*$scope.maxLength,$scope.maxLength)
            //console.log($scope.cutoutData)
        }
        //点击每一页把数据页码调进来
        $scope.changeIndexFn=function (i) {
            $scope.pageShow(i)
            $scope.val=i
        }
        //点击上一页下一页
        $scope.dropdown=function (i) {
            if(i=="+"){
                if(($scope.index+1)< $scope.allPage){
                    //console.log($scope.index++1当前页码
                    $scope.pageShow($scope.index+2)//下一页
                }
            }else{
                if($scope.index>0){
                    $scope.pageShow($scope.index)
                }
            }
        }
        $scope.changeInput=function () {
            $scope.pageShow($scope.val)

        }
        $scope.pageShow(1)

    }
})