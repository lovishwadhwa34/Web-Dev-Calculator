let inputstr = '';

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        let op = btn.innerHTML;
        try {
            if (op === '=') {
                inputstr = eval(inputstr);
                document.querySelector('.input').value = inputstr;
            }
            else {
                document.querySelector('.input').value += op;
                inputstr += op;
            }
        }
        catch (err) {
            document.querySelector('.input').value = 'Error';
            inputstr = '';
        }
    })
})