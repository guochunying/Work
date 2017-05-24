/**
 * Created by Administrator on 2017/5/10 0010.
 */
exports.data = function () {
     return [
         {
             route:"/index",
             handle:function(res,req,next){
                 //req����ͷ
                 // res��Ӧ������
                 // res����ͷ��ģ��ĺ�̨���ݷ��ظ����������������ͷ��û��ͷ�Ļ����ݳ�������
                 res.writeHead(200,{
                     "Content-type":"application/json;charset=UTF-8",
                     "Access-Control-Allow-Origin":"*"//��������������������
                 });
                 var data=[
                     {
                         id:1000,
                         name:"iphone1",
                         price:"$2400"
                     },
                     {
                         id:3000,
                         name:"iphone3",
                         price:"$3500"
                     },
                     {
                         id:2000,
                         name:"iphone2",
                         price:"$1080"
                     },
                     {
                         id:4000,
                         name:"iphone4",
                         price:"$4030"
                     }
                 ]
                 res.write(JSON.stringify(data))
                 res.end()
             }
         }
     ]
}