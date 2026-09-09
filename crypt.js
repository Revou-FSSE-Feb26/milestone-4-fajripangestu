import * as crypto from 'crypto';
import bcrypt from 'bcrypt';

const password = 'RevoU2026';

async function demo(){
    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    console.log('Bcrypt Hashing:');
    console.log({passwordHash});

    const isMatch = await bcrypt.compare(password, passwordHash);
    console.log('Password Match:', isMatch);
}

demo();