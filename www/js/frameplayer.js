var FramePlayer = function(e, t) {
    this.divCont = document.getElementById(e), this.elem = e, this.jsonVideoSrc = this.divCont.getAttribute("data-vidsrc"), this.rate = 20, this.controls = !0, this.paused = !1, this.width = "480px", this.height = "320px", this.radius = null, this.setOptions(t), this.initializeRequestAnimationFrame()
};
FramePlayer.prototype.setOptions = function(e) {
    if ("rate" in e && (this.rate = e.rate), "controls" in e && (this.controls = e.controls), "autoplay" in e && (e.autoplay || (this.paused = !0)), "width" in e && (this.width = e.width), "height" in e && (this.height = e.height), "radius" in e) {
        var t = document.createElement("style");
        t.setAttribute("id", "style-" + this.elem), t.innerHTML = "#" + this.elem + ", .frames-" + this.elem + "{ border-radius: " + e.radius + "; overflow: hidden;}", document.head.appendChild(t)
    }
    this.divCont.style.width = this.width, this.divCont.style.height = this.height, this.controls && this.createControlBar()
}, FramePlayer.prototype.render = function(e, t) {
    var n, i, a = Date.now(),
        s = 1e3 / t.rate,
        r = -1,
        o = document.createElement("img");
    t.canvas = document.createElement("canvas"), t.context = t.canvas.getContext("2d"), t.divCont.appendChild(t.canvas);
    var l = function() {
        n = Date.now(), i = n - a, i > s && (a = n - i % s, t.paused || (r++, r >= e.frames.length && (r = 0), o.src = e.frames[r], t.context.drawImage(o, 0, 0, t.canvas.width, t.canvas.height))), window.requestAnimationFrame(l)
    };
    window.requestAnimationFrame(l)
}, FramePlayer.prototype.createControlBar = function() {
    var e = this,
        t = document.createElement("div");
    t.setAttribute("class", "fp-ctrl"), t.style.width = this.width;
    var n = document.createElement("button");
    n.setAttribute("id", "pause-" + e.elem), n.setAttribute("class", "fp-btn"), n.innerHTML = "Pause", n.addEventListener("click", function() {
        e.pause()
    }, !1), t.appendChild(n);
    var i = document.createElement("button");
    i.setAttribute("id", "play-" + e.elem), i.setAttribute("class", "fp-btn"), i.innerHTML = "Play", i.addEventListener("click", function() {
        e.resume()
    }, !1), t.appendChild(i), e.paused ? n.style.display = "none" : i.style.display = "none";
    for (var a = document.createElement("select"), s = ["normal", "grayscale", "sepia", "invert"], r = 0, o = s.length; o > r; r++) {
        var l = document.createElement("option");
        l.setAttribute("value", s[r]), l.innerHTML = s[r], a.appendChild(l)
    }
    a.setAttribute("id", "filter-" + e.elem), a.setAttribute("class", "fp-select"), a.addEventListener("change", function() {
        e.setFilter(this.value)
    }, !1), t.appendChild(a), this.divCont.appendChild(t)
}, FramePlayer.prototype.play = function() {
    this.getFile(this.jsonVideoSrc, this.render)
}, FramePlayer.prototype.resume = function() {
    var e = document.getElementById("play-" + this.elem),
        t = document.getElementById("pause-" + this.elem);
    e.style.display = "none", t.style.display = "block", this.paused = !1
}, FramePlayer.prototype.pause = function() {
    var e = document.getElementById("play-" + this.elem),
        t = document.getElementById("pause-" + this.elem);
    e.style.display = "block", t.style.display = "none", this.paused = !0
}, FramePlayer.prototype.setFilter = function(e) {
    var t = document.querySelector("#" + this.elem + " canvas");
    switch (e) {
        case "normal":
            t.setAttribute("class", "");
            break;
        case "grayscale":
            t.setAttribute("class", "fp-grayscale");
            break;
        case "sepia":
            t.setAttribute("class", "fp-sepia");
            break;
        case "invert":
            t.setAttribute("class", "fp-invert")
    }
}, FramePlayer.prototype.getFile = function(e, t) {
    var n = new XMLHttpRequest,
        i = this,
        a = document.createElement("p");
    if (!n) throw "Error loading file.";
    n.open("GET", e, !0), n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), n.send(null), n.onprogress = function() {
        a.innerHTML = "Loading...", a.setAttribute("class", "fp-loading"), i.divCont.appendChild(a)
    }, void 0 !== typeof n.onload ? n.onload = function() {
        i.divCont.removeChild(a), t(JSON.parse(this.responseText), i), n = null
    } : n.onreadystatechange = function() {
        4 === n.readyState && (i.divCont.removeChild(a), t(JSON.parse(this.responseText), i), n = null)
    }
}, FramePlayer.prototype.initializeRequestAnimationFrame = function() {
    for (var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(t) {
        var n = (new Date).getTime(),
            i = Math.max(0, 16 - (n - e)),
            a = window.setTimeout(function() {
                t(n + i)
            }, i);
        return e = n + i, a
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
        clearTimeout(e)
    })
};
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-32909284-1"]), _gaq.push(["_trackPageview"]),
    function() {
        var t = document.createElement("script");
        t.type = "text/javascript", t.async = !0, t.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
        var e = document.getElementsByTagName("script")[0];
        e.parentNode.insertBefore(t, e)
    }();
