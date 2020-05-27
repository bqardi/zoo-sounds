document.addEventListener("DOMContentLoaded", event => {
    const parentContainer = document.getElementById("zoo");
    const form = document.getElementById("form");

    const formWidth = 300;
    const animalWidth = 260;
    let x = 0;
    let y = 0;

    let zookeeper = {
        male: {
            audio: [
                "Cool",
                "Cough",
                "Hello_Long",
                "Hello_Question",
                "Hey",
                "OK",
                "Oups",
                "Really",
                "Sigh",
                "Sure_Thing",
                "Uhh",
                "Welcome",
                "Wow",
            ],
            getAudio: function() {
                const rnd = Math.floor(Math.random() * this.audio.length);
                return `./audio/VOICE_MALE_${this.audio[rnd]}.mp3`;
            }
        },
        female: {
            audio: [
                "Ahh",
                "Cool",
                "Cough",
                "Haha",
                "Hello",
                "Sigh",
                "Uhh",
                "Welcome",
                "Whats_Up",
                "Yahoo",
                "Yes_Sir",
            ],
            getAudio: function() {
                const rnd = Math.floor(Math.random() * this.audio.length);
                return `./audio/VOICE_FEMALE_${this.audio[rnd]}.mp3`;
            }
        },
    }

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
        let zookeeperObj;
        let zookeeperType = type.split("-");
        if (zookeeperType[0] == "zookeeper") {
            zookeeperObj = zookeeper[zookeeperType[1]];
        }
        const animal = createAnimal(name, imagePath, sound, zookeeperObj);
        animal.createHTML();
    });

    function createAnimal(name, image, sound, zookeeperType = undefined) {
        let animal = {
            name: name,
            image: image,
            sound: sound,
            zookeeper: zookeeperType,
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
                let audio = new Audio();
                const keeper = this.zookeeper;
                if (keeper == undefined) {
                    audio.src = this.sound;
                    let cage = document.createElement("DIV");
                    cage.classList.add("cage");
                    animalArea.append(cage);
                } else {
                    animalArea.classList.add("zookeeper");
                }
                img.addEventListener("click", function(evt) {
                    evt.stopPropagation();
                    if (keeper != undefined) {
                        audio.src = keeper.getAudio();
                    }
                    audio.play();
                });
                animalArea.append(img);
                this.parent.append(animalArea);
            },
        }
        return animal;
    }
});


// document.addEventListener("DOMContentLoaded", event => {
//     const parentContainer = document.getElementById("zoo");
//     const form = document.getElementById("form");

//     const formWidth = 300;
//     const animalWidth = 260;
//     let x = 0;
//     let y = 0;

//     let zookeeper = {
//         male: {
//             audio: [
//                 "Cool",
//                 "Cough",
//                 "Hello_Long",
//                 "Hello_Question",
//                 "Hey",
//                 "OK",
//                 "Oups",
//                 "Really",
//                 "Sigh",
//                 "Sure_Thing",
//                 "Uhh",
//                 "Welcome",
//                 "Wow",
//             ],
//             getAudio: function() {
//                 const rnd = Math.floor(Math.random() * this.audio.length);
//                 return `./audio/VOICE_MALE_${this.audio[rnd]}.mp3`;
//             }
//         },
//         female: {
//             audio: [
//                 "Ahh",
//                 "Cool",
//                 "Cough",
//                 "Haha",
//                 "Hello",
//                 "Sigh",
//                 "Uhh",
//                 "Welcome",
//                 "Whats_Up",
//                 "Yahoo",
//                 "Yes_Sir",
//             ],
//             getAudio: function() {
//                 const rnd = Math.floor(Math.random() * this.audio.length);
//                 return `./audio/VOICE_FEMALE_${this.audio[rnd]}.mp3`;
//             }
//         },
//     }

//     parentContainer.addEventListener("click", function(evt) {
//         form.classList.toggle("js-active");
//         x = evt.offsetX;
//         y = evt.offsetY;
//         if (x > this.offsetWidth - formWidth - 10) {
//             x = this.offsetWidth - formWidth - 10;
//         }
//         if (y > this.offsetHeight - form.offsetHeight - 10) {
//             y = this.offsetHeight - form.offsetHeight - 10;
//         }
//         form.style = `top:${y}px;left:${x}px;width:${formWidth}px;`;
//     });

//     form.addEventListener("click", function(evt) {
//         evt.stopPropagation();
//     });
//     form.addEventListener("submit", function(evt) {
//         evt.preventDefault();
//         form.classList.remove("js-active");
//         const name = form.querySelector("#animalName").value;
//         const type = form.querySelector("#animalType").value;
//         const imagePath = `./images/${type}.png`;
//         if (type == "zookeeper-male") {
//             const animal = createAnimal(name, imagePath, "");
//             const obj = animal.createHTML();
//             obj.parent.classList.add("zookeeper");
//             obj.img.addEventListener("click", function(evt) {
//                 evt.stopPropagation();
//                 let audio = new Audio(zookeeper.male.getAudio());
//                 audio.play();
//             });
//         } else if (type == "zookeeper-female") {
//             const animal = createAnimal(name, imagePath, "");
//             const obj = animal.createHTML();
//             obj.parent.classList.add("zookeeper");
//             obj.img.addEventListener("click", function(evt) {
//                 evt.stopPropagation();
//                 let audio = new Audio(zookeeper.female.getAudio());
//                 audio.play();
//             });
//         } else {
//             const sound = `./audio/${type}.mp3`;
//             const animal = createAnimal(name, imagePath, sound);
//             const obj = animal.createHTML();
//             let audio = new Audio(animal.sound);
//             obj.cage.classList.add("cage");
//             obj.img.addEventListener("click", function(evt) {
//                 evt.stopPropagation();
//                 audio.play();
//             });
//         }
//     });

//     function createAnimal(name, image, sound) {
//         let animal = {
//             name: name,
//             image: image,
//             sound: sound,
//             parent: parentContainer,
//             createHTML: function() {
//                 let animalArea = document.createElement("DIV");
//                 animalArea.classList.add("animal-area");
//                 animalArea.style = `top:${y}px;left:${x}px;`;
//                 let img = document.createElement("IMG");
//                 img.src = this.image;
//                 img.alt = this.name;
//                 img.classList.add("animal");
//                 img.style = `width:${animalWidth}px;`;
//                 let obj = new Object();
//                 let cage = document.createElement("DIV");
//                 animalArea.append(cage);
//                 animalArea.append(img);
//                 this.parent.append(animalArea);
//                 obj.parent = animalArea;
//                 obj.cage = cage;
//                 obj.img = img;
//                 return obj;
//             },
//         }
//         return animal;
//     }
// });