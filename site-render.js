// SITE_DATA の内容をページに描画する共通スクリプト
// index.html と 各地域ページの両方から読み込まれます。
// 該当する要素がそのページに無ければ何もしないので、共通で使い回してOKです。

document.addEventListener('DOMContentLoaded', function () {
  var D = window.SITE_DATA;
  if (!D) return;

  function esc(s) {
    return (s || '').replace(/</g, '&lt;');
  }

  // ---- ヒーロー(トップページ) ----
  var heroEyebrow = document.getElementById('hero-eyebrow');
  var heroTitle = document.getElementById('hero-title');
  var heroBody = document.getElementById('hero-body');
  if (heroEyebrow && D.hero) heroEyebrow.textContent = D.hero.eyebrow;
  if (heroTitle && D.hero) heroTitle.textContent = D.hero.title;
  if (heroBody && D.hero) heroBody.textContent = D.hero.body;

  // ---- お知らせ ----
  var newsBox = document.getElementById('news-list');
  if (newsBox && D.news) {
    newsBox.innerHTML = D.news
      .map(function (n) {
        return (
          '<div class="news-row"><span class="news-date">' + esc(n.date) +
          '</span><a href="' + (n.url || '#') + '" class="news-title">' + esc(n.title) + '</a></div>'
        );
      })
      .join('');
  }

  // ---- 自由セクション(editor.htmlで追加したもの) ----
  var csRoot = document.getElementById('custom-sections');
  if (csRoot && D.customSections && D.customSections.length) {
    csRoot.innerHTML = D.customSections
      .map(function (sec) {
        var blocksHtml = (sec.blocks || [])
          .map(function (b) {
            if (b.type === 'heading') return '<h3 class="cs-heading">' + esc(b.text) + '</h3>';
            if (b.type === 'text') return '<div class="cs-text">' + (b.html || '') + '</div>';
            if (b.type === 'image') {
              var cap = b.caption ? '<figcaption class="cs-caption">' + esc(b.caption) + '</figcaption>' : '';
              return '<figure class="cs-image"><img src="' + (b.url || '') + '" alt="">' + cap + '</figure>';
            }
            if (b.type === 'divider') return '<hr class="cs-divider">';
            if (b.type === 'button') return '<p style="margin:14px 0 4px;"><a class="cs-button" href="' + (b.url || '#') + '">' + esc(b.label) + '</a></p>';
            return '';
          })
          .join('');
        return (
          '<section style="padding-top:0;">' +
          '<div style="display:flex; align-items:baseline; gap:12px; margin-bottom:20px;">' +
          '<h2 style="margin:0;">' + esc(sec.title) + '</h2>' +
          (sec.eyebrow ? '<span class="eyebrow">' + esc(sec.eyebrow) + '</span>' : '') +
          '</div><div class="overview-card">' + blocksHtml + '</div></section>'
        );
      })
      .join('');
  }

  // ---- サークル概要 ----
  var overviewLead = document.getElementById('overview-lead');
  var overviewExamples = document.getElementById('overview-examples');
  if (overviewLead && D.overview) overviewLead.textContent = D.overview.lead;
  if (overviewExamples && D.overview) {
    overviewExamples.innerHTML = D.overview.examples
      .map(function (ex) {
        return '<div class="example-row"><span class="example-dot"></span><p class="example-text">' + esc(ex) + '</p></div>';
      })
      .join('');
  }

  // ---- 活動内容 ----
  var pillarList = document.getElementById('pillar-list');
  if (pillarList && D.activities) {
    pillarList.innerHTML = D.activities.pillars
      .map(function (p, i) {
        return (
          '<div class="pillar-card"><div><span class="pillar-num">' + String(i + 1).padStart(2, '0') +
          '</span><div><span class="pillar-kicker">' + esc(p.kicker) + '</span><span class="pillar-label">' + esc(p.label) +
          '</span></div></div><p class="pillar-body">' + esc(p.body) + '</p></div>'
        );
      })
      .join('');
  }

  var extraGrid = document.getElementById('extra-grid');
  if (extraGrid && D.activities) {
    extraGrid.innerHTML = D.activities.extra
      .map(function (ea) {
        return '<div><p class="extra-lead">' + esc(ea.lead) + '</p><p class="extra-highlight">' + esc(ea.highlight) + '</p></div>';
      })
      .join('');
  }

  var recruitNote = document.getElementById('recruit-note');
  if (recruitNote && D.activities) recruitNote.textContent = D.activities.note;

  // ---- 活動地域カード ----
  Object.keys(D.regionCards || {}).forEach(function (key) {
    var titleEl = document.getElementById('region-card-title-' + key);
    var descEl = document.getElementById('region-card-desc-' + key);
    var card = D.regionCards[key];
    if (titleEl) titleEl.textContent = card.title;
    if (descEl) descEl.textContent = card.desc;
  });

  // ---- 参加案内・お問い合わせ ----
  var joinNote = document.getElementById('join-note');
  if (joinNote && D.join) joinNote.textContent = D.join.note;

  var contactList = document.getElementById('contact-list');
  if (contactList && D.contact) {
    contactList.innerHTML = D.contact
      .map(function (c) {
        return '<div class="contact-row"><span>' + esc(c.label) + '</span><a href="' + (c.url || '#') + '">' + esc(c.value) + '</a></div>';
      })
      .join('');
  }

  // ---- 地域ページのヒーロー(各地域ページ用) ----
  var regionHeroBlock = document.getElementById('region-hero');
  if (regionHeroBlock && D.regionHero) {
    var key = regionHeroBlock.getAttribute('data-region');
    var rh = D.regionHero[key];
    if (rh) {
      var enEl = document.getElementById('region-hero-en');
      var jpEl = document.getElementById('region-hero-jp');
      var introEl = document.getElementById('region-hero-intro');
      if (enEl) enEl.textContent = rh.en;
      if (jpEl) jpEl.textContent = rh.jp;
      if (introEl) introEl.textContent = rh.intro;
    }
  }
});
