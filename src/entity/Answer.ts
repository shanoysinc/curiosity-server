import {
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	Entity,
	ManyToOne,
	JoinColumn,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Vote } from "./Vote";
import { Question } from "./Question";

@Entity({ name: "answers" })
export class Answer extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;

	@ManyToOne(() => User, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user: User;

	@ManyToOne(() => Question, { onDelete: "CASCADE" })
	@JoinColumn({ name: "question_id" })
	question: Question;
}
