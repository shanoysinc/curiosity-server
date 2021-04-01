import {
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	Entity,
	BeforeInsert,
	Unique,
} from "typeorm";
import bcrypt from "bcryptjs";

@Entity({ name: "users" })
@Unique(["username"])
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 35 })
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@BeforeInsert()
	async encryptPassword() {
		const hashPassword = await bcrypt.hash(this.password, 10);
		this.password = hashPassword;
	}
}
