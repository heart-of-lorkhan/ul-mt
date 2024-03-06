export const searchSelect = (function () {
  const init = function () {
    const $search = $('.js-search');
    const $searchSelect = $('.js-search-select');

    $searchSelect.on('click', () => {
      $search.toggleClass('show');
    });
  };

  return {
    init,
  };
})();
