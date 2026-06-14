/**
 * Lightweight finite state machine.
 * Used for player movement states, enemy AI, bosses, and UI flows.
 */
export type StateAction<T> = (ctx: T) => void;

export interface StateConfig<T, S extends string> {
  name: S;
  onEnter?: StateAction<T>;
  onUpdate?: StateAction<T>;
  onExit?: StateAction<T>;
}

export class StateMachine<T, S extends string> {
  private states = new Map<S, StateConfig<T, S>>();
  private current?: StateConfig<T, S>;

  constructor(
    private context: T,
    initial?: S,
    states: StateConfig<T, S>[] = []
  ) {
    states.forEach((s) => this.addState(s));
    if (initial) {
      this.setState(initial);
    }
  }

  addState(state: StateConfig<T, S>): this {
    this.states.set(state.name, state);
    return this;
  }

  setState(name: S): this {
    const next = this.states.get(name);
    if (!next) {
      throw new Error(`State ${name} not found`);
    }
    if (this.current?.name === name) return this;

    this.current?.onExit?.(this.context);
    this.current = next;
    this.current.onEnter?.(this.context);
    return this;
  }

  update(): void {
    this.current?.onUpdate?.(this.context);
  }

  get currentState(): S | undefined {
    return this.current?.name;
  }

  is(state: S): boolean {
    return this.current?.name === state;
  }
}
