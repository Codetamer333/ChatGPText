const form = document.querySelector('form')
// const chatContainer = document.querySelector('#chat_container')
const botMessage = document.querySelector('#bot-message')

const generateUniqueId = () => {
    return `_${Math.random().toString(36).substr(2, 9)}`
}

const loader = (element) => {
    element.innerHTML = '<img src="./images/Aniki Hamster.gif" alt="loading" />'
}

const typeText = async (element, text) => {
    let i = 0
    while (i < text.length) {
        element.innerHTML += text.charAt(i)
        await new Promise((resolve) => setTimeout(resolve, 20))
        i++
    }
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)

    // to clear the textarea input 
    form.reset()

    // bot's chatstripe
    loader(botMessage)

    const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })

    if (response.ok) {
        const responseData = await response.json()
        const botResponse = responseData.bot.trim() // trims any trailing spaces/'\n' 

        botMessage.innerHTML = ''
        await typeText(botMessage, botResponse)
    } else {
        botMessage.innerHTML = "Something went wrong"
        console.log(await response.text())
    }
}

form.addEventListener('submit', handleSubmit)

form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e);
    }
})