import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../shared/post.model';
import { AuthService } from '../../auth/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'post-add',
	templateUrl: './post-add.component.html',
	styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent implements OnInit {
	@Input() userId: string;
	newPostForm: FormGroup;
	isLoading: boolean = false;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.newPostForm = new FormGroup({
			title: new FormControl(null, Validators.required),
			description: new FormControl(null, Validators.required),
			deadlineDate: new FormControl(null, Validators.required),
		});
	}

	onSubmit() {
		const newPost = new Post(
			this.newPostForm.get('title').value,
			this.newPostForm.get('description').value,
			new Date(),
			new Date(this.newPostForm.get('deadlineDate').value)
		);

		this.isLoading = true;
		this.authService
			.addPost(this.userId, newPost)
			.pipe(
				finalize(() => {
					this.isLoading = false;
				})
			)
			.subscribe(() => {
				this.newPostForm.reset();
			});
	}

	onFormExpansion() {
		this.newPostForm.reset();
	}
}
