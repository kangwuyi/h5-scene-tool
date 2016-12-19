var navigatorUserAgent = navigator.userAgent,
    navigatorAppVersion = navigator.appVersion,
    navigatorPlatform = navigator.platform;
_.userAgent = {

    // win系列
    win32: navigatorPlatform === "Win32",
    ie: !!window.ActiveXObject || "ActiveXObject" in window,
    ieVersion: Math.floor((/MSIE ([^;]+)/.exec(navigatorUserAgent) || [0, "0"])[1]),

    // ios系列
    ios: (/iphone|ipad/gi).test(navigatorAppVersion),
    iphone: (/iphone/gi).test(navigatorAppVersion),
    ipad: (/ipad/gi).test(navigatorAppVersion),
    iosVersion: parseFloat(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigatorUserAgent) || [0, ''])[1])
        .replace('undefined', '3_2').replace('_', '.').replace('_', '')) || false,
    safari: /Version\//gi.test(navigatorAppVersion) && /Safari/gi.test(navigatorAppVersion),
    uiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigatorUserAgent),

    // 安卓系列
    android: (/android/gi).test(navigatorAppVersion),
    androidVersion: parseFloat("" + (/android ([0-9\.]*)/i.exec(navigatorUserAgent) || [0, ''])[1]),

    // chrome
    chrome: /Chrome/gi.test(navigatorUserAgent),
    chromeVersion: parseInt(( /Chrome\/([0-9]*)/gi.exec(navigatorUserAgent) || [0, 0] )[1], 10),

    // 内核
    webkit: /AppleWebKit/.test(navigatorAppVersion),

    // 其他浏览器
    uc: navigatorAppVersion.indexOf("UCBrowser") !== -1,
    Browser: / Browser/gi.test(navigatorAppVersion),
    MiuiBrowser: /MiuiBrowser/gi.test(navigatorAppVersion),

    // 微信
    MicroMessenger: navigatorUserAgent.toLowerCase().match(/MicroMessenger/i) === "micromessenger",

    // 触摸
    canTouch: "ontouchstart" in document,
    msPointer: window.navigator.msPointerEnabled
};

_.extend(_.userAgent, {
    iphone4: _.userAgent.iphone && screen.height === 480,
    iphone5: _.userAgent.iphone && screen.height === 568,
    iphone6: _.userAgent.iphone && screen.height > 568,
    mi4: /Mi 4LTE/gi.test(navigator.userAgent)
});


// 系统名
if (_.userAgent.iphone) {
    _.userAgent.systemName = "iphone";
}
else if (_.userAgent.ipad) {
    _.userAgent.systemName = "ipad";
}
else if (_.userAgent.ios) {
    _.userAgent.systemName = "ios-other"
}
else if (_.userAgent.android) {
    _.userAgent.systemName = "android";
}
else {
    _.userAgent.systemName = "other";
}

// 根据不同的操作系统添加类
_.userAgent.ios && document.documentElement.classList.add("ios");
_.userAgent.win32 && document.documentElement.classList.add("win32");
