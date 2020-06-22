(() => {
    const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
    puzzlePieces = document.querySelectorAll('.puzzle-image'),
    dropZones = document.querySelectorAll('.drop-zone'),
    gameBoard = document.querySelector(".puzzle-board");

let imageNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

    function changeImageSet() {

        imageNames.forEach((piece, index) => {
            puzzlePieces[index].src = `images/${piece + this.dataset.bgkey}.jpg`;
        });

        gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgkey}.jpg)`;
    } 

    function allowDrag(event) {
        console.log('started dragging an image: this one - ', event.target.id);

        event.dataTransfer.setData("draggedImg", this.id);
    }

    function allowDragOver(event) {
        event.preventDefault(); //for next week
        console.log('dragged something over me')
    }

    function allowDrop(event) {
        console.log('dropped something on me');

        let droppedImage = event.dataTransfer.getData("draggedImg", this.id);

        event.target.appendChild(document.querySelector(`#${droppedImage}`));
    }

    puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));
    puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

    for (let zone of dropZones) {
        zone.addEventListener('dragover', allowDragOver);
        zone.addEventListener('drop', allowDrop);
    }

    changeImageSet.call(puzzleButtons[0]); 
})();