import Post from '../../../models/Post';

export default {
    Query: {
        posts: () => User.find(),
        post: (_, { id }) => User.findById(id),
    },
    Mutation: {
        createPost: (_, { data }) => Post.create(data),
        updatePost: (_, { id, data }) => Post.findOneAndUpdate(id, data),
        deletePost: async (_, { id }) => !!(await Post.findOneAndDelete(id)),
    },
};
