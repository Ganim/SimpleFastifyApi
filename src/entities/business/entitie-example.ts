import { Entity } from '../domain/entities';
import { Optional } from '../domain/optional';
import { UniqueEntityID } from '../domain/unique-entity-id';

// Interface genérica para propriedades da entidade
export interface BaseEntityProps {
  id: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  // Adicione outras propriedades específicas conforme necessário
}

// Classe genérica de entidade
export class BaseEntity extends Entity<BaseEntityProps> {
  get id(): UniqueEntityID {
    return this.props.id;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  get isDeleted(): boolean {
    return !!this.deletedAt;
  }

  protected touch() {
    this.props.updatedAt = new Date();
  }

  set deletedAt(date: Date | undefined) {
    this.props.deletedAt = date;
    this.touch();
  }

  static create(
    props: Optional<BaseEntityProps, 'createdAt' | 'deletedAt'>,
    id?: UniqueEntityID,
  ) {
    const entity = new BaseEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        deletedAt: props.deletedAt ?? undefined,
      },
      id,
    );
    return entity;
  }
}
