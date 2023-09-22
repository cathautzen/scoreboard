/*
Denne kan kopieres fra din ToDo-app, og behøver kun få ændringer for at kunne virke her også.
Dette modul kan du bruge de steder du gerne vil
spørge brugeren om noget. F.eks. "Er du sikker? Ja/Nej"*/

export default class Dialog{
    constructor({questionText, trueButtonText, falseButtonText}) {
        this.questionText = questionText || "Er du sikker?";
        this.truebuttonText = trueButtonText || "Jada";
        this.falsebuttonText = falseButtonText || "niks!";

        this.dialog = undefined;
        this.truebutton = undefined;
        this.falsebutton = undefined;

        this.createDialog();
    }

    confirm(){
        return new Promise((resolve) => {
            this.dialog.showModal();

            this.truebutton.addEventListener('click', () => {
                resolve (true);
                this.destroy();
            });

            this.falsebutton.addEventListener('click', () => {
                resolve (false);
                this.destroy();
            })
        });
    }

    createDialog(){
        this.dialog = document.createElement('dialog');
        this.dialog.innerHTML = `
            <div class="dialog-question">${this.questionText}</div>
            <div class="dialog-button-group">
                <button class="dialog-button--false">${this.falsebuttonText}</button>
                <button class="dialog-button--true">${this.truebuttonText}</button>
            </div>
        `;
        this.truebutton = this.dialog.querySelector('.dialog-button--true');
        this.falsebutton = this.dialog.querySelector('.dialog-button--false');

        this.dialog.addEventListener('click', (e) => {
            if(e.target === this.dialog){
                this.destroy();
            }
        });

        document.body.appendChild(this.dialog);
    }

    destroy(){
        document.body.removeChild(this.dialog);
        delete this;
    }
}