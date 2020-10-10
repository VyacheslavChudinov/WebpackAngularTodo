import { Component, Input } from '@angular/core';
import { Post } from '../../shared/post.model';

@Component({
	selector: 'post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
    @Input() postList: Post[];
    @Input() userId: string;
}
