$(document).ready(() => {
    $('#message-btn').on('click', (e) => {
        const username = $('.modal-title')[0].innerHTML.trim();
        const url = `${document.location.origin}/user/${username}/messages`;

            $.ajax({
                url: url,
                method: 'POST',
                data: $('#form').serialize(),
            });
        e.preventDefault();
    });
});
