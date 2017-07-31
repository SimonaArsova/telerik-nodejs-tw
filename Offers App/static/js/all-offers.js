/* global $ */

$(document).ready(() => {
    $('.find-best').on('click', () => {
        const url = `${document.location.origin}/api/offers`;
        console.log('here');
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: 'GET',
                success(response) {
                    resolve(response);
                },
            })
            .then((response) => {
                $('body').html(response);
            });
        });
    });
});
