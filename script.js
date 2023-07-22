const fetchData = async() => {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds')
        const data = await response.json()
        return data
        
    }
    catch (err) {
        console.log(err)
    }
}
fetchData()
const hide = () => document.getElementById('loading').style.display = 'none'
let cat = document.querySelector('.cat')
let footer = document.querySelector('footer')
let header = document.querySelector('header')
let mt = document.querySelector('#main-top')
let mb = document.querySelector('#main-bottom')
let input = document.querySelector('#input')
let link = document.querySelector('.link')

const renderData = async() => {
    const data = await fetchData()
    if(data) hide()
    const set = new Set(data)
    const showData = (set) => {
        for(let c of set) {
        ct = document.createElement('div')
        br = document.createElement('h4')
        br.textContent = c.name
        ct.className = 'ct'
        let str = `<p class='dt'>${c.life_span} years</p>
        <p class='dt'>${c.weight.metric} kgs</p>
        <p class='dt'>${c.weight.imperial} lbs</p>
        <p class='dt'>${c.origin}</p>`
        mb.appendChild(ct)
        ct.appendChild(br)
        ct.innerHTML += str
        ct.addEventListener('click', async () => {
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?&breed_ids=${c.id}&api_key=REPLACE_ME`)
            const image = await response.json()
            cat = document.createElement('div')
            nb = document.createElement('p')
            info = document.createElement('div')
            breed = document.createElement('h2')
            exit = document.createElement('button')
            content = document.createElement('div')
            nb.id = 'navBar'
            cat.className = 'cat'
            info.className = 'info'
            exit.textContent = '✕'
            breed.textContent = c.name
            content.className = 'content'
            exit.className = 'exitButton'
            if (c.cfa_url == undefined) c.cfa_url = 'no link available'
            if (c.vetstreet_url == undefined) c.vetstreet_url = 'no link available'
            let contentStr = `<img class='breed_image' src='${image[0].url}' alt='cat' />
            <p class='details'><b>Lifespan</b>: ${c.life_span} years</p>
            <p class='details'><b>Weight in kgs</b>: ${c.weight.metric} kgs</p>
            <p class='details'><b>Weight in lbs</b>: ${c.weight.imperial} lbs</p>
            <p class='details'><b>Origin</b>: ${c.origin}</p>
            <p class='details'><b>Temperament</b>: ${c.temperament}</p>
            <p class='details'><b>Wikipedia URL</b>: <a class='link' href='${c.wikipedia_url}' target='_blank'>${c.wikipedia_url}</a></p>
            <p class='details'><b>CFA URL</b>: <a id='cfa' class='link' href='${c.cfa_url}' target='_blank'>${c.cfa_url}</a></p>
            <p class='details'><b>Vetstreet URL</b> <a id='vetstreet'class='link' href='${c.vetstreet_url}' target='_blank'>${c.vetstreet_url}</a></p>
            <p class='details'><b>Description</b>: ${c.description}</p>`
            content.innerHTML += contentStr
            console.log('A small project made by Ansari.')
            nb.appendChild(exit)
            cat.appendChild(nb)
            info.appendChild(breed)
            info.appendChild(content)
            cat.appendChild(info)
            document.body.appendChild(cat)
            removeCat = () => cat.remove()
            header.addEventListener('click', removeCat)
            mt.addEventListener('click', removeCat)
            mb.addEventListener('click', removeCat, true)
            footer.addEventListener('click', removeCat)
            exit.addEventListener('click', removeCat)
        })
        }
    }
    showData(set)
    input.addEventListener('input', (search) => {
        mb.innerHTML = ''
        let x = search.target.value
        set.clear()
        for (let c of data) {
            let v = Object.values(c)
            v.forEach(e => {
                if (typeof e !== 'object') if(e.toString().toLowerCase().includes(x.toLowerCase())) set.add(c)
            })
        }
        names.textContent = 'Names'
        weight.textContent = 'Weight'
        ls.textContent = 'Lifespan'
        showData(set)
    }) 
    names.addEventListener('click', () => {
        mb.innerHTML = ''
        weight.textContent = 'Weight'
        ls.textContent = 'Lifespan'
        names.textContent.includes('⇩') ? names.textContent = 'Names ⇧' : names.textContent = 'Names ⇩'
        let temp = Array.from(set)
        set.clear()
        if (names.textContent.includes('⇧')) {
            temp.sort ((a, b) => {
                if (a.name < b.name) return -1
                if (a.name > b.name) return 1
                return 0
            })
        }
        else if (names.textContent.includes('⇩')) {
            temp.sort ((a, b) => {
                if (a.name < b.name) return 1
                if (a.name > b.name) return -1
                return 0
            })
        }
        temp.forEach(e => set.add(e))
        showData(set)
    })
    weight.addEventListener('click', () => {
        mb.innerHTML = ''
        names.textContent = 'Names'
        ls.textContent = 'Lifespan'
        weight.textContent.includes('⇩') ? weight.textContent = 'Weight ⇧' : weight.textContent = 'Weight ⇩'
        let temp = Array.from(set)
        set.clear()
        if(weight.textContent.includes('⇧')) {
            temp.sort((a, b) => {
                let x = a.weight.metric.split(' - ').reduce((a, c) => a + c / 2, 0)
                let y = b.weight.metric.split(' - ').reduce((a, c) => a + c / 2, 0)
                return x - y
            })
        }
        else if (weight.textContent.includes('⇩')) {
            temp.sort((a, b) => {
                let x = a.weight.metric.split(' - ').reduce((a, c) => a + c / 2, 0)
                let y = b.weight.metric.split(' - ').reduce((a, c) => a + c / 2, 0)
                return y - x
            })
        }
        temp.forEach(e => set.add(e))
        showData(set)
    })
    ls.addEventListener('click', (v) => {
        mb.innerHTML = ''
        names.textContent = 'Names'
        weight.textContent = 'Weight'
        ls.textContent.includes('⇩') ? ls.textContent = 'Lifespan ⇧' : ls.textContent = 'Lifespan ⇩'
        let temp = Array.from(set)
        set.clear()
        if(ls.textContent.includes('⇧')) {
            temp.sort((a, b) => {
                let x = a.life_span.split(' - ').reduce((a, c) => a + c / 2, 0)
                let y = b.life_span.split(' - ').reduce((a, c) => a + c / 2, 0)
                return x - y
            })
        }
        else if (ls.textContent.includes('⇩')) {
            temp.sort((a, b) => {
                let x = a.life_span.split(' - ').reduce((a, c) => a + c / 2, 0)
                let y = b.life_span.split(' - ').reduce((a, c) => a + c / 2, 0)
                return y - x
            })
        }
        temp.forEach(e => set.add(e))
        showData(set)
    })
}
renderData()