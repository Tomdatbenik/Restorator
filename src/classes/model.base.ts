export class Model {
  get creatable(): boolean {
    if ((this as any)._creatable == null) {
      return false;
    } else {
      return (this as any)._creatable;
    }
  }
}
