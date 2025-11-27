const btnHacken = document.getElementById('btn-holz-hacken');
const holzAnzeige = document.getElementById('holz-anzeige');

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
