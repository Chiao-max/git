// 航旅纵横 - 首页广告模块移除
// 按渠道号（rpid）判断：指定渠道直接返回 404，让 App 首页广告模块不渲染
// 转换自 Loon 插件 Umetrip_remove_ads.lpx（作者：佚名）
const version = 'V1.0.1';
var ua = $request.headers.rpid || $request.headers.Rpid;
ua.includes("1000002") || ua.includes("1000019") ? $done({ status: "HTTP/1.1 404 Not Found" }) : $done({});
