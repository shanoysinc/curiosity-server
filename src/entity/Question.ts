import {
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	Entity,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";
import { User } from "./User";
import { Answer } from "./Answer";

@Entity({ name: "questions" })
export class Question extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 140 })
	title: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;

	@ManyToOne(() => User, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user: User;

	@OneToMany(() => Answer, (answer) => answer.question)
	answers: Answer[];
}
