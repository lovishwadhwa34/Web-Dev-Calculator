let inputstr = '';
let alloutput = []

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        let op = btn.innerHTML;
        try {
            if (op === '=') {
                if (inputstr === '') {
                    document.querySelector('.input').value = ''
                }
                else {
                    alloutput.push(inputstr)
                    inputstr = eval(inputstr);
                    document.querySelector('.input').value = inputstr;
                }
            }
            else if (op === '%') {
                let lastOpIndex = -1;
                for (let i = inputstr.length - 1; i >= 0; i--) {
                    if ('*/+-'.includes(inputstr[i])) {
                        lastOpIndex = i;
                        break;
                    }
                }
                if (lastOpIndex === -1) {
                    document.querySelector('.input').value += op
                    inputstr = `(${inputstr}/100)`;
                } else {
                    document.querySelector('.input').value += op
                    let beforeOp = inputstr.slice(0, lastOpIndex + 1);
                    let lastNumber = inputstr.slice(lastOpIndex + 1);
                    inputstr = `${beforeOp}(${lastNumber}/100)`;
                }
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

document.getElementById('Back').addEventListener('click', () => {
    inputstr = inputstr.slice(0, -1);
    document.querySelector('.input').value = inputstr;
})

document.getElementById('AC').addEventListener('click', () => {
    inputstr = ""
    document.querySelector('.input').value = inputstr;
})

document.getElementById('His').addEventListener('click', () => {
    const aside = document.querySelector('aside');
    aside.classList.toggle('visible');

    if (aside.classList.contains('visible')) {
        aside.innerHTML = `
            <button id="close"><img src="Close white.png" alt="X"></button>
            <h2 style="margin: 20px;">History</h2>
            <div id='hiscont' style="padding: 15px;">
                ${alloutput.map(calc => `<div style="margin-bottom: 10px">${calc} = ${eval(calc)}</div>`).join('')}
            </div>
            <button id='Delete'><img src="Delete white.png"></button>`;
    }

    document.getElementById('close').addEventListener('click', () => {
        aside.classList.remove('visible');
    })
    document.getElementById('Delete').addEventListener('click', () => {
        alloutput = []
        document.getElementById('hiscont').innerHTML = ""
    });
});



