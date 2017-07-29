$(document).ready(() => {
    $('.remove-offer-btn').on('click', () => {
        const url = $('.a').attr('href');
        const deletionUrl = `${document.location.origin}/api${url}`;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: deletionUrl,
                method: 'DELETE',
            });
        });
    });
});
