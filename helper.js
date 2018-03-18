/*jshint esversion: 6 */

export default class Helpers {
    constructor() {
        this.prop1 = "abs";
    }

    static test() { //static is private method and won't be available in export
        return "Hello world! jkfhdksfh";
    }

    goodbye() {
        return 'instance func';
    }
}