let elements;
let stripe;

function onSubscribeNow() {
    document.getElementById('payPlace').classList.remove('d-none');
    fetch('/clientSecret').then(onSuccess, onFailed);
}

async function onSuccess (resp) {
    stripe = Stripe('pk_test_51PqCkEL1T1lNlbUcODlwQEw1J0dNQyIkhu65oEalvzh6tYp4prnFFftJ3YjW3SN0LsLwphB95IMUiLR00XNGDX0m00zsiJZKiN');
    const result = await resp.json();
    const {clientSecret} = result;
    const appearance = {};
    const options = {};
    elements = stripe.elements({ clientSecret , appearance });
    const paymentElement = elements.create('payment', options);
    paymentElement.mount('#payment-element');
    document.getElementById('main').classList.add('d-none');
}

function onFailed(err) {
    console.error(err);
}

async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: "http://localhost:3000/checkout",
        },
    });

    if (error.type === "card_error" ||
        error.type === "validation_error") {
        showMessage(error.message);
    } else {
        showMessage("An unexpected error occurred.");
    }

    setLoading(false);
}
                  
function setLoading(flag) {
    if (flag) {
        $('#loading').modal('show');
    } else {
        $('#loading').modal('hide');
    }
}

function showMessage(message) {
    console.error(message);
}
                  

function onLoad() {
    const btnSubscribeNow = document.getElementById('btnSubscribeNow');
    btnSubscribeNow.addEventListener('click', onSubscribeNow);

    document
      .querySelector("#payment-form")
      .addEventListener("submit", handleSubmit);
}

window.addEventListener('load', onLoad);


