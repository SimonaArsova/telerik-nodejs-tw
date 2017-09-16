/* global $ */
$(document).ready(() => {
    $('#change-avatar-btn').click((event) => {
        const username = $('#profile-username').text();
        const postUrl = `/api/my-profile/edit/${username}/avatar`;

        $('#uploadForm').attr('action', postUrl);
    });
});
