import { connect } from 'mongoose';

export const estabilishDatabase = (databaseURI: string) => {
    connect(databaseURI);
    console.log('Database connection estabilished')
    return true;
}