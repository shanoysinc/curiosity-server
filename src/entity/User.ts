import {
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	Entity,
	BeforeInsert,
	Unique,
	CreateDateColumn,
	OneToMany,
} from "typeorm";
import bcrypt from "bcryptjs";
import { Question } from "./Question";

@Entity({ name: "users" })
@Unique(["email"])
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "first_name", length: 35 })
	firstName: string;

	@Column({ name: "last_name", length: 35 })
	lastName: string;

	@Column({ length: 100, nullable: true })
	education: string;

	@Column({ length: 100, nullable: true })
	profession: string;

	@Column({ length: 100 })
	email: string;

	@Column()
	password: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@OneToMany(() => Question, (question) => question.user)
	questions: Question[];

	@BeforeInsert()
	async encryptPassword() {
		const hashPassword = await bcrypt.hash(this.password, 10);
		this.password = hashPassword;
	}
}
