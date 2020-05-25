document.addEventListener("DOMContentLoaded", event => {
    const parentContainer = document.getElementById("zoo");
    const form = document.getElementById("form");

    const formWidth = 300;
    const animalWidth = 260;
    let x = 0;
    let y = 0;

    parentContainer.addEventListener("click", function(evt) {
        form.classList.toggle("js-active");
        x = evt.offsetX;
        y = evt.offsetY;
        if (x > this.offsetWidth - formWidth - 10) {
            x = this.offsetWidth - formWidth - 10;
        }
        if (y > this.offsetHeight - form.offsetHeight - 10) {
            y = this.offsetHeight - form.offsetHeight - 10;
        }
        form.style = `top:${y}px;left:${x}px;width:${formWidth}px;`;
    });

    form.addEventListener("click", function(evt) {
        evt.stopPropagation();
    });
    form.addEventListener("submit", function(evt) {
        evt.preventDefault();
        form.classList.remove("js-active");
        const name = form.querySelector("#animalName").value;
        const type = form.querySelector("#animalType").value;
        const imagePath = `./images/${type}.png`;
        const sound = `./audio/${type}.mp3`;
        const animal = createAnimal(name, imagePath, sound);
        animal.createHTML();
    });

    function createAnimal(name, image, sound) {
        let animal = {
            name: name,
            image: image,
            sound: sound,
            parent: parentContainer,
            createHTML: function() {
                let animalArea = document.createElement("DIV");
                animalArea.classList.add("animal-area");
                animalArea.style = `top:${y}px;left:${x}px;`;
                let img = document.createElement("IMG");
                img.src = this.image;
                img.alt = this.name;
                img.classList.add("animal");
                img.style = `width:${animalWidth}px;`;
                let audio = new Audio(this.sound);
                img.addEventListener("click", function(evt) {
                    evt.stopPropagation();
                    audio.play();
                });
                let cage = document.createElement("DIV");
                cage.classList.add("cage");
                animalArea.append(cage);
                animalArea.append(img);
                this.parent.append(animalArea);
            },
        }
        return animal;
    }
});