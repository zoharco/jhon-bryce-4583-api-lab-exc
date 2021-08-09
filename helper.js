function Definition(value, example, synonyms) {
    this.value = value;
    this.example = example;
    this.synonyms = synonyms;
}

function Phonetic(text, audio){
    this.text = text;
    this.audio = audio;
}

function Meaning(partOfSpeach, definitions){
    this.partOfSpeach = partOfSpeach;
    this.definitions = definitions;
}
