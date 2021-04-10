import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	Check,
	JoinColumn,
	Unique,
} from "typeorm";
import { Answer } from "./Answer";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity({ name: "votes" })
// @Check(
// 	'COALESCE(("upvote")::INTEGER, 0) + COALESCE(("downvote")::BOOLEAN::INTEGER, 0)  = 1'
// )
@Check(
	'COALESCE(("answer_id")::BOOLEAN::INTEGER, 0) + COALESCE(("comment_id")::BOOLEAN::INTEGER, 0)  = 1'
)
@Unique(["user", "answer", "comment"])
export class Vote extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: 1 })
	value: number;

	@Column({ name: "upvote", default: true })
	upVote: boolean;

	@Column({ name: "downvote", default: false })
	downVote: boolean;

	@ManyToOne(() => Answer, { onDelete: "CASCADE", nullable: true })
	@JoinColumn({ name: "answer_id" })
	answer: Answer;

	@ManyToOne(() => Comment, { onDelete: "CASCADE", nullable: true })
	@JoinColumn({ name: "comment_id" })
	comment: Comment;

	@ManyToOne(() => User, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user: User;
}
