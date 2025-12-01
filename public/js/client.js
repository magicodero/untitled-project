const btnHacken = document.getElementById('btn-holz-hacken');
const holzAnzeige = document.getElementById('holz-anzeige');

const btnSteinBrechen = document.getElementById('btn-stein-brechen');
const steinAnzeige = document.getElementById('stein-anzeige');

btnHacken.addEventListener('click', () => {
    btnHacken.disabled = true;
    fetch('/api/hacken', { method: 'POST' })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            holzAnzeige.innerText = data.neueWerte.holz;
            holzAnzeige.style.color = '#2ecc71';
            setTimeout(() => holzAnzeige.style.color = '', 300);
        }
    })
    .finally(() => btnHacken.disabled = false);
});


//neu
btnSteinBrechen.addEventListener('click', () => {
    btnSteinBrechen.disabled = true;
    fetch('/api/steinbrechen', {method: 'POST'})
    .then(r => r.json())
    .then(data =>{
        if(data.success){
            steinAnzeige.innerText = data.neueWerte.stein;
            steinAnzeige.style.color = '#ecf0f1';
            setTimeout(() => steinAnzeige.style.color = '', 300);
        }
    })
    .finally(()=> btnSteinBrechen.disabled = false);
});
