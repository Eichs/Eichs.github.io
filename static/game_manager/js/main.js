

$(document).ready(()=>{
    var sample_cmds = []
    var history_gm_talk = undefined
    var history_gm_talk_json = {}
    // 获取指定的cookie值，如果获取不到，得到的就是 undefined



    function post_json  (url,json_data,success_callback,error_callback){  //LOGIN
        $.ajax({
            url:url,
            data:JSON.stringify(json_data) ,
            method:"post",
            dataType:"json",
            contentType:"application/json;charset=UTF-8",
            success: function (data) {
                success_callback(data)
            },
            error: function (data){
                error_callback(data)
            }
        })
    }


    
    function sample_cmd_bt_click(e){ //执行与解析样例中的指令 
        index = parseInt(e.currentTarget.className.substr(e.currentTarget.className.indexOf("_")+1)) //从class 或者 id获取 获取index 或许有更优雅的方式 以后可能会有订单类的命令
        switch (sample_cmds[index]["type"]){//看看类型是什么  1 命令 2 普通文字或者带物品的邮件 2 带有为数组的item_list邮件 3 多个邮件 
            case 0:
                $(".gm-talk").click()
                for (var i =0;i< Object.keys(sample_cmds[index]["cmd"]).length;i++){
                    $("#t-msg").val(sample_cmds[index]["cmd"][i])
                    if(sample_cmds[index]["autorun"] == true){//危险指令不要自动执行
                        $(".gm-talk-execute").click()
                    }else{
                        msg_box("危险指令请手动执行!")
                    }
                    
                }
                break;
            case 1: //邮件
                $(".gm-mail").click()
                $("#m-sender").val(sample_cmds[index]["sender"])
                $("#m-title").val(sample_cmds[index]["title"])
                $("#m-content").val(sample_cmds[index]["content"])
                $("#m-item-list").val(sample_cmds[index]["item_list"])
                $(".gm-mail-execute").click()
                break;
            case 3: //邮件
                $(".gm-mail").click()
                var sub_index = 0
                var a = window.setInterval(()=>{
                    if(sub_index < Object.keys(sample_cmds[index]["content_list"]).length){
                        $("#m-sender").val(sample_cmds[index]["content_list"][sub_index]["sender"])
                        $("#m-title").val(sample_cmds[index]["content_list"][sub_index]["title"])
                        $("#m-content").val(sample_cmds[index]["content_list"][sub_index]["content"])
                        $("#m-item-list").val(sample_cmds[index]["content_list"][sub_index]["item_list"])
                        $(".gm-mail-execute").click()
                        sub_index ++;
                    }else{
                        window.clearInterval(a)
                    }

                },250)
                break;
            case 4 :  //你这场景中的位置
                

                window.get_player_pos($("#t-uid").val(),$("#t-region").val(),(scene_id,scene_pos)=>{
                    window.msg_box(`你UID:${$("#t-uid").val()}所在场景ID:${scene_id} 你所在场景中位置:x:${scene_pos[0]} y:${scene_pos[1]} z:${scene_pos[2]}`)
                })

                break;
            case 5:
                window.get_player_pos($("#t-uid").val(),$("#t-region").val(),(scene_id,scene_pos)=>{
                    var target_uid =$("#t-target-uid").val()
                    save_cookies()
                    window.msg_box(`你UID:${$("#t-uid").val()}所在场景ID:${scene_id} 你所在场景中位置:x:${scene_pos[0]} y:${scene_pos[1]} z:${scene_pos[2]} : 目标将${target_uid}被传送`)
                    
                    
                    post_json("/api/gmTalk",
                    {
                        "uid":$("#t-target-uid").val(),
                        "msg":`goto ${scene_pos[0]} ${scene_pos[1]} ${scene_pos[2]}`,
                        "region":$("#m-region").val()
                    },
                    (data)=>{
                        console.info(data.msg)
                        if(data.retcode == 0){
                            for (var i=0;i<history_gm_talk_json.length;i++){
                                if (history_gm_talk_json[i] == readCookie("msg")){
                                    return;
                                }
                            }
                            
                            msg_box("操作完成!")
                        }else{
                            msg_box("操作失败! 信息:" +data["data"]["retmsg"])
                        }
                        
                    },
                    (data)=>{
                        console.info(data.responseJSON)
                        msg_box("操作失败!")
                    }
                    )
                })
                break;
            case 6:
                break;

//     {
//     "name": "获取自己所在场景和位置",
//     "type": 4
// },
// {
//     "name": "传送玩家到你的位置",
//     "type": 5
// },
// {
//     "name": "传送你到目标玩家的位置",
//     "type": 6
// },

        }

    }

    function save_gm_talk_history (gm_talk_msg){
        
        history_gm_talk_json[Object.keys(history_gm_talk_json).length] = gm_talk_msg
        history_gm_talk = JSON.stringify(history_gm_talk_json); 
        setCookie("history_gm_talk",history_gm_talk)
    
    }
    function clear_gm_talk_history (){
        setCookie("history_gm_talk","")
        location.reload()
    }
    function add_sample_cmds (json_data){
        $(".sample-commands-container .cmd-list").html("")
        for (var i = 0 ; i< Object.keys(json_data).length;i++){
            var dom_element =  $("<div></div>").text(json_data[i]["name"])
            dom_element.addClass("element_"+i)
            dom_element.click(sample_cmd_bt_click)
            $(".sample-commands-container .cmd-list").append(dom_element)
        }
    }
    function get_sample_cmds  (){
        $.ajax({
            url:"/api/getSampleCommands",
            data:JSON.stringify("{}") ,
            method:"post",
            dataType:"json",
            contentType:"application/json;charset=UTF-8",
            success: function (data) {
                if (typeof(data)=="object"){
                    sample_cmds = data
                }else if (typeof(data)=="string"){
                    sample_cmds = JSON.parse(data)
                    
                }else{
                    msg_box("QwQ返回了一堆乱七八糟的东西")
                }
                add_sample_cmds(sample_cmds) //添加样例命令到页面
                
            },
            error: function (data){
                msg_box("获取样例命令错误!")
                
            }
        })
    }
    function save_cookies(){
        var uid = $("#t-uid").val()

        var target_uid = $("#t-target-uid").val()
        var region = $("#t-region").val()
        var msg = $("#t-msg").val()
        $("#m-uid").val(uid)
        
        if(typeof(uid) != "undefined" && uid != ""){
            setCookie("uid",uid)  //设置Cookie 方便下次加载读取 
            window.get_login_info_by_uid(
                uid,
                (login_info)=>{
                    if (login_info["uid"] ==uid){
                        region = login_info["region"] //设置region
                        setCookie("region",region)
                        $("#t-region").val(region)
                        $("#m-region").val(region)
                        console.info(login_info)
                    }else{
                        msg_box("用户未在线")
                        setCookie("region","")
                        $("#t-region").val("")
                        $("#m-region").val("")
                        
                    }
                        
                }
            )
        }
        setCookie("target_uid",target_uid)

        setCookie("msg",msg)

        setCookie("item_list",$("#m-item-list").val())
        
        setCookie("sender",$("#m-sender").val())
        setCookie("content",$("#m-content").val())
        setCookie("title",$("#m-title").val())
    }
    function load_cookies(){
        var uid = readCookie("uid")
        var target_uid = readCookie("target_uid")
        var region = readCookie("region")
        var msg = readCookie("msg")
        var sender = readCookie("sender")
        var title = readCookie("title")
        var content = readCookie("content")
        var item_list =readCookie("item_list")
        history_gm_talk = readCookie("history_gm_talk")
        


        if(typeof(history_gm_talk) != "undefined" && history_gm_talk !=""){
            history_gm_talk_json = JSON.parse(history_gm_talk) 
        }
        if(typeof(uid) != "undefined"){
            $("#t-uid").val(uid)
            $("#t-target-uid").val(target_uid)
            
            $("#m-uid").val(uid)
            window.get_login_info_by_uid(
                uid,
                (login_info)=>{
                    if (login_info["uid"] ==uid){
                        region = login_info["region"] //设置region
                        $("#t-region").val(region) 
                        $("#m-region").val(region)
                        console.info(login_info)
                    }else{
                        setCookie("region","")
                        $("#t-region").val("") 
                        $("#m-region").val("")
                        msg_box("用户未在线")
                    }
                        
                }
            )

            
            
            
        }else {  //设置默认值
            $("#t-uid").val("")
            $("#t-target-uid").val("")
            $("#t-region").val("") 
            $("#m-uid").val("")
            $("#m-region").val("")
        }
        if(typeof(sender) != "undefine" && typeof(title) != "undefine"&&typeof(content) != "undefine"){
            $("#m-sender").val(sender)
            $("#m-title").val(title)
            $("#m-content").val(content)

        }else{
            $("#m-sender").val("派蒙")
            $("#m-title").val("奖励发放")
        }
        if(typeof(item_list) != "undefine"){
            $("#m-item-list").val(item_list)
        }
        if(typeof(msg) != "undefined"){
            $("#t-msg").val(msg)
        }
    }
    function load_gm_data(){
        
        load_cookies()
        get_sample_cmds()


    }



    $(".gm-talk").click(()=>{  //切换状态
        $(".gm-container").fadeIn(500)
        $(".mail-container").fadeOut(500)
        load_cookies()  
    })
    $(".gm-mail").click(()=>{
        $(".gm-container").fadeOut(500)
        $(".mail-container").fadeIn(500)
        load_cookies()  
    })
    //失去焦点保存数据
    $("#t-region").blur(save_cookies);
    $("#t-uid").blur(save_cookies);
    $("#t-target-uid").blur(save_cookies);
    $("#t-msg").blur(save_cookies);
    $("#m-uid").blur(()=>{
        save_cookies()
    });
    $("#m-title").blur(save_cookies);
    $("#m-content").blur(save_cookies);
    $("#m-sender").blur(save_cookies);
    $("#m-region").blur(save_cookies);
    $("#m-item-list").blur(save_cookies);


    $(".gm-talk-execute").click(()=>{//GM对话按钮按下
        save_cookies()
        var gmTalkData = {}
        var uid = $("#t-uid").val()
        var region = $("#t-region").val()
        var msg = $("#t-msg").val()
        gmTalkData["uid"] = uid
        gmTalkData["region"] = region
        gmTalkData["msg"] = msg
        post_json("/api/gmTalk",gmTalkData,(data)=>{
            console.info(data.msg)
            if(data.retcode == 0){
                for (var i=0;i<history_gm_talk_json.length;i++){
                    if (history_gm_talk_json[i] == readCookie("msg")){
                        return;
                    }
                }
                save_gm_talk_history(readCookie("msg"))
                msg_box("操作完成!")
            }else{
                msg_box("操作失败! 信息:" +data["data"]["retmsg"])
            }
            
        },
        (data)=>{
            console.info(data.responseJSON)
            msg_box("操作失败!")
        }
        )

       
    })
 
    $(".gm-mail-execute").click(()=>{ //发送邮件按钮按下
        save_cookies()
        var gmMailData={}
        gmMailData["uid"] = $("#m-uid").val()
        gmMailData["region"] = $("#m-region").val()
        gmMailData["sender"] = $("#m-sender").val()
        gmMailData["title"] = $("#m-title").val()
        gmMailData["content"] =  $("#m-content").val()
        gmMailData["item_list"] = $("#m-item-list").val()
        post_json("/api/sendMail",gmMailData,(data)=>{
            console.info(data.msg)
            if(data.retcode == 0){
                msg = undefined
                if(typeof(data["data"]["retmsg"]) == "undefined"){
                    msg = data["msg"]
                }else{
                    msg = data["data"]["retmsg"]
                }
                msg_box("操作完成!")
            }else{
                msg = undefined
                if(typeof(data["data"]["retmsg"]) == "undefined"){
                    msg = data["msg"]
                }else{
                    msg = data["data"]["retmsg"]
                }
                msg_box("操作失败! 信息:"  +msg)
            }
        },
        (data)=>{
            console.info(data.responseJSON)
            msg_box("操作失败!")
        }
        )
    })
    
    

    var cur_mode = readCookie("cur_mode")  //从Cookie读取 模式 
    if(typeof(cur_mode) != "undefined"){
        
        switch_mode(cur_mode)
    }
    load_gm_data() //从Cookie 读取各种信息并设置
    
    msg_box("加载完成!") //^.^ //试一下Toas
})