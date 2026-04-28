🔷 What is JWT?

JWT = JSON Web Token
Used to verify who the user is after login
Has 3 parts: Header . Payload . Signature
Payload is base64 encoded (not encrypted) — never store passwords in it


🔷 Signup Flow

User sends { name, email, password }
Check if email already exists in DB
Hash the password using bcrypt
Save user to DB
Send response "Account created" — NO token generated


🔷 Login Flow

User sends { email, password }
Find user in DB by email
Compare password using bcrypt.compare()
If match → generate JWT using jwt.sign()
Wrap JWT inside a httpOnly cookie
Send response with cookie