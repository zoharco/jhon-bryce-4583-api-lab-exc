//TODO: fill this file
function init() {
    populateLangs();
    const $clickButtoElement = document.querySelector('#search');
    $clickButtoElement.addEventListener("click", buttonSearchClicked);
}

async function populateLangs() {
    const lang_url = "/api/v2/langs"; //language url
    const response = await fetch(lang_url);
    const data = await response.json();
    const $supportedLanguagesDropDown = document.querySelector("#supported-langs");
    let option;
    for (let key in data) {
        option = document.createElement('option');
        option.value = key;
        option.textContent = data[key];
        $supportedLanguagesDropDown.appendChild(option);
    }
}


async function buttonSearchClicked() {
    const dicContainer = document.querySelector('#dict-container');
    // clearing last search result.
    if (dicContainer.children.length > 0) {
        dicContainer.innerHTML = '';
    }
    const dropdownValue = document.querySelector("#supported-langs").value;
    const serachFieldValue = document.querySelector('#lookup-field').value.trim();
    //
    const response = await fetch(`/api/v2/entries/${dropdownValue}/${serachFieldValue}`);
    const data = await response.json();
    createDictionaryContainer(data);
}

function createDictionaryContainer(data) {
    const dicContainer = document.querySelector('#dict-container');
    if (data.title) {
        dicContainer.appendChild(createNoResult(data));
    } 
    else {
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const element = data[key];
                // This if statement is for printing phonetics only once, Same phonetics in all data childs
                if (key == 0) {
                    const phonetics = createPhonetics(element.word, element.phonetics);
                    dicContainer.appendChild(phonetics);
                    const meanings = createMeaningsElement(element.meanings);
                    dicContainer.appendChild(meanings);
                }

            }
        }
    }
}

// Handling No Definitions Found By server 
// and show message to client.
function createNoResult(data) {
    const noResultEl = document.createElement('div');
    noResultEl.setAttribute('class', 'noResult');
    const titleEl = document.createElement('h2')
    titleEl.setAttribute('class', 'title');
    titleEl.append(data.title);
    noResultEl.appendChild(titleEl);

    const messageEl = document.createElement('p')
    messageEl.setAttribute('class', 'message');
    messageEl.append(data.message);
    noResultEl.appendChild(messageEl);

    const resolutionEl = document.createElement('p')
    resolutionEl.setAttribute('class', 'resolution');
    resolutionEl.append(data.resolution);
    noResultEl.appendChild(resolutionEl);
    return noResultEl;
}

function createMeaningsElement(meanings) {
    const meaningsEl = document.createElement('div');
    meaningsEl.setAttribute('class', 'meanings');

    for (const meaning of meanings) {
        const meaningEl = document.createElement('div');
        meaningEl.setAttribute('class', 'meaning');

        if (meaning.partOfSpeech) {
            const partOfSpeech = document.createElement('p');
            partOfSpeech.setAttribute('class', 'partOfSpeech');
            partOfSpeech.append(meaning.partOfSpeech);
            meaningEl.appendChild(partOfSpeech);
        }

        const definitions = createDefinitionsElement(meaning.definitions);
        meaningEl.appendChild(definitions);

        meaningsEl.appendChild(meaningEl);
    }
    return meaningsEl;
}

function createDefinitionsElement(definitions) {
    // definitions wrapper 
    const definitionsEl = document.createElement('div');
    definitionsEl.setAttribute('class', 'definition-container');

    for (const definition of definitions) {
        const definitionEl = document.createElement('div');
        definitionEl.setAttribute('class', 'definition');
        definitionEl.append(definition.definition);

        const exampleEl = document.createElement('div');
        exampleEl.setAttribute('class', 'example');
        exampleEl.append(definition.example);
        definitionEl.appendChild(exampleEl);
        definitionEl.append(document.createElement('hr'));

        if (definition.antonyms && definition.antonyms.length > 0) {
            const antonymsEl = document.createElement('ul');
            antonymsEl.setAttribute('class', 'antonyms');
            definition.antonyms.forEach(antonym => {
                const antonymEl = document.createElement('li');
                antonymEl.append(antonym);
                antonymsEl.appendChild(antonymEl);
            });
            definitionEl.appendChild(antonymsEl);
        }

        if (definition.synonyms && definition.synonyms.length > 0) {
            const synonymsEl = document.createElement('ol');
            synonymsEl.setAttribute('class', 'synonyms');
            definition.synonyms.forEach(synonym => {
                const synonymEl = document.createElement('li');
                synonymEl.append(synonym);
                synonymsEl.appendChild(synonymEl);
            });
            definitionEl.appendChild(synonymsEl);
        }
        definitionsEl.appendChild(definitionEl);
    }
    return definitionsEl;
}


function createPhonetics(word, phonetics) {
    // console.log("createPhonetics", phonetics);
    const phoneticsEl = document.createElement('div');
    phoneticsEl.setAttribute('class', 'phonetics');
    const wordEl = document.createElement('span');
    wordEl.setAttribute('class', 'word');
    wordEl.innerText = word;
    phoneticsEl.appendChild(wordEl);
    for (let i = 0; i < phonetics.length; i++) {
        // creating new phonetics element 
        const phoneticEL = document.createElement('span');
        phoneticEL.setAttribute('class', 'phonetic');
        // creating new audio element
        const audioEl = new Audio(phonetics[i]['audio']);

        audioEl.setAttribute('id', 'phoneticAudio');
        // audioEl.setAttribute('src', phonetics[i]['audio']);
        audioEl.setAttribute('type', 'audio/3gp');
        audioEl.setAttribute('controls', '');

        phoneticEL.append(phonetics[i]['text']);
        phoneticEL.appendChild(audioEl);
        phoneticsEl.appendChild(phoneticEL);
    }
    return phoneticsEl;
}
