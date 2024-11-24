import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailureException } from "../common/MethodFailureException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    // class invariant 1: other is not null or undefined.
    // class invariant 2: delimiter is not null or undefined. <- checked in abstract class
    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.components = other;
        this.checkStringArrayNameInvariant();
    }

    private checkStringArrayNameInvariant(): void {
        InvalidStateException.assertIsNotNullOrUndefined(this.components);
    }

    private assertIsValidIndex(i: number): void {
        let cond = (i >= 0) && (i < this.getNoComponents());
        IllegalArgumentException.assertCondition(cond, "invalid index");
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    // pre-condition: i is in the range of 0 to getNoComponents() - 1
    public getComponent(i: number): string {
        this.assertIsValidIndex(i);

        return this.components[i];
    }

    // pre-condition 1: i is in the range of 0 to getNoComponents() - 1
    // pre-condition 2: c is not null or undefined
    // post-condition: getComponent(i) == c
    public setComponent(i: number, c: string) {
        this.assertIsValidIndex(i);
        IllegalArgumentException.assertIsNotNullOrUndefined(c);

        this.components[i] = c;

        let postCond = this.getComponent(i) == c;
        MethodFailureException.assertCondition(postCond, "setComponent post-condition failed");
    }

    // pre-condition 1: i is in the range of 0 to getNoComponents()
    // pre-condition 2: c is not null or undefined
    // post-condition: getNoComponents() == old getNoComponents() + 1
    // post-condition: getComponent(i) == c
    public insert(i: number, c: string) {
        let cond = (i >= 0) && (i <= this.getNoComponents());
        IllegalArgumentException.assertCondition(cond, "invalid index");
        IllegalArgumentException.assertIsNotNullOrUndefined(c);

        this.components.splice(i, 0, c);

        let postCond = this.getNoComponents() == this.getNoComponents() + 1;
        MethodFailureException.assertCondition(postCond, "insert post-condition failed");
        postCond = this.getComponent(i) == c;
        MethodFailureException.assertCondition(postCond, "insert post-condition failed");
    }

    // pre-condition: c is not null or undefined
    // post-condition: getNoComponents() == old getNoComponents() + 1
    // post-condition: getComponent(getNoComponents() - 1) == c
    public append(c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
        let noComponentsBefore = this.getNoComponents();

        this.components.push(c);

        let postCond = this.getNoComponents() == noComponentsBefore + 1;
        MethodFailureException.assertCondition(postCond, "append post-condition failed");
        postCond = this.getComponent(this.getNoComponents() - 1) == c;
        MethodFailureException.assertCondition(postCond, "append post-condition failed");
    }

    // pre-condition: i is a valid index
    // post-condition: getNoComponents() == old getNoComponents() - 1
    public remove(i: number) {
        this.assertIsValidIndex(i);
        let noComponentsBefore = this.getNoComponents();

        this.components.splice(i, 1);

        let postCond = this.getNoComponents() == noComponentsBefore - 1;
        MethodFailureException.assertCondition(postCond, "remove post-condition failed");
    }

}