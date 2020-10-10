import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../shared/post.model';

@Pipe({ name: 'sortPostList', pure: true })
export class SortPostListPipe implements PipeTransform {
	transform(postList: Post[]) {
		if (!postList || !postList.length) {
			return postList;
		}

		return postList.sort((a, b) => {
			return new Date(a.deadlineDate).getTime() - new Date(b.deadlineDate).getTime();
		});
	}
}
