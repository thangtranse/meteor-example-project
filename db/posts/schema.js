import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true
    }
});
