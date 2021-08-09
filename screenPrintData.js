function initDictContainer(wordDefinitions){
    const dictContainerEl = document.createElement('div');
    dictContainerEl.setAttribute('class',"dict-container");
    
    const phonetics = [];
    for (let i = 0; i < wordDefinitions["phonetics"].length; i++) {
        const element = array[i];
        
    }
    
    createPhoneticsElement(wordDefinitions["word"], )


}

function createPhoneticsElement(word, ...phoneticAndAudio) {// phoneticAndAudio = {phontics, audio}
    const phoneticsEl = document.createElement('div');
    const wordEl = document.createElement('span');
    wordEl.setAttribute('class', 'word');
    wordEl.innerText = word + "\t";
    phoneticsEl.appendChild(wordEl);
    
    for(let i = 0; i< phoneticAndAudio.length; i++){
        const phoneticWordEl = createNewwElement('span', phoneticAndAudio[i]["phonetic"]);
        phoneticsEl.appendChild(phoneticWordEl);
        const audioEl = createNewwElement('audio', phoneticAndAudio[i]["audio"]);
        phoneticsEl.appendChild(audioEl);
    }

    return phoneticsEl;

}

function createDefinitionsElement(definition, emaple, synonyms){
    const definitionEl = document.createElement('div');

    definitionEl.setAttribute('class',"definition");

}

function createNewElement(elType, elValue, elClass){
    const element = document.createElement(elType);
    switch(elType){
        case "div":
            if(elClass){
                element.setAttribute('class', elClass);
            }
            element.innerText = elValue;
            break;
        case "span":
            if(elClass){
                element.setAttribute('class', elClass);
            }
            element.innerText = elValue;
            break;
        case "li":
            element.innerText = elValue;
            break;
        case "audio":
            element.src = elValue;
            element.type = "audio/3gp";
            break;
        
    }
    return element;
}

/*
<div id="dict-container">
    <div id="phonetics">
        <span class="word">light</span>
        <span>/lait/</span>
        <audio src=""></audio>
    </div>
    <div class="definition-container">
        <div class="definition">
            provide with light or lightingdssdf 
        </div>
        <div class="example">
            provide with light or lightingdssdf 
        </div>
        <hr>
        <div class="definition">
            provide with light or lightingdssdf 
        </div>
        <div class="example">
            provide with light or lightingdssdf 
        </div>
        <ol class="synonyms">
            <li>bla</li>
            <li>bla</li>
            <li>bla</li>
            <li>bla</li>
            <li>bla</li>
*/


/*


function createPhoneticsElement(word, ...phoneticAndAudio) {// phoneticAndAudio = {phontics, audio}
    const phoneticsEl = document.createElement('div');
    const wordEl = document.createElement('span');
    wordEl.setAttribute('class', 'word');
    wordEl.innerText = word + "\t";
    phoneticsEl.appendChild(wordEl);
    
    for(let i = 0; i< phoneticAndAudio.length; i++){
        const phoneticWordEl = document.createElement('span');
        phoneticWordEl.innerText = `/${phoneticAndAudio[i]["phonetic"]}/"`;
        phoneticsEl.appendChild(phoneticAndAudio);

        const audioEl = document.createElement('audio');
        audioEl.src = phoneticAndAudio[i]["audio"];
        audio.type = "audio/3gp";
        phoneticsEl.appendChild(audioEl);
    }

    return phoneticsEl;

}


*/