import type { Request, Response } from 'express';
import { PostModel, CommentModel } from '../models/models';

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await PostModel.findAll({
      include: [{ model: CommentModel, as: 'commentsList' }],
      order: [['timestamp', 'DESC']]
    });
    
    // Map to match frontend expectations (likes parsed from string, comments list named 'comments')
    const formattedPosts = posts.map(post => {
      const p = post.toJSON();
      return {
        ...p,
        likes: JSON.parse(p.likes || '[]'),
        comments: p.commentsList || []
      };
    });
    
    res.json(formattedPosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const postData = req.body;
    const post = await PostModel.create({
      ...postData,
      likes: JSON.stringify(postData.likes || [])
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const commentData = req.body;
    const comment = await CommentModel.create({
      ...commentData,
      postId
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    await CommentModel.destroy({ where: { postId } });
    await PostModel.destroy({ where: { id: postId } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    
    const post = await PostModel.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    let likes = JSON.parse(post.getDataValue('likes') || '[]');
    if (likes.includes(userId)) {
      likes = likes.filter((id: string) => id !== userId);
    } else {
      likes.push(userId);
    }

    await post.update({ likes: JSON.stringify(likes) });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle like' });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    await CommentModel.destroy({ where: { id: commentId } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
