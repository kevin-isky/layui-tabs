
; layui.define("view", function (e) {
    var jquery = layui.jquery
        , element = layui.element
        , setter = layui.setter
        , window_obj = jquery(window)
        , jquery_body = jquery("body")
        , container = jquery("#" + setter.container)
        , layui_show = "layui-show"
        , layui_this = "layui-this"
        , app_body = "#LAY_app_body"
        , layout_tabs = "layadmin-layout-tabs"
        , tabsbody_item = "layadmin-tabsbody-item"
        , side_shrink = "layadmin-side-shrink"
        , admin = {
            on: function (e, a) {
                return layui.onevent.call(this, setter.MOD_NAME, e, a)
            },
            tabsPage: {},
            tabsBody: function (e) {
                return jquery(app_body).find("." + tabsbody_item).eq(e || 0)
            },

            resize: function (e) {
                var a = layui.router()
                    , t = a.path.join("-");
                admin.resizeFn[t] && (window_obj.off("resize", admin.resizeFn[t]),
                    delete admin.resizeFn[t]),
                    "off" !== e && (e(),
                        admin.resizeFn[t] = e,
                        window_obj.on("resize", admin.resizeFn[t]))
            },
            closeThisTabs: function () {
                admin.tabsPage.index && jquery(_).eq(admin.tabsPage.index).find(".layui-tab-close").trigger("click")
            }
        }
        , F = admin.events = {
            rollPage: function (e, t) {
                var i = jquery("#tabsheader")
                    , n = i.children("li")
                    , l = (i.prop("scrollWidth"),
                        i.outerWidth())
                    , s = parseFloat(i.css("left"));
                if ("left" === e) {
                    if (!s && s <= 0)
                        return;
                    var r = -s - l;
                    n.each(function (e, t) {
                        var n = jquery(t)
                            , l = n.position().left;
                        if (l >= r)
                            return i.css("left", -l),
                                !1
                    })
                } else
                    "auto" === e ? !function () {
                        var e, r = n.eq(t);
                        if (r[0]) {
                            if (e = r.position().left,
                                e < -s)
                                return i.css("left", -e);
                            if (e + r.outerWidth() >= l - s) {
                                var o = e + r.outerWidth() - (l - s);
                                n.each(function (e, t) {
                                    var n = jquery(t)
                                        , l = n.position().left;
                                    if (l + s > 0 && l - s > o)
                                        return i.css("left", -l),
                                            !1
                                })
                            }
                        }
                    }() : n.each(function (e, t) {
                        var n = jquery(t)
                            , r = n.position().left;
                        if (r + n.outerWidth() >= l - s)
                            return i.css("left", -r),
                                !1
                    })
            },
            leftPage: function () {
                F.rollPage("left")
            },
            rightPage: function () {
                F.rollPage()
            },
            closeThisTabs: function () {
                var e = parent === self ? admin : parent.layui.admin;
                e.closeThisTabs()
            },
            closeOtherTabs: function (e) {
                var t = "pagetabs-remove";
                "all" === e ? (jquery(_ + ":gt(0)").remove(),
                    jquery(app_body).find("." + tabsbody_item + ":gt(0)").remove(),
                    jquery(_).eq(0).trigger("click")) : (jquery(_).each(function (e, i) {
                        e && e != admin.tabsPage.index && (jquery(i).addClass(t),
                            admin.tabsBody(e).addClass(t))
                    }),
                        jquery("." + t).remove())
            },
            closeAllTabs: function () {
                F.closeOtherTabs("all")
            }
        };

    element.on("tab(" + layout_tabs + ")", function (e) {
        admin.tabsPage.index = e.index
    }),
        element.on("nav(layadmin-pagetabs-nav)", function (e) {
            var a = e.parent();
            a.removeClass(layui_this),
                a.parent().removeClass(layui_show)
        });
    var _ = "#tabsheader>li";
    jquery_body.on("click", _, function () {
        var e = jquery(this)
            , t = e.index();
        admin.tabsPage.type = "tab",
            admin.tabsPage.index = t
    })
    jquery_body.on("click", "*[layadmin-event]", function () {
        var e = jquery(this)
            , t = e.attr("layadmin-event");
        F[t] && F[t].call(this, e)
    })
    e("admin", admin)
});
