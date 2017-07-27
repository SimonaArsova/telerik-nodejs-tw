$(document).ready(() => {
    $('#search-btn').on('click', () =>{
        const pattern = $('#pattern').val();

        $('.search-results').empty();

        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/offers/search?title=${pattern}`,
                method: 'get',
            })
            .then((response) => {
                     console.log(response);
                     $('.search-results').html(response);
                     window.history.pushState(
                         'Search', 'Title', `/offers/search?title=${pattern}`
                        );
                 });
        });
    });
});
