// /* globals $ */
// $('document').ready((req, res) => {
//     const file = $('#file');
//     const currentPath = window.location.pathname;
//     const numberOfImages = 3;

//     file.on('change', () => {
//         const images = file[0].files;
//         const imgContainer = $('#imgContainer');
//         if (images.length > numberOfImages) {
//             file.val('');
//             imgContainer.empty();
//         } else {
//             showImage(file, imgContainer);
//         }
//     });

//     function showImage(input, imgContainer) {
//         const fileList = input[0];
//         if (fileList.files && fileList.files[0]) {
//             imgContainer.empty();
//             for (const image of fileList.files) {
//                 const fileReader = new FileReader();
//                 fileReader.onload = function(e) {
//                     $('<img>')
//                         .attr('class', 'offer-image')
//                         .attr('src', e.target.result)
//                         .addClass('img-thumbnail')
//                         .appendTo(imgContainer);
//                 };
//                 fileReader.readAsDataURL(image);
//             }
//         }
//     }
// });
