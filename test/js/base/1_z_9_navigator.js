/**
 * 浏览器检测（Device/OS detection）
 * @param deviceFnc
 * @returns {{osType: (string|string|string), osName: (string|string|string|string|string), osVersion: (*|string), isWeiXin: (boolean|*), iswebView: (boolean|Array|{index: number, input: string}|*), support: {canTouch: (boolean|*), msPointer: *}}}
 */
function deviceDetection(deviceFnc) {
    var device = deviceFnc(navigator.userAgent, navigator.appVersion, navigator.platform);

    switch (true) {
        case device.android.length > 1:
            device.osType    = 'android';
            device.osName    = 'android';
            device.osVersion = device.android[2];
            break;
        case device.ios === true:
            device.osType = 'ios';
            switch (true) {
                case device.iphone.length > 1:
                    device.osVersion = device.iphone[2].replace(/_/g, '.');
                    device.osName    = 'iphone';
                    if (screen.height === 480) {
                        document.documentElement.classList.add("iphone4");
                    } else if (screen.height === 568) {
                        document.documentElement.classList.add("iphone5");
                    } else if (screen.height > 568) {
                        document.documentElement.classList.add("iphone6+");
                    }
                    break;
                case device.ipad.length > 1:
                    device.osVersion = device.ipad[2].replace(/_/g, '.');
                    device.osName    = 'ipad';
                    break;
                case device.ipod.length > 1:
                    device.osVersion = device.ipod[3] ? _this.ipod[3].replace(/_/g, '.') : null;
                    device.osName    = 'ipod';
                    break;
                default:
                    device.osVersion = 'undefined';
                    device.osName    = 'undefined';
            }
            // iOS 8+ changed UA
            if (device.ios && device.osVersion && navigator.userAgent.indexOf('Version/') >= 0) {
                if (device.osVersion.split('.')[0] === '10') {
                    device.osVersion = navigator.userAgent.toLowerCase().split('version/')[1].split(' ')[0];
                }
            }
            break;
        default:
            device.osType = 'undefined';
    }

    device.win32 && document.documentElement.classList.add("win32");

    if (device.osType !== 'undefined') {
        device.classNames.push(device.osType, device.osType + '-' + device.osVersion.split('.')[0], device.osType + '-' + device.osVersion.replace(/\./g, '-'));
        if (device.osType === 'ios') {
            var major = parseInt(device.osVersion.split('.')[0], 10);
            for (var i = major - 1; i >= 6; i--) {
                device.classNames.push('ios-gt-' + i);
            }
        }

    }
    device.classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
    if (device.pixelRatio >= 2) {
        device.classNames.push('retina');
    }
    if (device.classNames.length > 0) {
        for (var indexs = 0; indexs < device.classNames.length; indexs++) {
            document.documentElement.classList.add(device.classNames[indexs]);
        }
    }
    return {
        osType   : device.osType,
        osName   : device.osName,
        osVersion: device.osVersion,
        isWeiXin : device.MicroMessenger,
        //webview
        iswebView: (device.iphone || device.ipad || device.ipod) && navigator.userAgent.match(/.*AppleWebKit(?!.*Safari)/i) || false,
        support  : {
            // 触摸
            canTouch : device.canTouch,
            msPointer: device.msPointer
        }
    };
}
_k.deviceOs = deviceDetection(function (userAgent, appVersion, platform) {
    return {
        // win系列
        win32         : platform === "Win32",
        ie            : !!window.ActiveXObject || "ActiveXObject" in window,
        ieVersion     : Math.floor((/MSIE ([^;]+)/.exec(userAgent) || [0, "0"])[1]),
        // ios系列
        ios           : (/iphone|ipad|ipod/gi).test(appVersion),
        ipad          : userAgent.match(/(iPad).*OS\s([\d_]+)/) || false,
        ipod          : userAgent.match(/(iPod)(.*OS\s([\d_]+))?/) || false,
        iphone        : (!userAgent.match(/(iPad).*OS\s([\d_]+)/) && userAgent.match(/(iPhone\sOS)\s([\d_]+)/)) || false,
        safari        : /Version\//gi.test(appVersion) && /Safari/gi.test(appVersion),
        uiWebView     : /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent),
        // 安卓系列
        android       : userAgent.match(/(Android);?[\s\/]+([\d.]+)?/) || false,
        androidChrome : userAgent.toLowerCase().indexOf('chrome') >= 0,
        // chrome
        chrome        : /Chrome/gi.test(userAgent),
        chromeVersion : parseInt(( /Chrome\/([0-9]*)/gi.exec(userAgent) || [0, 0] )[1], 10),
        // 内核
        webkit        : /AppleWebKit/.test(appVersion),
        // 其他浏览器
        uc            : appVersion.indexOf("UCBrowser") !== -1,
        Browser       : / Browser/gi.test(appVersion),
        MiuiBrowser   : /MiuiBrowser/gi.test(appVersion),
        // 微信
        MicroMessenger: userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger",
        // pixelRatio
        pixelRatio    : window.devicePixelRatio || 1,
        // 触摸
        canTouch      : "ontouchstart" in document,
        msPointer     : window.navigator.msPointerEnabled,
        // 方法内用到的对象
        classNames    : [],
        osType        : '',
        osName        : '',
        osVersion     : [],
        mi4           : /Mi 4LTE/gi.test(navigator.userAgent)
    }
});
