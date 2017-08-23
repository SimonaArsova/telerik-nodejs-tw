/* global $ */
$(document).ready(() => {
    $('#change-avatar-btn').click((event) => {
        const $target = event.target;
        const username = $('#curent-user').text();
        const url = `/api/upload`;
        const postUrl = `/api/my-profile/edit/${username}/avatar`;

        requester.get(url)
            .then((response) => {
                // $('.upload-avatar').html(response);
                $('#uploadForm').attr('action', postUrl);
            });
    });
});
