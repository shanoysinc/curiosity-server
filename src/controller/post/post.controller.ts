import { RequestHandler } from "express";
import { Post } from "../../entity/Post";
import { Vote } from "../../entity/Vote";
export const fetchPosts: RequestHandler = async (req, res) => {
	try {
		const user = req.user;
		const posts = await Post.find({
			relations: ["votes"],
			where: { user },
		});

		res.send({ posts });
	} catch (error) {}
};

export const createPost: RequestHandler = async (req, res) => {
	try {
		const { title, content } = req.body as Post;
		const user = req.user;

		const newPost = Post.create({ title, content, user });
		await newPost.save();

		const vote = Vote.create({ post: newPost, user });
		await vote.save();
		res.send({ post: newPost });
	} catch (error) {}
};

export const updatePost: RequestHandler = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		const updatedPost = await Post.createQueryBuilder("posts")
			.update(Post)
			.set({ ...req.body })
			.where("id = :id", { id })
			.returning("*")
			.execute()
			.then((res) => res.raw[0]);

		res.send({ post: updatedPost });
	} catch (error) {
		res.send({ message: "unable to update post!" });
	}
};

export const deletePost: RequestHandler = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		await Post.delete({ id });
		res.send({ message: "post successfully deleted!" });
	} catch (error) {
		res.send({ message: "unable to delete post!" });
	}
};