! function() {
    var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
        t = self.Prism = {
            util: {
                type: function(e) {
                    return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
                },
                clone: function(e) {
                    var n = t.util.type(e);
                    switch (n) {
                        case "Object":
                            var a = {};
                            for (var r in e) e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
                            return a;
                        case "Array":
                            return e.slice()
                    }
                    return e
                }
            },
            languages: {
                extend: function(e, n) {
                    var a = t.util.clone(t.languages[e]);
                    for (var r in n) a[r] = n[r];
                    return a
                },
                insertBefore: function(e, n, a, r) {
                    r = r || t.languages;
                    var i = r[e],
                        s = {};
                    for (var l in i)
                        if (i.hasOwnProperty(l)) {
                            if (l == n)
                                for (var g in a) a.hasOwnProperty(g) && (s[g] = a[g]);
                            s[l] = i[l]
                        }
                    return r[e] = s
                },
                DFS: function(e, n) {
                    for (var a in e) n.call(e, a, e[a]), "Object" === t.util.type(e) && t.languages.DFS(e[a], n)
                }
            },
            highlightAll: function(e, n) {
                for (var a, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; a = r[i++];) t.highlightElement(a, e === !0, n)
            },
            highlightElement: function(a, r, i) {
                for (var s, l, g = a; g && !e.test(g.className);) g = g.parentNode;
                if (g && (s = (g.className.match(e) || [, ""])[1], l = t.languages[s]), l) {
                    a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + s, g = a.parentNode, /pre/i.test(g.nodeName) && (g.className = g.className.replace(e, "").replace(/\s+/g, " ") + " language-" + s);
                    var o = a.textContent;
                    if (o) {
                        o = o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
                        var c = {
                            element: a,
                            language: s,
                            grammar: l,
                            code: o
                        };
                        if (t.hooks.run("before-highlight", c), r && self.Worker) {
                            var u = new Worker(t.filename);
                            u.onmessage = function(e) {
                                c.highlightedCode = n.stringify(JSON.parse(e.data), s), t.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, i && i.call(c.element), t.hooks.run("after-highlight", c)
                            }, u.postMessage(JSON.stringify({
                                language: c.language,
                                code: c.code
                            }))
                        } else c.highlightedCode = t.highlight(c.code, c.grammar, c.language), t.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, i && i.call(a), t.hooks.run("after-highlight", c)
                    }
                }
            },
            highlight: function(e, a, r) {
                return n.stringify(t.tokenize(e, a), r)
            },
            tokenize: function(e, n) {
                var a = t.Token,
                    r = [e],
                    i = n.rest;
                if (i) {
                    for (var s in i) n[s] = i[s];
                    delete n.rest
                }
                e: for (var s in n)
                    if (n.hasOwnProperty(s) && n[s]) {
                        var l = n[s],
                            g = l.inside,
                            o = !!l.lookbehind,
                            c = 0;
                        l = l.pattern || l;
                        for (var u = 0; u < r.length; u++) {
                            var p = r[u];
                            if (r.length > e.length) break e;
                            if (!(p instanceof a)) {
                                l.lastIndex = 0;
                                var f = l.exec(p);
                                if (f) {
                                    o && (c = f[1].length);
                                    var h = f.index - 1 + c,
                                        f = f[0].slice(c),
                                        d = f.length,
                                        m = h + d,
                                        y = p.slice(0, h + 1),
                                        b = p.slice(m + 1),
                                        w = [u, 1];
                                    y && w.push(y);
                                    var k = new a(s, g ? t.tokenize(f, g) : f);
                                    w.push(k), b && w.push(b), Array.prototype.splice.apply(r, w)
                                }
                            }
                        }
                    }
                return r
            },
            hooks: {
                all: {},
                add: function(e, n) {
                    var a = t.hooks.all;
                    a[e] = a[e] || [], a[e].push(n)
                },
                run: function(e, n) {
                    var a = t.hooks.all[e];
                    if (a && a.length)
                        for (var r, i = 0; r = a[i++];) r(n)
                }
            }
        },
        n = t.Token = function(e, t) {
            this.type = e, this.content = t
        };
    if (n.stringify = function(e, a, r) {
            if ("string" == typeof e) return e;
            if ("[object Array]" == Object.prototype.toString.call(e)) return e.map(function(t) {
                return n.stringify(t, a, e)
            }).join("");
            var i = {
                type: e.type,
                content: n.stringify(e.content, a, r),
                tag: "span",
                classes: ["token", e.type],
                attributes: {},
                language: a,
                parent: r
            };
            "comment" == i.type && (i.attributes.spellcheck = "true"), t.hooks.run("wrap", i);
            var s = "";
            for (var l in i.attributes) s += l + '="' + (i.attributes[l] || "") + '"';
            return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' + s + ">" + i.content + "</" + i.tag + ">"
        }, !self.document) return void self.addEventListener("message", function(e) {
        var n = JSON.parse(e.data),
            a = n.language,
            r = n.code;
        self.postMessage(JSON.stringify(t.tokenize(r, t.languages[a]))), self.close()
    }, !1);
    var a = document.getElementsByTagName("script");
    a = a[a.length - 1], a && (t.filename = a.src, document.addEventListener && !a.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll))
}(), Prism.languages.markup = {
    comment: /&lt;!--[\w\W]*?-->/g,
    prolog: /&lt;\?.+?\?>/,
    doctype: /&lt;!DOCTYPE.+?>/,
    cdata: /&lt;!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,
        inside: {
            tag: {
                pattern: /^&lt;\/?[\w:-]+/i,
                inside: {
                    punctuation: /^&lt;\/?/,
                    namespace: /^[\w-]+?:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
                inside: {
                    punctuation: /=|>|"/g
                }
            },
            punctuation: /\/?>/g,
            "attr-name": {
                pattern: /[\w:-]+/g,
                inside: {
                    namespace: /^[\w-]+?:/
                }
            }
        }
    },
    entity: /&amp;#?[\da-z]{1,8};/gi
}, Prism.hooks.add("wrap", function(e) {
    "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
}), Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//g,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
        inside: {
            punctuation: /[;:]/g
        }
    },
    url: /url\((["']?).*?\1\)/gi,
    selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
    property: /(\b|\B)[\w-]+(?=\s*:)/gi,
    string: /("|')(\\?.)*?\1/g,
    important: /\B!important\b/gi,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[\{\};:]/g
}, Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/gi,
        inside: {
            tag: {
                pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.css
        }
    }
}), Prism.languages.clike = {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    string: /("|')(\\?.)*?\1/g,
    "class-name": {
        pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
    "boolean": /\b(true|false)\b/g,
    "function": {
        pattern: /[a-z0-9_]+\(/gi,
        inside: {
            punctuation: /\(/
        }
    },
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    operator: /[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
}, Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|throw|catch|finally|null|break|continue)\b/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
}), Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
        lookbehind: !0
    }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/gi,
        inside: {
            tag: {
                pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.javascript
        }
    }
}), Prism.languages.bash = Prism.languages.extend("clike", {
    comment: {
        pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    string: {
        pattern: /("|')(\\?[\s\S])*?\1/g,
        inside: {
            property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g
        }
    },
    keyword: /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g
}), Prism.languages.insertBefore("bash", "keyword", {
    property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g
}), Prism.languages.insertBefore("bash", "comment", {
    important: /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g
});
var options1 = {
        rate: 30,
        controls: !1,
        autoplay: !0,
        width: "750px",
        height: "1334px",
        canvas: "750px"
    },
    options2 = {
        rate: 30,
        controls: !0,
        autoplay: !0,
        width: "750px",
        height: "1334px"
    },
    player1 = new FramePlayer("player1", options1);
player1.play();
var player2 = new FramePlayer("player2", options2);
player2.play();