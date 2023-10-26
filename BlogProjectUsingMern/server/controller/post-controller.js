import Post from '../model/post.js';
export const createPost=async(request,response)=>{
    try{
        const post = new Post(request.body);
        await post.save();

         return response.status(200).json({ msg: 'Post saved successfully!' });

    }catch(error){

        return response.status(500).json({ msg: 'Error while saving post to database' });
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
      
        if (!post) {
            return response.status(404).json({ msg: 'Post not found' })
        }
        
       await Post.findByIdAndUpdate( request.params.id, { $set: request.body })
       console.log(response);
        
        return response.status(200).json({ msg: 'Post updated successfully' });
    } catch (error) {
       return response.status(500).json({ msg: 'Error while saving post to database' });
    }
}

export const deletePost = async (request,response)=>{
    try{
      let post= await Post.findById(request.params.id);
      console.log(post);
      if (!post) {
        return response.status(404).json({ msg: 'Post not found' })
    }
    //await post.delete();
    await Post.deleteOne(post);
    return response.status(200).json({ msg: 'Post deleted successfully' });
    }catch(err){
        return response.status(500).json({ msg: 'Error while deleting post ' });

    }
}

export const getAllPosts=async(request,response)=>{
    let username = request.query.username;
    let  category=request.query.category;
    let posts;
    try{
        if(username){
            posts=await Post.find({username:username});
        }
        else if (category) 
            posts = await Post.find({ categories: category });
        else
        posts = await Post.find({});
        response.status(200).json(posts);
    }catch(error){
        response.status(500).json(error)
    }

}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}