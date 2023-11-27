console.log("The site is working!");

const button = document.querySelector("button");
const input = document.querySelector('input');
const spanGeneratedTherapy = document.querySelector("span.generatedTherapy");
const loadingSpan = document.querySelector('span.loading');

button.addEventListener("click", function() {
    const storyDescriptionFromUser = input.value;
    loadingSpan.classList.remove('hidden');

    fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "wizard-vicuna-uncensored",
            prompt: input.value,
            stream: false
        })
    })
        .then(response => response.json())
        .then(responseText => {
            console.log(responseText);
            spanGeneratedTherapy.innerText = responseText.response;
            loadingSpan.classList.add('hidden');
        })
        .catch(error => {
            console.error("Error:", error);
        });
});
