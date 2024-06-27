export default class keyClass {
    private concatedKey: string;
    constructor(public key: string) {
        this.key = key;
        this.concatedKey = "";
    }

    public cat(subKey: string) {
        if (!subKey) return;
        this.concatedKey = `${this.key}:${subKey}`;
    }
    protected getkey(): string {
        var retkey = this.concatedKey || this.key;
        if (!!this.concatedKey) {
            this.concatedKey = "";
        }
        return retkey;
    }
}
