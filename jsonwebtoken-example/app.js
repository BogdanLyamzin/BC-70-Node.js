import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    id: "668d555aa44cc09e877b8061"
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const tokenPayload = jwt.verify(token, JWT_SECRET);
    // console.log(tokenPayload)
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGQ1NTVhYTQ0Y2MwOWU4NzdiODA2MSIsImlhdCI6MTcyMDUzOTEwMywiZXhwIjoxNzIwNjI1NTAzfQ.6g3z3Xy0kwr34Yet_y3-gNkHVi5Cr7C9MvP8ieHix3O";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}