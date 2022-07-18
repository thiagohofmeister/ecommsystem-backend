import { randomUUID } from 'crypto'

export class Image {
  constructor(
    private url: string,
    private position: number,
    private id?: string,
    private createdAt?: Date
  ) {
    if (!id) this.id = randomUUID()
  }

  public getUrl(): string {
    return this.url
  }

  public getPosition(): number {
    return this.position
  }

  public getId(): string {
    return this.id
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }
}
