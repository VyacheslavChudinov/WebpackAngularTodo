import {
	Component,
	Input,
	OnInit,
	Output,
	EventEmitter,
	OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../auth/auth.service';
import { Post } from '../../../../shared/post.model';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'post-edit',
	templateUrl: './post-edit.component.html',
	styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit, OnDestroy {
	@Input() postToEdit: Post;
	@Input() userId: string;
	@Output() postUpdated: EventEmitter<void> = new EventEmitter();
	private postUpdateSubscription: Subscription;
	isLoading: boolean = false;

	editPostForm: FormGroup;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.editPostForm = new FormGroup({
			title: new FormControl(this.postToEdit.title, Validators.required),
			description: new FormControl(
				this.postToEdit.description,
				Validators.required
			),
			deadlineDate: new FormControl(
				this.postToEdit.deadlineDate,
				Validators.required
			),
		});
	}

	onSubmit() {
		const newPost = new Post(
			this.editPostForm.get('title').value,
			this.editPostForm.get('description').value,
			new Date(),
			new Date(this.editPostForm.get('deadlineDate').value),
			this.postToEdit.id
		);

		this.isLoading = true;
		this.postUpdateSubscription = this.authService
			.updatePost(this.userId, newPost)
			.pipe(
				finalize(() => {
					this.isLoading = false;
				})
			)
			.subscribe(function () {
				console.log('Post has been updated');
			});
	}

	ngOnDestroy() {
		if (this.postUpdateSubscription) {
			this.postUpdateSubscription.unsubscribe();
		}
	}
}
