document.addEventListener("DOMContentLoaded", function() {
    const submitbtn = document.querySelector('.btn-submit');

    const pwd1 = document.getElementById('id_password1');
    const pwd2 = document.getElementById('id_password2');

    const pwdhelp = document.getElementById('password-mismatch-error');

    if(submitbtn && pwd1 && pwd2 && pwdhelp) {
        submitbtn.addEventListener('mouseenter', () => {
            if(pwd1.value !== pwd2.value) {
                pwdhelp.style.display = 'block';
            }
        })
        submitbtn.addEventListener('mouseleave', () => {
            pwdhelp.style.display = 'none';
        });
    }
})