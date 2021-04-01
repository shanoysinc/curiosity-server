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
import { Post } from "./Post";
import { User } from "./User";

@Entity({ name: "votes" })
@Unique(["user", "post"])
export class Vote extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: 0 })
	value: number;

	@ManyToOne(() => Post, { onDelete: "CASCADE" })
	@JoinColumn({ name: "post_id" })
	post: Post;

	@ManyToOne(() => User, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user: User;
}
