// Denne fil styrer plus/minus knapperne ved hvert input-felt og tæller alle slag
// sammen til en total. Det bør også være denne fil der laver input-felterne og
// styrer knapperne "Start forfra" & "Reset"

import Dialog from "./dialog.js";
export default class scoreBoard{
    constructor() {
        const player = document.querySelector('.player');

        player.innerHTML = 'Cathrine';
        this.boardlist = document.querySelector('.boardlist');

        const num = 7;
        for (let i = 0; i < num; i++) {
        this.addMakeList();
        }

        const plus = document.querySelectorAll('.plus');
        this.counter = document.querySelectorAll('.counter');
        const minus = document.querySelectorAll('.minus');
        this.total = document.querySelector('.total');

        this.sum = 0;

        const resetBoard = document.querySelector('#resetboard');
        const resetAll = document.querySelector('#resetall');

        plus.forEach((p, i) => p.addEventListener('click', () => {
            this.counter[i].value = parseInt(this.counter[i].value) + 1;
            this.sum++;
            this.addUpdateSum();
        }));

        minus.forEach( (m, i) => m.addEventListener('click', () => {
            this.counter[i].value = parseInt(this.counter[i].value) - 1;
            this.sum--;
            this.addUpdateSum();
        }));

        resetBoard.addEventListener('click', (e) => this.resetBoardButton(e));
        resetAll.addEventListener('click', (e) => this.resetAllButton(e));
    }

    addUpdateSum (){
        this.total.innerHTML = this.sum;
    }

    addMakeList (){
        this.boardlist.innerHTML +=`
            <div class="input-group mb-3">
                <button class="btn btn-primary minus">-</button>
                <input type="number" class="form-control counter" value="0">
                <button class="btn btn-primary plus">+</button>
            </div>
        `;
    }

    async resetBoardButton(e){
        e.stopPropagation();
        const dialog = new Dialog({
            questionText: "Er du sikker på at du vil nulstille?",
            trueButtonText: "Ja",
            falseButtonText: "Nej",
        });

        const reset = await dialog.confirm();
        if(reset === true){
            this.resetView();
        }


    }

    async resetAllButton(e){
        e.stopPropagation();
        const dialog = new Dialog({
            questionText: "Vil du starte forfra?",
            trueButtonText: "Ja",
            falseButtonText: "Nej",
        });

        const reset = await dialog.confirm();
        if(reset === true){
            this.resetView();
        }


    }

    resetView () {
        this.sum = 0;
        this.addUpdateSum();
        this.counter.forEach(c => c.value = 0);
    }
}

