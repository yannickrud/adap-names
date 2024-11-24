import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { StringArrayName } from "./StringArrayName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    protected nameAsArray: StringArrayName;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;

        const components = this.name.split(this.delimiter);
        this.nameAsArray = new StringArrayName(components, this.delimiter);
    }

    getNoComponents(): number {
        return this.nameAsArray.getNoComponents();
    }

    getComponent(i: number): string {
        return this.nameAsArray.getComponent(i);
    }
    setComponent(i: number, c: string) {
        this.nameAsArray.setComponent(i, c);
    }

    insert(i: number, c: string) {
        this.nameAsArray.insert(i, c);
    }
    append(c: string) {
        this.nameAsArray.append(c);
    }
    remove(i: number) {
        this.nameAsArray.remove(i);
    }

}
