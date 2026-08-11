// 微博开屏广告过滤 - wbpullad.lua / bootpreload 响应改写
// wbpullad.lua: 仅移除 duration=5 的开屏广告（素材在 kadmimage /ad/pic/），
//               保留点赞特效/背景等 duration=0 功能素材
// bootpreload /v2/ad/preload: ads 全部为开屏预加载广告（display_duration=5），直接清空
const body = $response.body;
if (!body) { $done({}); }
try {
  const url = $request.url || '';
  const obj = JSON.parse(body);
  if (/wbpullad\.lua/.test(url)) {
    if (obj && obj.cached_ad && Array.isArray(obj.cached_ad.ads)) {
      obj.cached_ad.ads = obj.cached_ad.ads.filter(function (a) {
        const d = Number(a && a.duration);
        const hasSplashCreative = /\/ad\/pic\//.test(JSON.stringify(a || {}));
        return !(d === 5 || (a && a.posid === 'pos5993fb44afa53') || hasSplashCreative);
      });
    }
  } else if (/\/v2\/ad\/preload/.test(url)) {
    if (obj && Array.isArray(obj.ads)) {
      obj.ads = [];
    }
  }
  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}
