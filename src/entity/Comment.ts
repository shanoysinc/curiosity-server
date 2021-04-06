import {
	PrimaryGeneratedColumn,
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	JoinColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { User } from "./User";
import { Vote } from "./Vote";

@Entity({ name: "comments" })
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@ManyToOne(() => Answer)
	@JoinColumn({ name: "answer_id" })
	answer: Answer;

	@JoinColumn({ name: "user_id" })
	@ManyToOne(() => User)
	user: User;

	@OneToMany(() => Vote, (vote) => vote.answer)
	votes: Vote[];
}
