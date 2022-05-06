export declare class UndoManager<T> {
    private _index;
    private _stack;
    add(history: T): void;
    canRedo(): boolean;
    canUndo(): boolean;
    clear(): void;
    get length(): number;
    redo(): T;
    undo(): T;
}
