import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'USER' })
export class User {
  @PrimaryColumn()
  _id: number;

  @Index({ unique: true })
  @Column({
    unique: true,
    name: 'ID',
    type: 'binary',
    length: 16,
    nullable: false,
    comment: '유저 UUID',
  })
  userId: Buffer | string;

  @Column({
    name: 'ENCRYPT_PASSWORD',
  })
  password: string;

  @Index({ unique: true })
  @Column({
    name: 'EMAIL',
  })
  email: string;

  @Column({
    name: 'NAME',
  })
  name: string;

  @Column({
    name: 'MOBILE_NUM',
  })
  mobileNum: string;

  @CreateDateColumn({
    name: 'INS_DT',
    type: 'datetime',
    nullable: false,
    comment: '등록일',
  })
  insertDate: Date;

  @UpdateDateColumn({
    name: 'UDT_DT',
    type: 'datetime',
    nullable: false,
    comment: '수정일',
  })
  updateDate: Date;

  @DeleteDateColumn({
    name: 'DEL_DT',
    type: 'datetime',
    nullable: true,
    select: false,
    comment: '삭제일',
  })
  deletedAt: Date | null;
}
