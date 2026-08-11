// 微博开屏广告过滤 - wbpullad.lua 响应改写
// 仅移除 duration=5 的开屏广告（素材在 kadmimage /ad/pic/），
// 保留点赞特效/背景等 duration=0 功能素材
const body = $response.body;
if (!body) { $done({}); }
try {
  const obj = JSON.parse(body);
  if (obj && obj.cached_ad && Array.isArray(obj.cached_ad.ads)) {
    obj.cached_ad.ads = obj.cached_ad.ads.filter(function (a) {
      const d = Number(a && a.duration);
      const hasSplashCreative = /\/ad\/pic\//.test(JSON.stringify(a || {}));
      return !(d === 5 || (a && a.posid === 'pos5993fb44afa53') || hasSplashCreative);
    });
  }
  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}
