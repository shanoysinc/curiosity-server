import {
	PrimaryGeneratedColumn,
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
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
	answer: Answer;

	@ManyToOne(() => User)
	user: User;

	@OneToMany(() => Vote, (vote) => vote.answer)
	votes: Vote[];
}
