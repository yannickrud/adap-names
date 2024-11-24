export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    // @methodtype object-creation-method
    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        }
    }

    /** Returns human-readable representation of Name instance */
    // @methodtype conversion-method
    public asNameString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        return this.components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    /** Returns number of components in Name instance */
    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype command-method
    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    // @methodtype command-method
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype command-method
    public remove(i: number): void {
        this.components.splice(i, 1);
    }

}