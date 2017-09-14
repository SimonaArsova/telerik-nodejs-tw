$(document).ready(() => {
    $('#message-btn').on('click', (e) => {
        e.preventDefault();
        const username = $('.modal-title')[0].innerHTML.trim();
        const url = `${document.location.origin}/user/${username}/messages`;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: 'POST',
                data: $('#form').serialize(),
            });
        });

    });
});