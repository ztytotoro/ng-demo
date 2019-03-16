import { Subject } from 'rxjs';

enum ActionType {
    Back,
    Next
}

export class StoreSubject<T> extends Subject<T> {
    private history = [];
    private superNext: { (value: any): void; (arg0: any): void; };
    private step = -1;
    public next: (value: any) => void;
    constructor() {
        super();
        this.superNext = this.next.bind(this);
        this.next = (value: any) => {
            this.history.push({
                action: ActionType.Next,
                value
            });
            this.step = this.nextActions.length - 1;
            this.superNext(value);
        };
    }

    public back(steps = 1) {
        if (this.step <= 0) { return; }
        this.step = this.step - steps >= 0 ? this.step - steps : 0;
        this.history.push({
            action: ActionType.Back,
            value: this.nextActions[this.step]
        });
        this.superNext(this.nextActions[this.step]);
    }

    private get nextActions() {
        return this.history.filter(x => x.action === ActionType.Next).map(x => x.value);
    }
}

class Store {
    constructor({
        states = {}
    }) {}
}
