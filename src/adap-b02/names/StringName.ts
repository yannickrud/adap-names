import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { StringArrayName } from "./StringArrayName";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected length: number = 0;
    protected nameAsArray: StringArrayName;

    constructor(other: string, delimiter?: string) {
        this.name = other;
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        }
        const components = this.name.split(this.delimiter);
        this.nameAsArray = new StringArrayName(components, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.nameAsArray.asString(delimiter);
    }

    public asDataString(): string {
        return this.nameAsArray.asDataString();
    }

    public isEmpty(): boolean {
        return this.nameAsArray.isEmpty();
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.nameAsArray.getNoComponents();
    }

    public getComponent(x: number): string {
        return this.nameAsArray.getComponent(x);
    }

    public setComponent(n: number, c: string): void {
        this.nameAsArray.setComponent(n, c);
    }

    public insert(n: number, c: string): void {
        this.nameAsArray.insert(n, c);
    }

    public append(c: string): void {
        this.nameAsArray.append(c);
    }

    public remove(n: number): void {
        this.nameAsArray.remove(n);
    }

    public concat(other: Name): void {
        this.nameAsArray.concat(other);
    }

}