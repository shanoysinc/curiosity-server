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

@Entity({ name: "votes" })
@Unique(["user", "answer"])
export class Vote extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: 0 })
	value: number;

	@ManyToOne(() => Answer, { onDelete: "CASCADE" })
	@JoinColumn({ name: "answer_id" })
	answer: Answer;

	@ManyToOne(() => User, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user: User;
}
