// 研究一覧を描画する共通スクリプト
// 各地域ページの <div id="research-list" data-region="asia"> のような
// data-region の値をキーにして、research-data.js のデータを一覧表示します。

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('research-list');
  if (!container) return;

  var region = container.getAttribute('data-region');
  var items = (window.RESEARCH_DATA && window.RESEARCH_DATA[region]) || [];

  if (items.length === 0) {
    container.innerHTML =
      '<div class="research-empty">まだ研究一覧に追加された項目はありません。<br>' +
      'research-data.js にリンクを追加すると、ここに表示されます。</div>';
    return;
  }

  container.innerHTML = items
    .map(function (item) {
      var title = (item.title || '').replace(/</g, '&lt;');
      var desc = (item.desc || '').replace(/</g, '&lt;');
      var url = item.url || '#';
      return (
        '<a class="research-card" href="' + url + '" target="_blank" rel="noopener">' +
        '<h3>' + title + '</h3>' +
        '<p>' + desc + '</p>' +
        '<span class="research-link">研究ページを見る →</span>' +
        '</a>'
      );
    })
    .join('');
});
