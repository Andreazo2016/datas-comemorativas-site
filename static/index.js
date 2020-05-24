
async function getDates({ year, month }) {

    try {
        const response = await fetch(`http://127.0.0.1:8000/dates-from/${year}/${month}`).then(data => data.json())

        return response

    } catch (error) {
        alert('Não foi possivel buscar informação. Tente novamente!')

        return false
    }


}
function utf8_decode(t) {
    return decodeURIComponent(escape(t))
}

function showInfoDate(info) {
    let lineInfo = ''
    for (const line of info) {
        lineInfo = lineInfo + `<li>${utf8_decode(line)}</li>`
    }
    return lineInfo
}

async function getHtmlToDisplay({ year, month }) {
    const data = await getDates({ year, month })

    if (data) {
        const { dates } = data
        let divis = ''
        for (const d of dates) {
            divis = divis + `
        <div id="info">
            <div id="day-info-week">
                <span>${d.day_number}</span>
                <p>${utf8_decode(d.day_week)}</p>
            </div>
            <div id="day-info">
                <ul>
                    ${
                showInfoDate(d.day_info)
                }
                </ul>
            </div>
        </div>
        `
        }
        return divis
    }
}

async function getSubmitInfo() {
    const form = document.querySelector('#form-info');
    form.addEventListener("submit", async function (e) {
        e.preventDefault()

        const month = document.getElementById("month-select").value
        const year = document.getElementById("year-select").value


        if (month === '0') {
            alert("Selecione um mês");
        } else if (year === '0') {
            alert("Selecione um ano");
        } else {
            const containerInfo = document.querySelector('#container-info');
            containerInfo.innerHTML = await getHtmlToDisplay({ year, month })
        }
    });
}

async function fillPage() {

    const today = new Date();

    const todayMonth = today.getMonth()
    const todayYear = today.getFullYear()


    months = [
        {
            value: 'janeiro',
            month: 'Janeiro'
        },
        {
            value: 'fevereiro',
            month: 'Fevereiro'
        },
        {
            value: 'marco',
            month: 'Março'
        },
        {
            value: 'abril',
            month: 'Abril'
        },
        {
            value: 'maio',
            month: 'Maio'
        },
        {
            value: 'junho',
            month: 'Junho'
        },
        {
            value: 'julho',
            month: 'Julho'
        },
        {
            value: 'agosto',
            month: 'Agosto'
        },
        {
            value: 'setembro',
            month: 'Setembro'
        },
        {
            value: 'outubro',
            month: 'Outubro'
        },
        {
            value: 'novembro',
            month: 'Novembro'
        },
        {
            value: 'dezembro',
            month: 'Dezembro'
        },
    ]
    years = []
    const monthSelect = document.querySelector('#month-select');
    const yaerSelect = document.querySelector('#year-select');

    let monthsToAdd = `<option value="${months[todayMonth].value}">${months[todayMonth].month}</option>`
    for (const index in months) {
        const m = months[index]
        
        if (Number(index) !== Number(todayMonth)) {
            monthsToAdd = monthsToAdd + (`<option value="${m.value}">${m.month}</option>`)
        }
    }
    let yaersToAdd = `<option value="${todayYear}">${todayYear}</option>`
    for (let year = 2000; year < 2030; year++) {
        if (todayYear !== year) {
            yaersToAdd = yaersToAdd + (`<option value="${year}">${year}</option>`)
        }
    }

    monthSelect.innerHTML = monthsToAdd
    yaerSelect.innerHTML = yaersToAdd


    const containerInfo = document.querySelector('#container-info');
    containerInfo.innerHTML = await getHtmlToDisplay({ year: todayYear, month: months[todayMonth].value })
}





(function () {
    fillPage()
    getSubmitInfo()
})()