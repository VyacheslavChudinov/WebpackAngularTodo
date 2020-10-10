import { Post } from './post.model';

export class User {
	constructor(
		public id: string,
		public username: string,
		public firstName: string,
		public lastName: string,
		public createdDate: Date,
		public posts: Post[],
		public token: string,
		public tokenExpirationDate: Date
	) {}
}
