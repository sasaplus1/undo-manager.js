export class UndoManager<T> {
  private _index = -1;
  private _stack: T[] = [];

  add(history: T): void {
    this._stack.splice(this._index + 1, Infinity, history);
    this._index = this._stack.length - 1;
  }

  canRedo(): boolean {
    return this._index < this._stack.length - 1;
  }

  canUndo(): boolean {
    return this._index > 0;
  }

  clear(): void {
    this._stack.splice(0, Infinity);
    this._index = -1;
  }

  get length(): number {
    return this._stack.length;
  }

  redo(): T {
    if (!this.canRedo()) {
      throw new Error('Cannot redo');
    }

    this._index += 1;

    return this._stack[this._index];
  }

  undo(): T {
    if (!this.canUndo()) {
      throw new Error('Cannot undo');
    }

    this._index -= 1;

    return this._stack[this._index];
  }
}
