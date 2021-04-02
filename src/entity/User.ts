import {
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	Entity,
	BeforeInsert,
	Unique,
	CreateDateColumn,
} from "typeorm";
import bcrypt from "bcryptjs";

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

	@Column({ length: 60, nullable: true })
	profession: string;

	@Column({ length: 100 })
	email: string;

	@Column()
	password: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@BeforeInsert()
	async encryptPassword() {
		const hashPassword = await bcrypt.hash(this.password, 10);
		this.password = hashPassword;
	}
}
