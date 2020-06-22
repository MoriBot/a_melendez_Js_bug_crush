(() => {
        const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
            gameBoard = document.querySelector('.puzzle-board'),
            puzzlePieces = document.querySelectorAll('.puzzle-pieces img'),
            dropZones = document.querySelectorAll('.drop-zone'),
            zonePieces = document.querySelector('.puzzle-pieces'),
            resetButton = document.querySelector('.resetbutton');

    const pieceName = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

    function changeImageSet()
    {
        pieceName.forEach((piece, index) =>
        {
            puzzlePieces[index].src = `images/${piece + this.dataset.bgkey}.jpg`;
        }
    );

    gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgkey}.jpg)`;
    }

    function allowDrag(event)
    {
        console.log('started dragging - ', event.target.id);
        event.dataTransfer.setData("draggedImg", this.id);
    }

    function allowDragOver(event)
    {
        event.preventDefault();
        console.log('dragging over me');
    }

    function allowDrop(event)
    {
        if (this.children.length >= 1)
        {
            return;
        }

        console.log('dropped an image');
        let droppedImage = event.dataTransfer.getData("draggedImg");
        event.target.appendChild(document.querySelector(`#${droppedImage}`));
    }

    function resetPuzzle()
    {
    for (let loop = 0; loop < puzzlePieces.length; loop=loop+1)
        {
        zonePieces.appendChild(puzzlePieces[loop]);
        }
    }

    resetButton.addEventListener('click', resetPuzzle);

    puzzleButtons.forEach(button =>
    {
        button.addEventListener('click', changeImageSet);
        button.addEventListener('click', resetPuzzle);
    });

    puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

    dropZones.forEach(zone =>
    {
        zone.addEventListener('dragover', allowDragOver);
        zone.addEventListener('drop', allowDrop);
    });


    changeImageSet.call(puzzleButtons[0]);
})();