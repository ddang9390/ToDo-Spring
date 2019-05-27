export class Item {
    public name: string;
    public desc: string;
    public time: Date;

    constructor(name: string, desc: string, time: Date){
        this.name = name;
        this.desc = desc;
        this.time = time;
    }
}
