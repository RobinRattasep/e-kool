import { Table, Column, Model, HasMany } from 'sequelize-typescript'

@Table
class User extends Model {
    @Column
    username: string

    @Column
    password: string


}



