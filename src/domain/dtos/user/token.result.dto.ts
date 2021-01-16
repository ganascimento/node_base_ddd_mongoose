export class TokenResultDto {
    token: string;
    userName: string;
    userEmail: string;

    constructor(token: string, userName: string, userEmail: string) {
        this.token = token;
        this.userName = userName;
        this.userEmail = userEmail;
    }
}