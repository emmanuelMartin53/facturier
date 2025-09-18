// Méthode de décorator
export function bind(target, name, descriptor) {
    const originMethod = descriptor.value;
    const newDescriptor = {
        get() {
            return originMethod.bind(this);
        }
    };
    return newDescriptor;
}
