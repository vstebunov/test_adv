function getOnBoard() {
    document.getElementById('screen1').classList.add('d-none');
    document.getElementById('screen2').classList.remove('d-none');
}

function onNext() {
    $('.carousel').carousel('next');
    $('.carousel').carousel('pause');
}

function sendLogin() {
    const noServerAlert = document.getElementById('noServerAlert');
    if (!noServerAlert.classList.contains('d-none')) {
        noServerAlert.classList.add('d-none');
    }

    const wrongPassword = document.getElementById('wrongPassword');
    if (!wrongPassword.classList.contains('d-none')) {
        wrongPassword.classList.add('d-none');
    }

    const loginname = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
              loginname,
              password
        })
    }).then(onSuccessLogin, onFailedLogin);
}

async function onSuccessLogin(result) {
    const body = await result.json();
    if (body.status === 'wrong password') {
        const wrongPassword = document.getElementById('wrongPassword');
        wrongPassword.classList.remove('d-none');
        return;
    }
    if (body.status === 'ok') {
        window.location.href = '/paywall?atest=1';
    }
}

function onFailedLogin(error) {
    const noServerAlert = document.getElementById('noServerAlert');
    noServerAlert.classList.remove('d-none');
    console.error(error);
}

function onLoad() {
    const btnGetOnBoard = document.getElementById('btnGetOnBoard');
    btnGetOnBoard.addEventListener('click', getOnBoard);

    const btnNext = document.getElementById('btnNext');
    btnNext.addEventListener('click', onNext);
    $('.carousel').carousel('pause');

    const btnSendLogin = document.getElementById('btnSendLogin');
    btnSendLogin.addEventListener('click', sendLogin);
}

window.addEventListener('load', onLoad);


