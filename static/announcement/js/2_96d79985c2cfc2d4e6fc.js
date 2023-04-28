/*! Copyright © 2011 - 2022 miHoYo. All Rights Reserved */
(window.webpackJsonp = window.webpackJsonp || []).push([[2], {
    547: function(e, t, n) {
        "use strict";
        n.r(t);
        var i = n(556)
          , a = n(552);
        for (var s in a)
            ["default"].indexOf(s) < 0 && function(e) {
                n.d(t, e, (function() {
                    return a[e]
                }
                ))
            }(s);
        var r = n(188)
          , o = Object(r.a)(a.default, i.a, i.b, !1, null, null, null);
        o.options.__file = "src/main/home/home.vue",
        t.default = o.exports
    },
    549: function(e, t) {},
    551: function(e, t, n) {
        var i = {
            "./zh-cn": 546,
            "./zh-cn.js": 546
        };
        function a(e) {
            var t = s(e);
            return n(t)
        }
        function s(e) {
            if (!n.o(i, e)) {
                var t = new Error("Cannot find module '" + e + "'");
                throw t.code = "MODULE_NOT_FOUND",
                t
            }
            return i[e]
        }
        a.keys = function() {
            return Object.keys(i)
        }
        ,
        a.resolve = s,
        e.exports = a,
        a.id = 551
    },
    552: function(e, t, n) {
        "use strict";
        n.r(t);
        var i = n(553)
          , a = n.n(i);
        for (var s in i)
            ["default"].indexOf(s) < 0 && function(e) {
                n.d(t, e, (function() {
                    return i[e]
                }
                ))
            }(s);
        t.default = a.a
    },
    553: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(62)
          , a = c(n(548))
          , s = c(n(544))
          , r = c(n(545))
          , o = c(n(554));
        function c(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function u(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++)
                    n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        function l(e) {
            return function() {
                var t = e.apply(this, arguments);
                return new Promise((function(e, n) {
                    return function i(a, s) {
                        try {
                            var r = t[a](s)
                              , o = r.value
                        } catch (e) {
                            return void n(e)
                        }
                        if (!r.done)
                            return Promise.resolve(o).then((function(e) {
                                i("next", e)
                            }
                            ), (function(e) {
                                i("throw", e)
                            }
                            ));
                        e(o)
                    }("next")
                }
                ))
            }
        }
        n(555);
        var h = ["switch_task.mp3", "switch_type.mp3", "close_win.mp3", "open_win.mp3"]
          , d = null
          , m = null;
        t.default = {
            name: "home",
            data: function() {
                return {
                    hasClicked: !1,
                    list: [{
                        list: []
                    }],
                    type_list: [],
                    curType: 0,
                    curLink: -1,
                    activeAnn: 0,
                    isPre: "preview" === i.environment,
                    isAndroid: !1,
                    isIOS: !1,
                    isPc: !1,
                    isPs: !1,
                    lang: "zh-cn",
                    deviceType: "mobile",
                    soundBuf: new Array(h.length),
                    ready: !1,
                    showBanner: !1,
                    renderAnnPromise: null,
                    bannerLoaded: !1,
                    curAnn: -1,
                    tabHeight: 0,
                    btnExchange: !1,
                    direcType: 0,
                    hasGamepad: !1,
                    padType: 0,
                    focusMenu: !0,
                    reachBoundery: !0,
                    disableScrollMenu: !1,
                    interactiveList: [],
                    linkMap: [],
                    preY: 0,
                    seat: 1,
                    startMove: !1
                }
            },
            computed: {
                annList: function() {
                    return this.list.length ? this.list[this.curType].list : []
                },
                annDetail: function() {
                    return this.annList[this.activeAnn]
                },
                typeDetail: function() {
                    return this.type_list[this.curType]
                },
                langString: function() {
                    return this.lang.includes("ja") ? "Ja" : ""
                }
            },
            created: function() {
                var e = this;
                return l(regeneratorRuntime.mark((function t() {
                    var n, o, c, u, d;
                    return regeneratorRuntime.wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return e.registerSwBroadCast(),
                                e.bindEvents(),
                                e.deviceType = a.default.getDeviceType(),
                                n = s.default.parse(window.location.search),
                                o = n.lang,
                                c = n.platform,
                                u = n.uid,
                                d = n.region,
                                e.lang = (o instanceof Array ? o[0] : o || "zh-cn").toLowerCase(),
                                e.isAndroid = c && "android" === c.toLowerCase(),
                                e.isIOS = c && /ios|mac/i.test(c.toLowerCase()),
                                e.isPc = c && "pc" === c.toLowerCase(),
                                e.isPs = c && c.toLowerCase().includes("ps"),
                                e.$mia.updateUid({
                                    uid: u,
                                    region: d
                                }),
                                t.next = 14,
                                e.$nextTick();
                            case 14:
                                e.$mia.trackEvent("home", "visit", "version", "1.12.0");
                            case 15:
                                e.isPre && (document.title = e.lang),
                                e.isIOS || e.isAndroid ? e.setVolume() : miHoYoGameJSSDK.listenApiReady(e.setVolume),
                                r.default.fetchAudio(Object.assign({}, {
                                    audioList: h,
                                    apiBase: i.webBase
                                }, e.isIOS ? {
                                    platform: "ios"
                                } : {})).then((function(t) {
                                    e.soundBuf = t,
                                    console.log(e.soundBuf)
                                }
                                )).catch((function(e) {
                                    console.error(e.message)
                                }
                                )),
                                e.renderAnnPromise = e.getAnn(n).then(e.renderAnn).catch(function() {
                                    var t = l(regeneratorRuntime.mark((function t(n) {
                                        return regeneratorRuntime.wrap((function(t) {
                                            for (; ; )
                                                switch (t.prev = t.next) {
                                                case 0:
                                                    return console.error(n.message),
                                                    t.next = 3,
                                                    e.$nextTick();
                                                case 3:
                                                    e.handleReady(),
                                                    e.bindGamepadScroll();
                                                case 5:
                                                case "end":
                                                    return t.stop()
                                                }
                                        }
                                        ), t, e)
                                    }
                                    )));
                                    return function(e) {
                                        return t.apply(this, arguments)
                                    }
                                }());
                            case 19:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t, e)
                }
                )))()
            },
            mounted: function() {
                this.handleMounted(),
                this.getSildeHeight(),
                "development" === i.environment && miHoYoGameJSSDK.publish({
                    type: "enable_joypad_control",
                    data: 1
                })
            },
            beforeDestroy: function() {
                r.default.destroyVar(),
                miHoYoGameJSSDK.clear("jssdk_close"),
                miHoYoGameJSSDK.clear("jssdk_load_url"),
                d = null,
                m = null
            },
            methods: {
                bindEvents: function() {
                    var e = this;
                    miHoYoGameJSSDK.on("enable_joypad_control", (function(t) {
                        var n = t.data;
                        if (n instanceof Object) {
                            var i = n.num
                              , a = n.type
                              , s = n.exchange;
                            i ? (e.padType = a,
                            e.btnExchange = s && 1 === s,
                            e.bindGamepadEvents()) : e.removeGamepadEvents()
                        } else
                            1 === n ? e.bindGamepadEvents() : 0 === n && e.removeGamepadEvents()
                    }
                    )),
                    miHoYoGameJSSDK.on("jssdk_close", this.removeGamepadEvents),
                    miHoYoGameJSSDK.on("jssdk_load_url", this.removeGamepadEvents)
                },
                bindGamepadEvents: function() {
                    var e = this;
                    return l(regeneratorRuntime.mark((function t() {
                        return regeneratorRuntime.wrap((function(t) {
                            for (; ; )
                                switch (t.prev = t.next) {
                                case 0:
                                    return e.hasGamepad = !0,
                                    e.$gamepad.off(["connect", "disconnect", "press", "release", "hold"]),
                                    t.next = 4,
                                    e.$nextTick();
                                case 4:
                                    e.$gamepad.on("connect", (function(t) {
                                        var n = t.index;
                                        "standard" === t.mapping ? e.$gamepad.setCustomMapping("gamepad", {
                                            button_1: e.btnExchange ? 1 : 0,
                                            button_2: e.btnExchange ? 0 : 1
                                        }, n) : e.$gamepad.setCustomMapping("gamepad", {
                                            button_1: e.btnExchange ? 2 : 1,
                                            button_2: e.btnExchange ? 1 : 2,
                                            button_3: 0,
                                            button_4: 3
                                        }, n),
                                        e.hasGamepad = !0,
                                        e.curAnn = e.activeAnn,
                                        e.focusMenu = !0,
                                        e.resetLinks(),
                                        e.$nextTick(e.slideTab),
                                        console.log("controller " + t.index + " connected!")
                                    }
                                    )),
                                    e.$gamepad.on("disconnect", function() {
                                        var t = l(regeneratorRuntime.mark((function t(n) {
                                            return regeneratorRuntime.wrap((function(t) {
                                                for (; ; )
                                                    switch (t.prev = t.next) {
                                                    case 0:
                                                        return t.next = 2,
                                                        e.$nextTick();
                                                    case 2:
                                                        e.hasGamepad = !!e.$gamepad.num,
                                                        e.focusMenu = !1,
                                                        e.reachBoundery = !0,
                                                        e.resetLinks(),
                                                        console.log("controller " + n.index + " disconnected!");
                                                    case 7:
                                                    case "end":
                                                        return t.stop()
                                                    }
                                            }
                                            ), t, e)
                                        }
                                        )));
                                        return function(e) {
                                            return t.apply(this, arguments)
                                        }
                                    }()),
                                    e.$gamepad.on("press", "shoulder_top_left", (function() {
                                        e.curType && (e.playAudio(1),
                                        e.curType--,
                                        e.resetStatus(),
                                        e.handleRead(),
                                        e.curAnn = 0)
                                    }
                                    )),
                                    e.$gamepad.on("press", "shoulder_top_right", (function() {
                                        e.curType < e.type_list.length - 1 && (e.playAudio(1),
                                        e.curType++,
                                        e.resetStatus(),
                                        e.handleRead(),
                                        e.curAnn = 0)
                                    }
                                    )),
                                    e.$gamepad.on("press", "button_2", (function() {
                                        if (e.focusMenu)
                                            e.playAudio(0),
                                            e.focusMenu = !1,
                                            e.reachBoundery = !0,
                                            e.$nextTick(e.initArticle);
                                        else if (e.curLink > -1) {
                                            var t = e.interactiveList[e.curLink];
                                            t && t.click && ("a" === t.nodeName.toLowerCase() ? t.click() : (t.open = !t.open,
                                            e.checkBoundery(),
                                            e.$nextTick(e.initLinks)))
                                        }
                                    }
                                    )),
                                    e.$gamepad.on("press", "button_1", (function() {
                                        e.focusMenu ? e.handleClose() : (e.focusMenu = !0,
                                        e.curAnn = e.activeAnn,
                                        e.resetLinks())
                                    }
                                    )),
                                    e.$gamepad.on("press", "stick_axis_left", (function(t) {
                                        var n = t.value[0]
                                          , i = t.value[1];
                                        if (Math.abs(i).toFixed(2) >= Math.abs(n).toFixed(2)) {
                                            if (!e.focusMenu && e.reachBoundery) {
                                                var a = e.linkMap.length;
                                                a && (e.curLink < a - 1 && i > 0 ? e.switchLink(e.curLink + 1, "down") : e.curLink > 0 && i < 0 && e.switchLink(e.curLink - 1, "up"))
                                            }
                                        } else
                                            e.focusMenu && n > 0 ? (e.playAudio(0),
                                            e.focusMenu = !1,
                                            e.reachBoundery = !0,
                                            e.$nextTick(e.initArticle)) : !e.focusMenu && n < 0 && (e.focusMenu = !0,
                                            e.curAnn = e.activeAnn,
                                            e.resetLinks(),
                                            e.disableScrollMenu = !0,
                                            setTimeout((function() {
                                                e.disableScrollMenu = !1
                                            }
                                            ), 500))
                                    }
                                    )),
                                    e.ready && e.bindGamepadScroll();
                                case 12:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t, e)
                    }
                    )))()
                },
                bindGamepadScroll: function() {
                    this.hasGamepad && (this.$gamepad.addScrollState(this.getDom),
                    this.$gamepad.addScrollListener("ann", this.scrollLink, {
                        checkEnable: this.enableAnnScroll,
                        buffer: 2
                    }),
                    this.$gamepad.addScrollListener("menu", null, {
                        checkEnable: this.enableMenuScroll,
                        step: 10,
                        fixedStep: !0,
                        pressStep: this.tabHeight,
                        lockDuration: 400,
                        releaseCallback: this.handleReleaseMenu
                    }),
                    console.log("bind gamepad scroll"))
                },
                checkBoundery: function() {
                    var e = document.querySelector(".home__article-wrap");
                    if (e) {
                        var t = e.scrollTop
                          , n = !0;
                        e.scrollTo(0, t - 1),
                        e.scrollTop === t && (n = !1),
                        e.scrollTo(0, t + 1),
                        e.scrollTop > t ? (n && (this.reachBoundery = !1),
                        this.$gamepad.allowScroll.down = !0,
                        e.scrollTo(0, t)) : (this.reachBoundery = !0,
                        this.$gamepad.allowScroll.down = !1)
                    }
                },
                enableMenuScroll: function(e) {
                    if (this.disableScrollMenu)
                        return !1;
                    var t = e.value[1]
                      , n = !1;
                    return -1 === this.curAnn ? (this.curAnn = this.activeAnn,
                    n = !0) : this.curAnn < this.annList.length - 1 && t > 0 ? (this.annList.length > 5 && 1 === this.direcType && this.curAnn > 2 && (n = !0),
                    this.curAnn++,
                    this.direcType = 1) : this.curAnn > 0 && t < 0 && (this.annList.length > 5 && 2 === this.direcType && this.curAnn < this.annList.length - 3 && (n = !0),
                    this.curAnn--,
                    this.direcType = 2),
                    n
                },
                enableAnnScroll: function() {
                    var e = this.linkMap.length;
                    return !(this.reachBoundery && e > 1 && this.curLink > -1 && this.curLink < e - 1 && this.linkMap[this.curLink].min === this.linkMap[this.curLink + 1].min) && !(this.reachBoundery && e > 1 && this.curLink > 0 && this.curLink < e && this.linkMap[this.curLink].max === this.linkMap[this.curLink - 1].max)
                },
                getDom: function() {
                    return this.focusMenu ? "menu" : "ann"
                },
                slideTab: function() {
                    var e = document.querySelector(".home__menu");
                    if (e && this.hasGamepad) {
                        this.getSildeHeight();
                        var t = Math.max(Math.floor(this.tabHeight * (this.activeAnn - 3)), 0)
                          , n = e.scrollTop;
                        this.curAnn = this.activeAnn,
                        this.annList.length > 5 && (t > n ? (this.$gamepad.smoothDown(n, t, 10, e),
                        this.direcType = 1) : (this.$gamepad.smoothUp(n, t, 10, e),
                        this.direcType = 2))
                    }
                },
                handleReleaseMenu: function() {
                    this.activeAnn = this.curAnn,
                    this.handleRead()
                },
                scrollLink: function(e, t, n) {
                    var i = this;
                    return l(regeneratorRuntime.mark((function a() {
                        var s, r;
                        return regeneratorRuntime.wrap((function(a) {
                            for (; ; )
                                switch (a.prev = a.next) {
                                case 0:
                                    return i.reachBoundery = !n,
                                    a.next = 3,
                                    i.$nextTick();
                                case 3:
                                    s = i.linkMap.filter((function(t) {
                                        return t.min <= e && (t.max > e || t.max === e && t.min === t.max && t.index === i.curLink)
                                    }
                                    )),
                                    r = s.length ? s[0].index : -1,
                                    i.switchLink(r, t);
                                case 6:
                                case "end":
                                    return a.stop()
                                }
                        }
                        ), a, i)
                    }
                    )))()
                },
                removeGamepadEvents: function() {
                    this.hasGamepad = !1,
                    this.$gamepad.off(["connect", "disconnect", "press", "release", "hold"]),
                    this.resetLinks()
                },
                getSildeHeight: function() {
                    if (!this.tabHeight) {
                        var e = document.documentElement.style.fontSize;
                        e && (this.tabHeight = .44 * Number(e.split("px")[0]))
                    }
                },
                getTips: function(e) {
                    return r.default.getLocalText({
                        key: e
                    })
                },
                checkRedPoint: function() {
                    return this.type_list.filter((function(e) {
                        return e.remind_num
                    }
                    )).length > 0
                },
                checkExtraRedPoint: function() {
                    return this.type_list.filter((function(e) {
                        return e.extra_remind_num
                    }
                    )).length > 0
                },
                setVolume: function() {
                    miHoYoGameJSSDK.getGameVolume().then((function(e) {
                        console.log("volume:" + e),
                        r.default.setGain(e)
                    }
                    ))
                },
                playAudio: function(e) {
                    r.default.playAudio(this.soundBuf[e])
                },
                initInteractiveList: function() {
                    var e = document.querySelector(".home__article");
                    if (e) {
                        var t = Array.from(e.getElementsByTagName("a"))
                          , n = Array.from(e.getElementsByTagName("details"));
                        this.interactiveList = [].concat(u(t), u(n)).filter((function(e) {
                            return e.offsetTop
                        }
                        )).sort((function(e, t) {
                            return e.offsetTop - t.offsetTop
                        }
                        ))
                    }
                },
                initArticle: function() {
                    this.annList.length && (this.initImges(),
                    this.initLinks())
                },
                preloadBanner: function(e) {
                    var t = this
                      , n = []
                      , i = []
                      , a = e.length;
                    if (a) {
                        for (var s = function(a) {
                            n[a] = new Promise((function(n) {
                                i[a] = new Image,
                                i[a].onload = function() {
                                    n(i[a])
                                }
                                ,
                                i[a].onerror = function() {
                                    t.bannerLoaded = !0
                                }
                                ,
                                i[a].src = e[a]
                            }
                            ))
                        }, r = 0; r < a; r++)
                            s(r);
                        Promise.all(n).then((function() {
                            t.bannerLoaded = !0
                        }
                        ))
                    } else
                        this.bannerLoaded = !0
                },
                initImges: function() {
                    var e = this
                      , t = document.querySelector(".home__article");
                    if (t) {
                        var n = t.getElementsByTagName("img")
                          , i = []
                          , a = []
                          , s = n.length;
                        if (s)
                            for (var r = function(t) {
                                n[t].setAttribute("draggable", "false"),
                                e.hasGamepad && (i[t] = new Promise((function(i) {
                                    a[t] = new Image,
                                    a[t].onload = function() {
                                        e.initLinks(),
                                        i(a[t])
                                    }
                                    ,
                                    a[t].onerror = function() {
                                        e.initLinks()
                                    }
                                    ,
                                    a[t].src = n[t].src
                                }
                                )))
                            }, o = 0; o < s; o++)
                                r(o)
                    }
                },
                initLinks: function() {
                    var e = this;
                    this.initInteractiveList();
                    var t = document.querySelector(".home__article-wrap")
                      , n = document.querySelector(".home__article");
                    if (n && t) {
                        var i = Math.ceil(t.getClientRects()[0].height)
                          , a = Math.ceil(n.getClientRects()[0].height);
                        this.linkMap = [],
                        this.interactiveList.length && this.interactiveList.forEach((function(t, s) {
                            t.setAttribute("draggable", "false");
                            var r = void 0
                              , o = void 0
                              , c = t.href
                              , u = t.offsetTop + n.offsetTop + ("a" === t.nodeName.toLowerCase() ? t.offsetHeight : t.firstChild.offsetHeight);
                            r = s < e.interactiveList.length - 1 && u > (o = e.interactiveList[s + 1].offsetTop + n.offsetTop - i) ? o + .5 * (u - o) : u;
                            var l = s ? Math.max(e.linkMap[s - 1].max, t.offsetTop + n.offsetTop - i) : e.interactiveList[0].offsetTop + n.offsetTop - i;
                            l = Math.max(0, l),
                            r = Math.min(a + 3 * n.offsetTop - i + 3, r),
                            e.linkMap.push({
                                index: s,
                                href: c,
                                min: l,
                                max: Math.max(r, l)
                            })
                        }
                        ))
                    }
                },
                updateRedPoint: function(e, t) {
                    r.default.updateRedPoint(e, t)
                },
                consumeRemind: function() {
                    var e = this.annDetail.ann_id;
                    r.default.consumeRemind(Object.assign({}, {
                        apiBase: i.apiBase,
                        ann_id: e
                    }, this.isIOS ? {
                        platform: "ios"
                    } : {}))
                },
                consumeAlertAnn: function() {
                    var e = this.annDetail.ann_id;
                    r.default.consumeAlertAnn(Object.assign({}, {
                        apiBase: i.apiBase,
                        ann_id: e
                    }, this.isIOS ? {
                        platform: "ios"
                    } : {}))
                },
                handleRead: function() {
                    this.bannerLoaded || (this.showBanner = !1),
                    this.handleRedPoint(),
                    this.handleAlert(),
                    this.resetArticle()
                },
                handleRedPoint: function() {
                    this.annList.length && this.typeDetail.remind_num && this.annDetail.remind && (this.annDetail.remind = 0,
                    this.typeDetail.remind_num--,
                    this.annDetail.extra_remind ? (this.annDetail.extra_remind = 0,
                    this.typeDetail.extra_remind_num--,
                    this.checkExtraRedPoint() || this.updateRedPoint(this.checkRedPoint(), !1)) : this.checkRedPoint() || this.updateRedPoint(!1, !1),
                    this.consumeRemind())
                },
                handleAlert: function() {
                    this.annList.length && this.annDetail.alert && (this.annDetail.alert = 0,
                    this.consumeAlertAnn())
                },
                handleMounted: function() {
                    r.default.removeClose()
                },
                handleClose: function() {
                    document.onkeydown = null,
                    this.playAudio(2),
                    miHoYoGameJSSDK.closeWebview()
                },
                resetStatus: function() {
                    var e = document.querySelector(".home__menu");
                    e && (e.scrollTop = 0),
                    this.activeAnn = 0,
                    this.direcType = 0,
                    this.focusMenu = !0,
                    this.hasGamepad && this.$gamepad.initScroll()
                },
                resetArticle: function() {
                    var e = document.querySelector(".home__article-wrap");
                    e && (e.scrollTop = 0),
                    this.linkMap = [],
                    this.curLink = -1
                },
                switchLink: function(e, t) {
                    if (this.curLink !== e) {
                        if (e > -1 && this.curLink > -1 && "down" === t && this.curLink > e)
                            return;
                        if (e > -1 && this.curLink > -1 && "up" === t && this.curLink < e)
                            return;
                        this.curLink > -1 && this.interactiveList[this.curLink].classList.remove("active"),
                        e > -1 && this.interactiveList[e].classList.add("active"),
                        this.curLink = e
                    }
                },
                switchType: function(e) {
                    e.target.className.indexOf("home__tab") > -1 && e.target.dataset.index && (this.playAudio(1),
                    this.curType = Number(e.target.dataset.index),
                    this.resetStatus(),
                    this.handleRead(),
                    this.curAnn = -1,
                    this.$nextTick(this.initArticle))
                },
                switchAnn: function(e) {
                    if (!this.startMove && e.target.className.indexOf("home__intro") > -1 && e.target.dataset.index) {
                        this.playAudio(0);
                        var t = Number(e.target.dataset.index);
                        this.activeAnn = t,
                        this.handleRead(),
                        this.$nextTick(this.initArticle)
                    }
                },
                resetLinks: function() {
                    var e = this;
                    document.querySelector(".home__article") && this.interactiveList.length && this.interactiveList.forEach((function(t, n) {
                        e.interactiveList[n].classList.remove("active")
                    }
                    )),
                    this.hasGamepad && this.resetArticle()
                },
                overAnn: function(e) {
                    if (!this.startMove && (this.focusMenu = !0,
                    this.resetLinks(),
                    e.target.className.indexOf("home__intro") > -1 && e.target.dataset.index)) {
                        var t = Number(e.target.dataset.index);
                        this.curAnn = t
                    }
                },
                outAnn: function(e) {
                    e.target.className.indexOf("home__intro") > -1 && e.target.dataset.index && (this.curAnn = -1)
                },
                downAnn: function(e) {
                    this.startMove = !0,
                    this.preY = e.clientY
                },
                upAnn: function() {
                    this.startMove = !1,
                    this.preY = 0,
                    this.resetSeat()
                },
                moveAnn: function(e) {
                    if (this.startMove && this.annList.length > 5) {
                        this.curAnn = -1;
                        var t = document.querySelector(".home__menu");
                        if (!t)
                            return;
                        this.getSildeHeight();
                        var n = Math.floor(t.getClientRects()[0].height)
                          , i = this.tabHeight * (this.annList.length + .18) - n
                          , a = this.preY - e.clientY;
                        a < 0 && 0 === t.scrollTop ? this.seat >= .5 * n ? this.upAnn() : this.seat -= a : a > 0 && t.scrollTop >= i ? this.seat >= .5 * n ? this.upAnn() : (this.seat += a,
                        t.scrollTop += a) : t.scrollTop += a,
                        this.preY = e.clientY
                    }
                },
                downArticle: function(e) {
                    this.startMove = !0,
                    this.preY = e.clientY
                },
                upArticle: function() {
                    this.startMove = !1,
                    this.preY = 0
                },
                moveArticle: function(e) {
                    if (this.startMove) {
                        var t = document.querySelector(".home__article-wrap");
                        if (!t)
                            return;
                        var n = 2 * (this.preY - e.clientY);
                        t.scrollTop += n,
                        this.preY = e.clientY
                    }
                },
                resetSeat: function() {
                    this.seat < 10 ? this.seat = 1 : (this.seat -= 10,
                    setTimeout(this.resetSeat, 1))
                },
                handleLinkClick: function(e) {
                    var t = this;
                    "A" === e.target.nodeName && (this.hasClicked = !0,
                    setTimeout((function() {
                        t.hasClicked = !1
                    }
                    ), 1e3))
                },
                getAnn: function(e) {
                    return this.getAnnList(e).then(this.getAnnContent)
                },
                getAnnList: function(e) {
                    return o.default.getList({
                        data: e
                    }).then((function(e) {
                        return d = e,
                        e
                    }
                    ))
                },
                getAnnContent: function(e) {
                    return o.default.getContent(e).then((function(e) {
                        return m = e.contentData,
                        e.list
                    }
                    ))
                },
                renderAnn: function(e) {
                    var t = this;
                    return l(regeneratorRuntime.mark((function n() {
                        return regeneratorRuntime.wrap((function(n) {
                            for (; ; )
                                switch (n.prev = n.next) {
                                case 0:
                                    return console.log("### renderAnn ### list.t: ", e.t),
                                    t.list = e.list,
                                    t.type_list = e.type_list,
                                    t.curType = e.curType,
                                    t.activeAnn = e.activeAnn,
                                    t.updateRedPoint(t.checkRedPoint(), t.checkExtraRedPoint()),
                                    t.handleRedPoint(),
                                    e.alert && (t.handleAlert(),
                                    t.$nextTick(t.slideTab)),
                                    n.next = 10,
                                    t.$nextTick();
                                case 10:
                                    try {
                                        t.handleReady(),
                                        t.bindGamepadScroll(),
                                        t.preloadBanner(e.bannerArr),
                                        t.initImges()
                                    } catch (e) {
                                        console.error(e)
                                    }
                                case 11:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n, t)
                    }
                    )))()
                },
                handleReady: function() {
                    this.ready || (this.ready = !0)
                },
                registerSwBroadCast: function() {
                    var e = this;
                    "serviceWorker"in navigator && navigator.serviceWorker.ready.then((function() {
                        navigator.serviceWorker.addEventListener("message", (function(t) {
                            return e.handleSwBroadCast(t)
                        }
                        ))
                    }
                    ))
                },
                handleSwBroadCast: function(e) {
                    if ("mihoyo-sw-broadcast-update" === e.data.meta && "UPDATE_CACHE" === e.data.type) {
                        var t = e.data.payload
                          , n = void 0 === t ? {} : t
                          , i = n.updatedURL.split("?")[0];
                        console.log("response: ", n.response),
                        i.endsWith("/announcement/api/getAnnContent") && n.response && (m = n.response.data,
                        d ? this.renderAnn(o.default.formatData(r.default.listModify(d, m)), !0) : console.log("getAnnListRes err:", d))
                    }
                }
            }
        }
    },
    554: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }
          , a = n(550)
          , s = n(62)
          , r = u(n(191))
          , o = u(n(544))
          , c = u(n(545));
        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var l = o.default.parse(window.location.search)
          , h = l.from
          , d = l.preview_ann_id;
        t.default = {
            formatData: function(e) {
                return e.curType = 0,
                e.activeAnn = 0,
                e.bannerArr = [],
                e.list.forEach((function(t, n) {
                    var i = 0
                      , a = 0;
                    t.list.forEach((function(t, o) {
                        e.list[n].list[o].content = t.content.replace(/(&lt;t class="t_.*?&gt;)(.*?)(&lt;\/t&gt;)/gi, (function(t, n, i) {
                            var a = (n.includes("t_lc") ? 60 * (e.timezone || 8) : 480) - (0,
                            r.default)().utcOffset();
                            return "<span>" + (0,
                            r.default)(i).subtract(a, "m").format("YYYY/MM/DD HH:mm") + "</span>"
                        }
                        )),
                        "production" !== s.environment && "op" === h ? Number(d) === Number(t.ann_id) && (e.curType = n,
                        e.activeAnn = o,
                        e.alert = !1) : e.alert && Number(t.ann_id) === Number(e.alert_id) && (e.curType = n,
                        e.activeAnn = o),
                        t.remind && (i += 1),
                        t.extra_remind && (a += 1),
                        t.banner && e.bannerArr.push(t.banner)
                    }
                    )),
                    e.type_list[n].remind_num = i,
                    e.type_list[n].extra_remind_num = a
                }
                )),
                e
            },
            getAnn: function() {
                return c.default.fetchAnnouceNew({
                    environment: s.environment,
                    apiBase: s.apiBase,
                    cdnBase: s.cdnBase,
                    useFull: s.useFull
                }).then(this.formatData)
            },
            getList: function() {
                return c.default.fetchAnnouceList({
                    environment: s.environment,
                    apiBase: s.apiBase,
                    cdnBase: s.cdnBase
                })
            },
            getContent: function(e) {
                var t = this
                  , n = e.t
                  , i = e.static_sign;
                return new Promise((function(a, r) {
                    c.default.fetchAnnouceContent({
                        environment: s.environment,
                        apiBase: s.apiBase,
                        cdnBase: s.cdnBase,
                        t: n,
                        static_sign: i
                    }).then((function(n) {
                        a({
                            list: t.formatData(c.default.listModify(e, n)),
                            contentData: n
                        })
                    }
                    )).catch((function(e) {
                        r(e)
                    }
                    ))
                }
                ))
            },
            consumeRemind: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , t = function(e) {
                    return i({
                        game: "hk4e"
                    }, e)
                }
                  , n = function(e) {
                    return e
                };
                return (0,
                a.get)("/api/consumeRemind", i({}, e, {
                    loading: !1
                }), t, n)
            },
            consumeAlertAnn: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , t = function(e) {
                    return i({
                        game: "hk4e"
                    }, e)
                }
                  , n = function(e) {
                    return e
                };
                return (0,
                a.get)("/api/consumeAlertAnn", i({}, e, {
                    loading: !1
                }), t, n)
            }
        }
    },
    555: function(e, t, n) {},
    556: function(e, t, n) {
        "use strict";
        n.d(t, "a", (function() {
            return i
        }
        )),
        n.d(t, "b", (function() {
            return a
        }
        ));
        var i = function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("div", {
                staticClass: "home__bg",
                class: {
                    home__bg__ps4: e.isPs
                }
            }, [n("div", {
                staticClass: "home",
                class: [e.isPre ? "use" + e.langString + "WebFont" : e.isAndroid || e.isPc ? "use" + e.langString + "Font" : "use" + e.langString + "IOSFont", e.annList.length ? "" : "empty"],
                style: {
                    pointerEvents: e.hasGamepad ? "none" : "auto"
                }
            }, [n("div", {
                staticClass: "home__main"
            }, [n("div", {
                staticClass: "home__header-wrap"
            }, [n("div", {
                staticClass: "home__header"
            }, [n("ul", {
                staticClass: "home__tabs",
                class: {
                    "home__tabs-gamepad": e.hasGamepad,
                    home__tabs__xbox: !e.isPs && 2 === e.padType
                },
                on: {
                    click: e.switchType
                }
            }, e._l(e.type_list, (function(t, i) {
                return n("li", {
                    key: "type" + t.id,
                    staticClass: "home__tab",
                    class: {
                        "home__tab--active": e.curType === i
                    },
                    attrs: {
                        "data-index": i
                    }
                }, [t.remind_num ? n("div", {
                    staticClass: "home__tab__dot"
                }) : e._e(), e._v(" "), n("p", {
                    staticClass: "home__tab-text",
                    attrs: {
                        "data-index": i
                    },
                    domProps: {
                        innerHTML: e._s(t.mi18n_name)
                    }
                })])
            }
            )), 0), e._v(" "), e.isPs || e.hasGamepad ? e._e() : n("button", {
                staticClass: "home__close",
                on: {
                    click: e.handleClose
                }
            })])]), e._v(" "), e.annList.length ? n("div", {
                staticClass: "home__content"
            }, [n("div", {
                staticClass: "home__menu-wrap"
            }, [n("ul", {
                ref: "menu",
                staticClass: "home__menu home__swiper noScrollBar",
                attrs: {
                    id: "menu"
                },
                on: {
                    click: e.switchAnn,
                    mouseover: e.overAnn,
                    mouseout: e.outAnn,
                    mouseleave: e.upAnn,
                    mousedown: e.downAnn,
                    mouseup: e.upAnn,
                    mousemove: e.moveAnn
                }
            }, [n("li", {
                staticClass: "home__slide-seat",
                style: {
                    height: e.seat + "px"
                }
            }), e._v(" "), e._l(e.annList, (function(t, i) {
                return n("li", {
                    key: "ann" + t.ann_id,
                    staticClass: "home__slide"
                }, [n("div", {
                    staticClass: "home__menu-item",
                    class: {
                        "home__menu-item--unread": t.remind,
                        "home__menu-item--active": e.activeAnn === i,
                        "home__menu-item--current": "pc" === e.deviceType && e.curAnn === i
                    }
                }, [t.tag_icon ? n("img", {
                    staticClass: "home__tag",
                    attrs: {
                        src: t.tag_icon,
                        draggable: "false"
                    }
                }) : e._e(), e._v(" "), n("div", {
                    staticClass: "home__intro",
                    class: {
                        "home__intro--active": e.activeAnn === i
                    }
                }, [n("p", {
                    domProps: {
                        innerHTML: e._s(t.subtitle)
                    }
                })]), e._v(" "), n("div", {
                    staticClass: "home__intro--click",
                    class: {
                        "home__intro--current": "pc" === e.deviceType && e.curAnn === i && e.focusMenu
                    },
                    attrs: {
                        "data-index": i
                    }
                })])])
            }
            )), e._v(" "), n("li", {
                staticClass: "home__slide-seat",
                style: {
                    height: e.seat + "px"
                }
            })], 2)]), e._v(" "), n("div", {
                staticClass: "home__right",
                class: {
                    "home__right--active": !e.focusMenu && e.curLink < 0
                }
            }, [n("div", {
                ref: "ann",
                staticClass: "home__article-wrap",
                class: {
                    preventClick: e.hasClicked
                },
                attrs: {
                    id: "ann"
                },
                on: {
                    mousedown: e.downArticle,
                    mouseup: e.upArticle,
                    mouseleave: e.upArticle,
                    mousemove: e.moveArticle,
                    click: e.handleLinkClick
                }
            }, [e.annList.length ? n("div", {
                staticClass: "home__article"
            }, [n("h1", {
                staticClass: "home__title",
                domProps: {
                    innerHTML: e._s(e.activeAnn > -1 && e.annDetail.title)
                }
            }), e._v(" "), e.annDetail.banner ? n("img", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.showBanner,
                    expression: "showBanner"
                }],
                staticClass: "home__banner",
                attrs: {
                    src: e.annDetail.banner
                },
                on: {
                    load: function(t) {
                        e.showBanner = !0
                    }
                }
            }) : e._e(), e._v(" "), n("div", {
                domProps: {
                    innerHTML: e._s(e.annDetail.content)
                }
            })]) : e._e()]), e._v(" "), n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.hasGamepad,
                    expression: "hasGamepad"
                }],
                staticClass: "home__control",
                class: {
                    home__control__xbox: !e.isPs && 2 === e.padType,
                    home__control__ps5: 3 === e.padType
                }
            }, [n("p", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.focusMenu || e.curLink > -1,
                    expression: "focusMenu || curLink > -1"
                }],
                class: e.btnExchange ? "last" : "first"
            }, [e._v(e._s(e.focusMenu ? e.getTips("ok") : -1 === e.curLink ? "" : e.getTips("go")))]), e._v(" "), n("p", {
                class: e.btnExchange ? "first" : "last"
            }, [e._v(e._s(e.focusMenu ? e.getTips("close") : e.getTips("back")))])])])]) : e.ready ? n("div", {
                staticClass: "home__empty"
            }, [n("h1", [e._v(e._s(e.getTips("nodata")))]), e._v(" "), n("p", [e._v(e._s(e.getTips("somewhere")))])]) : e._e()])])])
        }
          , a = [];
        i._withStripped = !0
    }
}]);
