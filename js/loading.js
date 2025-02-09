window.onload = function () {

    const loading = document.querySelector('.loading');
    // loading.style.animation = '';
    setTimeout(function () {

        loading.style.animation = 'loading 4s normal';
        loading.style.animationFillMode = 'forwards';
        setTimeout(function () {
            window.location.href = "../account.html";
        }, 6500);
    }, 1000);


}
