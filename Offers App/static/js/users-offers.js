$(document).ready(() => {
    $('.remove-offer-btn').on('click', () => {
        const url = $('.a').attr('href');
        const deletionUrl = `${document.location.origin}${url}`;
        console.log(deletionUrl);

        return new Promise((resolve, reject) => {
            $.ajax({
                url: deletionUrl,
                method: 'DELETE',
            });
        });
    });
});
