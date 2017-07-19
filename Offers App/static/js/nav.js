$(function() {
    $('.dropdown .dropdown-toggle').on('click', function () {
        var $this = $(this);
        $('.dropdown .dropdown-list').css('display', 'none');
        var $list = $this.next('.dropdown-list');
        $list.css('display', 'block');
    });
});