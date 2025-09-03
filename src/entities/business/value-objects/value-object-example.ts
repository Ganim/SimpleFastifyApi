import { BadRequestError } from '@/@errors/use-cases/bad-request-error';

export abstract class ValueObject<T> {
  protected readonly _value: T;

  protected constructor(value: T) {
    this._value = this.format(value);
    if (!this.isValid(this._value)) {
      throw new BadRequestError('Valor inválido para Value Object.');
    }
  }

  static create<U, V extends ValueObject<U>>(
    this: new (value: U) => V,
    value: U,
  ): V {
    return new this(value);
  }

  protected abstract isValid(value: T): boolean;

  protected format(value: T): T {
    return value;
  }

  get value(): T {
    return this._value;
  }

  toString(): string {
    return String(this._value);
  }

  equals(other: ValueObject<T>): boolean {
    return this._value === other.value;
  }
}
