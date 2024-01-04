window._ASL_load = function() {
    let d = WPD.dom;
    window.ASL.instances = {
        instances: [],
        get: function(b, a) {
            this.clean();
            if ("undefined" === typeof b || 0 == b) return this.instances;
            if ("undefined" === typeof a) {
                a = [];
                for (var c = 0; c < this.instances.length; c++) this.instances[c].o.id == b && a.push(this.instances[c]);
                return 0 < a.length ? a : !1
            }
            for (c = 0; c < this.instances.length; c++)
                if (this.instances[c].o.id == b && this.instances[c].o.iid == a) return this.instances[c];
            return !1
        },
        set: function(b) {
            if (this.exist(b.o.id, b.o.iid)) return !1;
            this.instances.push(b);
            return !0
        },
        exist: function(b, a) {
            this.clean();
            for (let c = 0; c < this.instances.length; c++)
                if (this.instances[c].o.id == b && ("undefined" === typeof a || this.instances[c].o.iid == a)) return !0;
            return !1
        },
        clean: function() {
            let b = [],
                a = this;
            this.instances.forEach(function(c, e) {
                0 == d(".asl_m_" + c.o.rid).length && b.push(e)
            });
            b.forEach(function(c) {
                "undefined" !== typeof a.instances[c] && (a.instances[c].destroy(), a.instances.splice(c, 1))
            })
        },
        destroy: function(b, a) {
            let c = this.get(b, a);
            if (!1 !== c)
                if (Array.isArray(c)) c.forEach(function(e) {
                        e.destroy()
                    }),
                    this.instances = [];
                else {
                    let e = 0;
                    this.instances.forEach(function(h, f) {
                        h.o.id == b && h.o.iid == a && (e = f)
                    });
                    c.destroy();
                    this.instances.splice(e, 1)
                }
        }
    };
    window.ASL.initialized = !1;
    window.ASL.initializeSearchByID = function(b) {
        let a = ASL.getInstances();
        if ("undefined" !== typeof b && "object" != typeof b)
            if ("undefined" !== typeof a[b]) {
                let e = [];
                e[b] = a[b];
                a = e
            } else return !1;
        let c = 0;
        a.forEach(function(e, h) {
            d(".asl_w_container_" + h).forEach(function(f) {
                var g = d(f).parent();
                g.is("a") && (f = document.createElement("div"), g = g.get(0),
                    f.innerHTML = g.innerHTML, g.replaceWith(f))
            });
            d(".asl_m_" + h).forEach(function(f) {
                let g = d(f);
                if ("undefined" != typeof g.get(0).hasAsl) return ++c, !0;
                f.hasAsl = !0;
                ++c;
                return g.ajaxsearchlite(e)
            })
        })
    };
    window.ASL.getInstances = function() {
        if ("undefined" !== typeof window.ASL_INSTANCES) return window.ASL_INSTANCES;
        let b = [];
        d(".asl_init_data").forEach(function(a) {
            if ("undefined" === typeof a.dataset.asldata) return !0;
            let c = WPD.Base64.decode(a.dataset.asldata);
            if ("undefined" === typeof c || "" == c) return !0;
            b[a.dataset.aslId] =
                JSON.parse(c)
        });
        return b
    };
    window.ASL.initialize = function(b) {
        if ("undefined" == typeof ASL.version) return !1;
        if (window.IntersectionObserver)
            if (ASL.script_async_load || ASL.init_only_in_viewport) {
                if (b = document.querySelectorAll(".asl_w_container"), b.length) {
                    let a = new IntersectionObserver(function(c) {
                        c.forEach(function(e) {
                            e.isIntersecting && (ASL.initializeSearchByID(e.target.dataset.id), a.unobserve(e.target))
                        })
                    });
                    b.forEach(function(c) {
                        a.observe(c)
                    })
                }
            } else ASL.initializeSearchByID(b);
        else ASL.initializeSearchByID(b);
        ASL.initializeMutateDetector();
        ASL.initializeHighlight();
        ASL.initializeOtherEvents();
        ASL.initialized = !0
    };
    window.ASL.initializeHighlight = function() {
        if (this.highlight.enabled) return this.highlight.data.forEach(function(b) {
            var a = "" != b.selector && 0 < d(b.selector).length ? b.selector : "article";
            a = 0 < d(a).length ? a : "body";
            var c = new URLSearchParams(location.search);
            c = c.get("s") || c.get("asl_highlight");
            d(a).unhighlight({
                className: "asl_single_highlighted"
            });
            null !== c && "" != c.trim() && (a = 0 < d(a).length ? a : "body", d(a).highlight(c.trim().split(" "), {
                element: "span",
                className: "asl_single_highlighted",
                wordsOnly: b.whole,
                excludeParents: ".asl_w, .asl-try"
            }), a = d(".asl_single_highlighted"), b.scroll && 0 < a.length && (a = a.offset().top - 120, c = d("#wpadminbar"), 0 < c.length && (a -= c.height()), a += b.scroll_offset, a = 0 > a ? 0 : a, d("html").animate({
                scrollTop: a
            }, 500)))
        }), !1
    };
    window.ASL.initializeOtherEvents = function() {
        let b, a = this;
        d("body").on("click touchend", "#menu-item-search, .fa-search, .fa, .fas, .fusion-flyout-menu-toggle, .fusion-main-menu-search-open, #search_button, .mini-search.popup-search, .icon-search, .menu-item-search-dropdown, .mobile-menu-button, .td-icon-search, .tdb-search-icon, .side_menu_button, .search_button, .raven-search-form-toggle, [data-elementor-open-lightbox], .elementor-button-link, .elementor-button, i[class*=-search], a[class*=-search]",
            function() {
                clearTimeout(b);
                b = setTimeout(function() {
                    a.initializeSearchByID()
                }, 300)
            });
        if ("undefined" != typeof jQuery) jQuery(document).on("elementor/popup/show", function() {
            setTimeout(function() {
                a.initializeSearchByID()
            }, 10)
        })
    };
    window.ASL.initializeMutateDetector = function() {
        let b;
        "undefined" != typeof ASL.detect_ajax && 1 == ASL.detect_ajax && (new MutationObserver(function() {
            clearTimeout(b);
            b = setTimeout(function() {
                ASL.initializeSearchByID()
            }, 500)
        })).observe(document.querySelector("body"), {
            subtree: !0,
            childList: !0
        })
    };
    window.ASL.ready = function() {
        if ("complete" === document.readyState || "loaded" === document.readyState || "interactive" === document.readyState) this.initialize();
        else d(document).on("DOMContentLoaded", this.initialize)
    };
    window.ASL.loadScriptStack = function(b) {
        let a;
        0 < b.length && (a = document.createElement("script"), a.src = b.shift().src, a.onload = function() {
            0 < b.length ? window.ASL.loadScriptStack(b) : window.ASL.ready()
        }, document.body.appendChild(a))
    };
    window.ASL.init = function() {
        ASL.script_async_load ? window.ASL.loadScriptStack(ASL.additional_scripts) :
            "undefined" !== typeof WPD.ajaxsearchlite && window.ASL.ready()
    };
    window.WPD.intervalUntilExecute(window.ASL.init, function() {
        return "undefined" != typeof window.ASL.version && "undefined" != d.fn.ajaxsearchlite
    })
};
(function() {
    "undefined" != typeof WPD && "undefined" != typeof WPD.dom ? window._ASL_load() : document.addEventListener("wpd-dom-core-loaded", window._ASL_load)
})();