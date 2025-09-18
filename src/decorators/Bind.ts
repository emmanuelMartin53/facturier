

// Méthode de décorator

export function bind (target: any, name: string, descriptor: PropertyDescriptor ) {
    const originMethod = descriptor.value;
    const newDescriptor: PropertyDescriptor = {
      get () {
        return originMethod.bind(this)
      }
    }
    return newDescriptor;
}
