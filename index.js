"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndoManager = void 0;
class UndoManager {
    constructor() {
        this._index = -1;
        this._stack = [];
    }
    add(history) {
        this._stack.splice(this._index + 1, Infinity, history);
        this._index = this._stack.length - 1;
    }
    canRedo() {
        return this._index < this._stack.length - 1;
    }
    canUndo() {
        return this._index > 0;
    }
    clear() {
        this._stack.splice(0, Infinity);
        this._index = -1;
    }
    get length() {
        return this._stack.length;
    }
    redo() {
        if (!this.canRedo()) {
            throw new Error("Cannot redo");
        }
        this._index += 1;
        return this._stack[this._index];
    }
    undo() {
        if (!this.canUndo()) {
            throw new Error("Cannot undo");
        }
        this._index -= 1;
        return this._stack[this._index];
    }
}
exports.UndoManager = UndoManager;
