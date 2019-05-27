export class Item {
    id: string;
    public name: string;
    public desc: string;
    public time: string;

    constructor(name: string, desc: string, time: string){
        this.name = name;
        this.desc = desc;
        this.time = time;
    }
}
