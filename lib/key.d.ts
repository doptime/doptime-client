declare class Key {
    key: string;
    private concatedKey;
    constructor(key: string);
    cat(subKey: string): void;
    protected getkey(): string;
}
