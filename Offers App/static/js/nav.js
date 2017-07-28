// $(document).ready(() => {
//     $('#search-btn').on('click', () => {
//         const input = $('.search-input').val();

//         return new Promise((resolve, reject) => {
//             $.ajax({
//                 url: `offers/search`,
//                 method: 'GET',
//                 data: { title: input },
//                 success: ((data) => {
//                     alert(data);
//                 }),
//                 error: ((error) => {
//                     alert("error on search");
//                 }),
//             });
//         });
//     });
// });


$(document).ready(() => {
    $('.comment-btn').on('click', () => {
        $('.comment').css('display', 'block');
        $('.comment-btn').css('display', 'none');
    });
});
