import Comment from "../model/comment.js";
export const addComment = async (request, response) => {
    try {
        const comment = new Comment(request.body);
        await comment.save();

        return response.status(200).json({ msg: 'Comment saved successfully!' });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while saving comment to the database' });
    }
}

export const deleteComment = async (request, response) => {
    try {
        let comment = await Comment.findById(request.params.id);
        if (!comment) {
            return response.status(404).json({ msg: 'Comment not found' });
        }
        await Comment.deleteOne(comment);
        
        return response.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (err) {
        return response.status(500).json({ msg: 'Error while deleting comment' });
    }
}

export const getAllComments = async (request, response) => {
    try {
        let comments = await Comment.find({ postId: request.params.id });
        if (!comments || comments.length === 0) {
            return response.status(404).json({ msg: 'Comments not found' });
        }
        return response.status(200).json(comments);
    } catch (error) {
        return response.status(500).json({ msg: 'Error while fetching comments' });
    }
}
