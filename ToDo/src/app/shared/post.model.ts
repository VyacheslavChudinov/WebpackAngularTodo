export class Post {
    constructor (        
        public title: string,
        public description: string,
        public createdDate: Date,
        public deadlineDate: Date,
        public id?: string,
    ){}
}