// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },
    start() {
        wx.cloud.init({
            env: "sweet-jump-1gqjk1fd388a8ee2"
        })
        const db = wx.cloud.database()
        wx.getSetting({
            success(res) {
                // 已授权
                if (res.authSetting["scope.userInfo"]) {
                    // 进入下一步，比如【选择服务器】
                }
                // 显示授权按钮
                else {
                    let sysInfo = wx.getSystemInfoSync();
                    let button = wx.createUserInfoButton({
                        type: "text",
                        text: "微信登录",
                        style: {
                            left: sysInfo.windowWidth / 2 - 50,
                            top: sysInfo.windowHeight / 2 - 30,
                            width: 100,
                            height: 60,
                            backgroundColor: "#c7a976",
                            color: "#5c5941",
                            borderColor: "#5c5941",
                            textAlign: "center",
                            fontSize: 16,
                            borderWidth: 4,
                            borderRadius: 4,
                            lineHeight: 60,
                        }
                    });
                    button.onTap(function (res) {
                        if (res.userInfo) {
                            wx.cloud.callFunction({
                                name: 'login',
                                success: res => {
                                    var openid = res.openid
                                    db.collection('users').add({
                                        // data 字段表示需新增的 JSON 数据
                                        data: {
                                            "_openid": openid,
                                            "pass_time": 0,
                                            "passed": false,
                                            "score": 0
                                        },
                                        success: function (res) {
                                            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                                            console.log(res)
                                        }
                                    })

                                }
                            })
                            button.destroy();

                        } else {
                            wx.showModal({
                                title: "温馨提示",
                                content: "为了实现老师的用户量要求，请登陆，谢谢朋友们",
                                showCancel: false,
                            });
                        }
                    });
                    button.show();
                }
            }
        });

    },

    onLoad() {},

    toScene: function () {
        cc.director.loadScene("game")
    }

    // update (dt) {},
});