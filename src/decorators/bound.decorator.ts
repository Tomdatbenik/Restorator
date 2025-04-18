export function Bound() {
  return function (_: any, context: ClassMethodDecoratorContext) {
    const methodName = context.name;
    if (context.private) {
      throw new Error(
        `'bound' cannot decorate private properties like ${
          methodName as string
        }.`
      );
    }
    context.addInitializer(function () {
      const target: any = this;
      target[methodName] = target[methodName].bind(target);
    });
  };
}
