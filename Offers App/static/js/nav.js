$(document).ready(() => {
    $('#search-btn').on('click', () =>{
        const input = $('.search-input').val();

        return new Promise((resolve, reject) => {
            $.ajax({
                url: `offers/search?title=${input}`,
                method: 'post',
            })
            // .then((response) => {
            //          console.log(response);
                    //  $('.search-results').html(response);
                    //  window.history.pushState(
                        //  'Search', 'Title', `/offers/search?title=${input}`
                        // );
                //  });
        });
    });
});
