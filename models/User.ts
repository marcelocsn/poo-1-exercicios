export class User{

    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private createdAt: string
        ){}

        /*
        getId - método para pegar a id do objeto
        */
        public getId():string {
            return this.id
        }

        /*
        setId - método publico seguro para alterar id do objeto
        */
        public setId(value:string):void {
            this.id = value
        }

        public getName(): string {
            return this.name;
        }
        public setName(value: string) {
            this.name = value;
        }

        public getEmail(): string {
            return this.email;
        }
        public setEmail(value: string) {
            this.email = value;
        }

        public getPassword(): string {
            return this.password;
        }
        public setPassword(value: string) {
            this.password = value;
        }

        public getCreatedAt(): string {
            return this.createdAt;
        }
        public setCreatedAt(value: string) {
            this.createdAt = value;
        }
}
const user = new User(
    "u003",
    "Astrodev",
    "astrodev@devinho",
    "senha12345$",
    "2023-01-30 10:02:00"
)
const user2 = new User(
    "u010",
    "outroDevinho",
    "astrodev@devinho",
    "senha12345$",
    "2023-01-30 10:02:00"
)
//console.table("id do user: ", user.getId());
console.table(user2);
user2.setId("u004");
console.table(user2);
