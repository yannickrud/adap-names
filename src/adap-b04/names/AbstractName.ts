import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailureException } from "../common/MethodFailureException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
        this.checkAbstractNameInvariant();
    }

    /**
     * Class Invariant: The delimiter should always be a valid string.
     */
    private checkAbstractNameInvariant(): void {
        InvalidStateException.assertIsNotNullOrUndefined(this.delimiter, "delimiter is null or undefined");
        let cond = typeof this.delimiter === 'string' && this.delimiter.length !== 0
        InvalidStateException.assertCondition(cond, "delimiter is empty");
    }

    // Post condition: The clone is equal to the original.
    public clone(): Name {
        let clone = this.clone();
        let cond = this.isEqual(clone);
        MethodFailureException.assertCondition(cond, "clone is not equal to original");
        return clone;
    }

    // pre condition: The delimiter should be a valid string.
    public asString(delimiter: string = this.delimiter): string {
        IllegalArgumentException.assertIsNotNullOrUndefined(delimiter, "delimiter is null or undefined");
        let cond = typeof delimiter === 'string' && delimiter.length !== 0
        IllegalArgumentException.assertCondition(cond, "delimiter is empty");

        let result = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            const c = this.getComponent(i);

            result += c;

            if (i != this.getNoComponents() - 1) {
                result += delimiter;
            }
        }
        return result;
    }

    public toString(): string {
        return this.toString();
    }

    public asDataString(): string {
        let result = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            let c = this.getComponent(i);

            if (c.includes(this.delimiter)) {
                c = c.replaceAll(this.delimiter, ESCAPE_CHARACTER + this.delimiter);
            }

            result += c;

            if (i != this.getNoComponents() - 1) {
                result += this.delimiter;
            }
        }
        return result;
    }

    // pre condition: The other name should not be null or undefined.
    public isEqual(other: Name): boolean {
        IllegalArgumentException.assertIsNotNullOrUndefined(other, "other is null or undefined");
        if (this.getNoComponents() != other.getNoComponents()) {
            return false;
        }

        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) != other.getComponent(i)) {
                return false;
            }
        }

        return true;
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    // pre condition: The other name should not be null or undefined.
    // post condition: The other name is concatenated to this name.
    public concat(other: Name): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(other, "other is null or undefined");
        let noComponentsBefore = this.getNoComponents();
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
        let cond = this.getNoComponents() === noComponentsBefore + other.getNoComponents();
        MethodFailureException.assertCondition(cond, "concatenation failed");
    }

}