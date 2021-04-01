import {
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	Entity,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { User } from "./User";
import { Vote } from "./Vote";

@Entity({ name: "posts" })
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	title: string;

	@Column()
	content: string;

	@ManyToOne(() => User, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user: User;

	@OneToMany(() => Vote, (vote) => vote.post)
	votes: Vote;
}
