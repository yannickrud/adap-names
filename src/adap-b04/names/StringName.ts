import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { StringArrayName } from "./StringArrayName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    protected nameAsArray: StringArrayName;

    // class invariant 1: other is not null or undefined. <- checked in StringArrayName
    // class invariant 2: delimiter is not null or undefined. <- checked in abstract class
    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;

        const components = this.name.split(this.delimiter);
        this.nameAsArray = new StringArrayName(components, this.delimiter);
    }


    public getNoComponents(): number {
        return this.nameAsArray.getNoComponents();
    }

    // pre-condition: i is a valid index <- checked in StringArrayName
    public getComponent(i: number): string {
        return this.nameAsArray.getComponent(i);
    }

    // pre-condition: i is a valid index <- checked in StringArrayName
    // pre-condition: c is not null or undefined <- checked in StringArrayName
    // post-condition: getComponent(i) == c <- checked in StringArrayName
    public setComponent(i: number, c: string) {
        return this.nameAsArray.setComponent(i, c);
    }

    // pre-condition: i is a valid index <- checked in StringArrayName
    // pre-condition: c is not null or undefined <- checked in StringArrayName
    // post-condition: getNoComponents() == old getNoComponents() + 1 <- checked in StringArrayName
    // post-condition: getComponent(i) == c <- checked in StringArrayName
    public insert(i: number, c: string) {
        return this.nameAsArray.insert(i, c);
    }

    // pre-condition: c is not null or undefined <- checked in StringArrayName
    // post-condition: getNoComponents() == old getNoComponents() + 1 <- checked in StringArrayName
    // post-condition: getComponent(getNoComponents() - 1) == c <- checked in StringArrayName
    public append(c: string) {
        return this.nameAsArray.append(c);
    }

    // pre-condition: i is a valid index <- checked in StringArrayName
    // post-condition: getNoComponents() == old getNoComponents() - 1 <- checked in StringArrayName
    public remove(i: number) {
        return this.nameAsArray.remove(i);
    }

}