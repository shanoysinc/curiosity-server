import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from "typeorm";

@Entity({ name: "comments" })
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
}
