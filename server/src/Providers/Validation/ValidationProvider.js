import Validator from 'validatorjs';
class ValidationProvider {
    async compare(obj, rules) {
        const validation = new Validator(obj, rules);
        return {
            status: validation.passes(),
            message: validation.errors.errors,
        };
    }
}

export default ValidationProvider;
